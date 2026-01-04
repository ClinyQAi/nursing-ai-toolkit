import gradio as gr
from google import genai
from google.genai import types
import edge_tts
import asyncio
import os
import tempfile
import json
from pypdf import PdfReader

# --- Configure Gemini ---
def get_client(api_key=None):
    key = api_key or os.getenv("GEMINI_API_KEY")
    if not key:
        return None
    return genai.Client(api_key=key)

# --- Prompts ---
SCRIPT_PROMPT = """
You are an expert nursing educator creating a podcast script. 
Convert the following source material into a dynamic, educational dialogue between two people:
1. **Sarah (Host)**: An experienced Senior Nurse Educator. Warm, clear, asks guiding questions.
2. **Mike (Co-host)**: A slightly younger but knowledgeable Clinical Nurse Specialist. Enthusiastic, shares practical examples.

**Requirements:**
- **Tone**: Professional but conversational and engaging. Suitable for UK nursing students.
- **Content**: Accurately reflect the source material. Highlight key learning points (NMC Standards, pathophysiology, care planning).
- **Structure**:
  - Intro: Welcome to "The Nursing Shift" podcast.
  - Body: Discuss main points using Socratic questioning.
  - Outro: Summary and sign-off.
- **Format**: Return ONLY a JSON list of objects. Each object must have "speaker" ("Sarah" or "Mike") and "text".
  Example:
  [
    {{"speaker": "Sarah", "text": "Hello everyone, welcome back to The Nursing Shift."}},
    {{"speaker": "Mike", "text": "Hi Sarah! Today we're diving into something critical - sepsis."}}
  ]

Source Material:
{source_text}
"""

async def generate_audio_segment(text, voice, output_file):
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_file)

async def run_audio_generation(script, temp_dir):
    audio_segments = []
    for i, line in enumerate(script):
        if not isinstance(line, dict): continue
        speaker = line.get("speaker", "Sarah")
        text = line.get("text", "")
        if not text: continue
        
        voice = "en-GB-SoniaNeural" if speaker == "Sarah" else "en-GB-RyanNeural"
        segment_file = os.path.join(temp_dir, f"segment_{i}.mp3")
        await generate_audio_segment(text, voice, segment_file)
        audio_segments.append(segment_file)
    return audio_segments

async def generate_podcast(text_input, file_input, api_key_input):
    # 0. Setup Client
    client = get_client(api_key_input)
    if not client:
        return None, "⚠️ Please provide a Gemini API Key (check Space Secrets or paste below)."
    
    # 1. Process Input
    source_text = ""
    if text_input:
        source_text += text_input + "\n"
    
    if file_input:
        try:
            reader = PdfReader(file_input.name)
            for page in reader.pages:
                source_text += page.extract_text() + "\n"
        except Exception as e:
            return None, f"Error reading PDF: {str(e)}"

    if not source_text.strip():
        return None, "⚠️ Please provide text or upload a PDF."

    # 2. Generate Script with Gemini
    try:
        model_id = "gemini-2.0-flash" 
        
        # Define the schema to FORCE Gemini to return the correct format
        response_schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "speaker": {"type": "string"},
                    "text": {"type": "string"}
                },
                "required": ["speaker", "text"]
            }
        }

        print(f"--- Generating script for content length: {len(source_text)} ---")
        
        response = client.models.generate_content(
            model=model_id,
            contents=SCRIPT_PROMPT.format(source_text=source_text[:30000]),
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=response_schema
            )
        )
        
        script_text = response.text
        if not script_text:
            return None, "Error: AI returned an empty script response."
        
        print(f"--- Raw AI Response (first 100 chars): {script_text[:100]} ---")
        
        # Parse JSON
        script = json.loads(script_text)

        if not isinstance(script, list) or len(script) == 0:
            return None, "Error: AI failed to return a valid dialogue list."
                
    except Exception as e:
        print(f"!!! Error during script generation: {str(e)}")
        return None, f"Error during script generation: {str(e)}"

    # 3. Generate Audio
    temp_dir = tempfile.mkdtemp()
    try:
        audio_segments = await run_audio_generation(script, temp_dir)
        if not audio_segments:
            return None, "Error: No audio segments were generated."
    except Exception as e:
        return None, f"Error generating audio: {str(e)}"

    # 4. Merge Audio
    final_output = os.path.join(temp_dir, "podcast_final.mp3")
    with open(final_output, 'wb') as outfile:
        for segment in audio_segments:
            with open(segment, 'rb') as infile:
                outfile.write(infile.read())
    
    # Create Transcript
    transcript_md = "## 🎙️ Podcast Transcript\n\n"
    for line in script:
        if isinstance(line, dict):
            speaker = line.get("speaker", "Unknown")
            text = line.get("text", "")
            transcript_md += f"**{speaker}**: {text}\n\n"

    return final_output, transcript_md

# --- UI ---
with gr.Blocks(title="🎙️ Nursing Lecture-to-Podcast Agent") as demo:
    gr.Markdown("# 🎙️ Nursing Lecture-to-Podcast Agent")
    gr.Markdown("Turn your lecture notes, guidelines, or articles into an engaging audio conversation between two UK nurse educators.")
    
    with gr.Row():
        with gr.Column():
            api_key = gr.Textbox(
                label="Gemini API Key", 
                placeholder="Paste your key here if not set in Space Secrets", 
                type="password"
            )
            input_text = gr.Textbox(
                label="Paste Text Here", 
                lines=10, 
                placeholder="Paste lecture notes, BJN article text, or study material..."
            )
            input_file = gr.File(label="Or Upload PDF", file_types=[".pdf"])
            btn = gr.Button("🎧 Generate Podcast", variant="primary")
        
        with gr.Column():
            audio_out = gr.Audio(label="Generated Podcast", type="filepath")
            transcript_out = gr.Markdown(label="Transcript View")

    btn.click(
        fn=generate_podcast, 
        inputs=[input_text, input_file, api_key], 
        outputs=[audio_out, transcript_out]
    )
    
    gr.HTML("<p style='text-align: center; color: #666;'>Powered by Google Gemini 2.0 & Edge-TTS. Designed for Nursing Education.</p>")

if __name__ == "__main__":
    demo.launch(
        theme=gr.themes.Soft(),
        ssr_mode=False
    )

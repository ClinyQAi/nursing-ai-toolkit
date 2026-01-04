import re
import json
import os
from bs4 import BeautifulSoup

input_file = r"c:\Users\g0226\Downloads\nmc_brain\train\Proficiencies for Pre- Registration.md"
output_file = r"c:\Users\g0226\Downloads\nmc_brain\data\proficiencies_cleaned.jsonl"

def clean_text(text):
    if not text: return ""
    # Remove "Click to edit..." placeholders
    text = re.sub(r"Click to edit Master \w+ style", "", text)
    # Remove bookmarks
    text = re.sub(r"\(#_bookmark\d+\)", "", text)
    # Remove specific artifacts
    text = text.replace("Click the tabs below", "")
    text = text.replace("Embedded Videos Relating to Skills", "")
    text = text.replace("Us1e6r Guide", "")
    
    # Remove email like patterns (simple check)
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[EMAIL REMOVED]', text)
    
    # Remove copyright symbols?
    text = text.replace("©", "")
    
    # Remove "Click for link", "Click for next page"
    text = re.sub(r"Click for (link|next page)", "", text)
    
    return text.strip()

def process():
    if not os.path.exists(input_file):
        print(f"File not found: {input_file}")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # The file contains HTML tables embedded in the markdown.
    # We will parse the entire content as HTML (Markdown parsers often leave HTML as is)
    # or just use BS4 directly on the text since it's mixed.
    
    soup = BeautifulSoup(content, 'html.parser')
    
    dataset = []
    
    # Find all table rows in the HTML tables
    rows = soup.find_all('tr')
    
    for row in rows:
        cols = row.find_all(['td', 'th'])
        # We expect a structure roughly: [Number, Proficiency, Methods, Guidance, Links]
        # But looking at valid rows (skipping headers might be tricky if structure varies)
        
        # Heuristic: Process rows with enough content
        texts = [clean_text(col.get_text(" ", strip=True)) for col in cols]
        
        # We look for rows that likely contain a proficiency
        # Based on snippet: Col 1 is often ID (e.g. "1."), Col 2 is Proficiency Text
        # Col 3 is Suggestive Methods, Col 4 is Guidance
        
        if len(texts) >= 4:
            # Check if this looks like a data row
            # If Col 1 is a small number/id and Col 2 is long text
            
            p_id = texts[0]
            p_text = texts[1]
            p_methods = texts[2]
            p_guidance = texts[3]
            
            # Simple content filter
            if "Proficiency" in p_text and "Year" in p_id: continue # Header row
            if len(p_text) < 10: continue # Likely not a proficiency description
            
            instruction = f"How can a student nurse demonstrate the proficiency: {p_text}?"
            output = f"Suggestive methods of assessment:\n{p_methods}\n\nGuidance and actions:\n{p_guidance}"
            
            dataset.append({
                "instruction": instruction,
                "input": "",
                "output": output
            })

    # Also extract non-table text? 
    # The user specifically asked to "clean that md file... then use it".
    # But extraction of structured data is better for fine-tuning than just raw text dump.
    # Let's stick to the high-quality table data first.
    
    print(f"Extracted {len(dataset)} items from tables.")
    
    # Append to the main web dataset
    final_dataset_path = r"c:\Users\g0226\Downloads\nmc_brain\data\nmc_dataset_web.jsonl"
    
    with open(final_dataset_path, 'a', encoding='utf-8') as f:
        for entry in dataset:
            f.write(json.dumps(entry) + '\n')
            
    print(f"Appended to {final_dataset_path}")

if __name__ == "__main__":
    process()

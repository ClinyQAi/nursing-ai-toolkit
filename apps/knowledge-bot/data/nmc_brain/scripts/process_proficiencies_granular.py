import re
import json
import os
import random
from bs4 import BeautifulSoup

input_file = r"c:\Users\g0226\Downloads\nmc_brain\train\Proficiencies for Pre- Registration.md"
# We'll overwrite the filtered one to be the main source eventually, but let's just append to web
output_file = r"c:\Users\g0226\Downloads\nmc_brain\data\nmc_dataset_web.jsonl"

def clean_text(text):
    if not text: return ""
    text = re.sub(r"Click to edit Master \w+ style", "", text)
    text = re.sub(r"\(#_bookmark\d+\)", "", text)
    text = text.replace("Click the tabs below", "")
    text = text.replace("Embedded Videos Relating to Skills", "")
    text = int_filter_pii(text)
    return text.strip()

def int_filter_pii(text):
    # Basic email removal
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[EMAIL REMOVED]', text)
    # Remove obvious placeholders
    text = text.replace("[Insert Name]", "[Name]")
    return text

def get_templates(proficiency_text):
    # Clean proficiency text for insertion
    p_clean = proficiency_text.strip().rstrip('.')
    
    return [
        f"What is a key guidance point for the proficiency: '{p_clean}'?",
        f"For the NMC proficiency '{p_clean}', what is a suggested action for a student nurse?",
        f"Describe a specific requirement or action related to '{p_clean}'.",
        f"How can a student demonstrate the proficiency '{p_clean}' in practice?",
        f"What should a student nurse do to meet the standard: '{p_clean}'?"
    ]

def process():
    if not os.path.exists(input_file):
        print(f"File not found: {input_file}")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    soup = BeautifulSoup(content, 'html.parser')
    dataset = []
    
    rows = soup.find_all('tr')
    
    for row in rows:
        cols = row.find_all(['td', 'th'])
        # Extract text AND html for guidance column to parse bullets
        
        texts = [clean_text(col.get_text(" ", strip=True)) for col in cols]
        
        if len(texts) >= 4:
            p_text = texts[1]
            p_guidance_html = str(cols[3]) if len(cols) > 3 else ""
            
            # Skip noise
            if len(p_text) < 10 or "Proficiency" in p_text: continue

            # 1. Parse content from Guidance Column (Column 3, index 3)
            # It usually contains <ul><li>...</li></ul>
            guidance_soup = BeautifulSoup(p_guidance_html, 'html.parser')
            bullets = [clean_text(li.get_text()) for li in guidance_soup.find_all('li')]
            
            # If no bullets found, try just using the text text block if it's substantial
            if not bullets:
                raw_guidance = texts[3]
                if len(raw_guidance) > 20: 
                    bullets = [raw_guidance]

            # 2. Create Examples from Bullets
            for bullet in bullets:
                if len(bullet) < 10: continue
                
                # Generate 2-3 variations per bullet to augment data
                templates = get_templates(p_text)
                
                # Pick 2 random templates to use for this specific bullet
                selected_templates = random.sample(templates, 2)
                
                for output_q in selected_templates:
                    dataset.append({
                        "instruction": output_q,
                        "input": "",
                        "output": bullet
                    })
                    
            # 3. Handle specific "Suggestive methods" if they are distinct lists
            # (Did not implement extensive parsing for col 2 yet as it's often short keywords)

    print(f"Generated {len(dataset)} granular examples.")
    
    # Append to existing
    exist_count = 0
    if os.path.exists(output_file):
        with open(output_file, 'r', encoding='utf-8') as f:
            exist_count = sum(1 for _ in f)
            
    with open(output_file, 'a', encoding='utf-8') as f:
        for entry in dataset:
            f.write(json.dumps(entry) + '\n')
            
    print(f"Total dataset size is now: {exist_count + len(dataset)}")

if __name__ == "__main__":
    process()

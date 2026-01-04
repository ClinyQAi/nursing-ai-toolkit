import json
import os
import re

input_file = r"c:\Users\g0226\Downloads\nmc_brain\data\existing_docs.json"
supp_file = r"c:\Users\g0226\Downloads\nmc_brain\data\supplementary_standards.json"
output_file = r"c:\Users\g0226\Downloads\nmc_brain\data\nmc_dataset.jsonl"

def clean_text(text):
    text = re.sub(r'\n+', '\n', text)
    text = re.sub(r' +', ' ', text)
    return text.strip()

def prepare():
    dataset = []
    
    # Process existing docs from DB
    if os.path.exists(input_file):
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for item in data:
            content = item['content']
            if not content or len(content) < 50:
                continue
                
            cleaned = clean_text(content)
            
            instruction = "Explain the NMC standards of proficiency for registered nurses."
            if "Domain" in cleaned:
                instruction = "Explain the domains of the NMC Competency Framework."
            elif "Platform" in cleaned:
                instruction = "Detail the requirements for the specific NMC Platform mentioned."
            elif "Year One" in cleaned or "Part One" in cleaned:
                instruction = "What are the first-year (Part One) nursing proficiencies according to the NMC standards?"
            elif "Year Two" in cleaned or "Part Two" in cleaned:
                instruction = "Describe the second-year (Part Two) nursing proficiencies as per the NMC framework."
            elif "medicines" in cleaned.lower():
                instruction = "What are the NMC standards for safe administration of medicines?"
                
            dataset.append({
                "instruction": instruction,
                "input": "",
                "output": cleaned
            })

    # Process supplementary standards (high-quality criteria)
    if os.path.exists(supp_file):
        with open(supp_file, 'r', encoding='utf-8') as f:
            supp_data = json.load(f)
            
        for platform in supp_data:
            p_num = platform['platform']
            p_title = platform['title']
            for criterion in platform['criteria']:
                instruction = f"What are the specific criteria for Platform {p_num}: {p_title} in the NMC Standards of Proficiency?"
                dataset.append({
                    "instruction": instruction,
                    "input": "",
                    "output": criterion
                })

    with open(output_file, 'w', encoding='utf-8') as f:
        for entry in dataset:
            f.write(json.dumps(entry) + '\n')

    print(f"Prepared {len(dataset)} examples in {output_file}")

if __name__ == "__main__":
    prepare()

import json
import os

# Files
code_file = r"c:\Users\g0226\Downloads\nmc_brain\data\nmc_code_content.json"
supp_file = r"c:\Users\g0226\Downloads\nmc_brain\data\supplementary_standards.json"
output_file = r"c:\Users\g0226\Downloads\nmc_brain\data\nmc_dataset_web.jsonl"

def prepare():
    dataset = []
    
    # 1. Process The Code (Crawled content)
    if os.path.exists(code_file):
        with open(code_file, 'r', encoding='utf-8') as f:
            code_data = json.load(f)
            
        for theme, sections in code_data.items():
            # Add a high-level summary entry for the theme? Maybe.
            # Let's focus on the sub-headings/sections
            for section in sections:
                heading = section['heading'] # e.g. "1 Treat people as individuals..."
                statements = section['statements'] # list of "1.1 ...", "1.2 ..."
                
                # Create an entry asking about the specific standard section
                clean_heading = heading.split(' ', 1)[1] if ' ' in heading else heading
                instruction = f"What are the detailed requirements for '{clean_heading}' under the NMC Code theme '{theme}'?"
                
                # Combine bullet points into a nice numbered list string
                formatted_output = f"Under the theme '{theme}', the standard '{heading}' requires that you:\n\n"
                formatted_output += "\n".join(statements)
                
                dataset.append({
                    "instruction": instruction,
                    "input": "",
                    "output": formatted_output
                })
                
                # Also create individual entries for specific sub-points if they are substantial?
                # For now, the section level is good granularity.

    # 2. Process Supplementary Standards (which user implies are safe/allowable re: proficiencies)
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

    # Write to JSONL
    with open(output_file, 'w', encoding='utf-8') as f:
        for entry in dataset:
            f.write(json.dumps(entry) + '\n')

    print(f"Prepared {len(dataset)} examples in {output_file} (Code + Supplementary)")

if __name__ == "__main__":
    prepare()

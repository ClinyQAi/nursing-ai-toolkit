import json
import os
import re

# We skip existing_docs.json as per user request to exclude 'nmc_proficiencies_db'
supp_file = r"c:\Users\g0226\Downloads\nmc_brain\data\supplementary_standards.json"
output_file = r"c:\Users\g0226\Downloads\nmc_brain\data\nmc_dataset_filtered.jsonl"

def prepare():
    dataset = []
    
    # Process ONLY supplementary standards
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

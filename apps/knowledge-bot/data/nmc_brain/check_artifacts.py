import json

file_path = r"c:\Users\g0226\Downloads\nmc_brain\data\nmc_dataset_web.jsonl"
keywords = ["label}}", "review}}", "Anais", "Click to edit"]

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        content = line.lower()
        for k in keywords:
            if k.lower() in content:
                print(f"Found '{k}' on line {i+1}: {line[:100]}...")

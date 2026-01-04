import json

file_path = 'data/nmc_dataset.jsonl'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        first_line = f.readline()
        if first_line:
            data = json.loads(first_line)
            print(json.dumps(data, indent=2))
        else:
            print("File is empty")
except Exception as e:
    print(f"Error reading file: {e}")

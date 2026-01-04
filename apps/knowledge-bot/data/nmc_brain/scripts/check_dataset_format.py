import json
import os
from collections import Counter

dataset_path = r"c:\Users\g0226\Downloads\nmc_brain\data\nmc_dataset.jsonl"

def check_dataset():
    if not os.path.exists(dataset_path):
        print(f"Error: {dataset_path} not found.")
        return

    stats = {
        "total_examples": 0,
        "empty_instructions": 0,
        "empty_outputs": 0,
        "short_outputs": 0, # < 50 chars
        "instruction_distribution": Counter(),
        "avg_output_length": 0
    }

    total_output_len = 0

    with open(dataset_path, 'r', encoding='utf-8') as f:
        for line in f:
            stats["total_examples"] += 1
            try:
                item = json.loads(line)
                instr = item.get("instruction", "").strip()
                out = item.get("output", "").strip()

                if not instr:
                    stats["empty_instructions"] += 1
                else:
                    stats["instruction_distribution"][instr] += 1

                if not out:
                    stats["empty_outputs"] += 1
                else:
                    if len(out) < 50:
                        stats["short_outputs"] += 1
                    total_output_len += len(out)

            except Exception as e:
                print(f"Error parsing line {stats['total_examples']}: {e}")

    if stats["total_examples"] > 0:
        stats["avg_output_length"] = total_output_len / stats["total_examples"]

    print("--- Dataset Verification Results ---")
    print(f"Total Examples: {stats['total_examples']}")
    print(f"Empty Instructions: {stats['empty_instructions']}")
    print(f"Empty Outputs: {stats['empty_outputs']}")
    print(f"Short Outputs (<50 chars): {stats['short_outputs']}")
    print(f"Average Output Length: {stats['avg_output_length']:.2f} characters")
    
    print("\n--- Instruction Distribution (Top 5) ---")
    for instr, count in stats["instruction_distribution"].most_common(5):
        print(f"- {instr}: {count}")

    if stats["empty_instructions"] == 0 and stats["empty_outputs"] == 0:
        print("\n[SUCCESS] Dataset structure looks valid for training.")

if __name__ == "__main__":
    check_dataset()

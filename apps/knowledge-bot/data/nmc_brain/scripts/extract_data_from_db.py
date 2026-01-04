import sqlite3
import os
import json

db_path = r"c:\Users\g0226\Downloads\nmc_brain\nmc_proficiencies_db\chroma.sqlite3"
output_path = r"c:\Users\g0226\Downloads\nmc_brain\data\existing_docs.json"

def extract_docs():
    if not os.path.exists(os.path.dirname(output_path)):
        os.makedirs(os.path.dirname(output_path))
        
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("Extracting documents from embedding_metadata...")
    cursor.execute("SELECT id, string_value FROM embedding_metadata WHERE key='chroma:document';")
    rows = cursor.fetchall()
    
    docs = []
    for row in rows:
        docs.append({
            "id": row[0],
            "content": row[1]
        })
        
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(docs, f, indent=2)
        
    print(f"Extracted {len(docs)} documents to {output_path}")
    conn.close()

if __name__ == "__main__":
    extract_docs()

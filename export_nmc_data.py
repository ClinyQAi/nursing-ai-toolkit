import sqlite3
import json
import os

# Paths
db_path = r"C:\Users\g0226\Downloads\Ai Education\nmc_proficiencies_db\chroma.sqlite3"
output_path = r"C:\Users\g0226\Downloads\Ai Education\AI-Educator-Toolkit\src\data\nmc_standards.json"

# Ensure output directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

def export_to_json():
    print(f"Connecting to: {db_path}")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Extract content from the FTS table (where the actual text lives)
    cursor.execute("SELECT id, c0 FROM embedding_fulltext_search_content")
    rows = cursor.fetchall()
    
    documents = []
    print("Exporting documents...")
    
    for row in rows:
        content = row['c0']
        if content and len(content.strip()) > 50: # Filter out empty or tiny chunks
            # Basic cleanup
            documents.append({
                "id": row['id'],
                "content": content.strip()
            })
            
    print(f"Found {len(documents)} valid documents.")
    
    # Save to JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(documents, f, indent=2)
    
    print(f"Exported to {output_path}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.2f} KB")

    conn.close()

if __name__ == "__main__":
    export_to_json()

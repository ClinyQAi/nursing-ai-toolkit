import sqlite3
import os
import json

db_path = r"C:\Users\g0226\Downloads\Ai Education\nmc_proficiencies_db\chroma.sqlite3"

def inspect_sqlite():
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return

    print(f"Connecting to: {db_path}")
    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # List tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [row['name'] for row in cursor.fetchall()]
        print(f"Tables found: {tables}")
        
        # Inspect Collections
        if 'collections' in tables:
            print("\n--- Collections ---")
            cursor.execute("SELECT * FROM collections")
            collections = cursor.fetchall()
            for col in collections:
                # Handle potential different schema versions by printing keys
                print(f"Collection: {dict(col)}")
                
                # Try to get count of embeddings for this collection
                col_id = col['id']
                if 'embeddings' in tables:
                    cursor.execute("SELECT count(*) as count FROM embeddings WHERE collection_id=?", (col_id,))
                    count = cursor.fetchone()['count']
                    print(f"  -> Contains {count} documents")
                    
                    # specific query for sample documents
                    print("  -> Sample Documents:")
                    cursor.execute("SELECT id, document, cmetadata FROM embeddings WHERE collection_id=? LIMIT 3", (col_id,))
                    samples = cursor.fetchall()
                    for sample in samples:
                         print(f"    - ID: {sample['id']}")
                         doc_preview = sample['document'][:100] + "..." if sample['document'] else "No text"
                         print(f"      Text: {doc_preview}")
                         print(f"      Metadata: {sample['cmetadata']}")

        conn.close()

    except Exception as e:
        print(f"Error reading SQLite: {e}")

if __name__ == "__main__":
    inspect_sqlite()

import sqlite3
import os

db_path = r"c:\Users\g0226\Downloads\nmc_brain\nmc_proficiencies_db\chroma.sqlite3"

def inspect_embedding_metadata():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("\n--- Columns in embedding_metadata ---")
    cursor.execute("PRAGMA table_info(embedding_metadata);")
    for row in cursor.fetchall():
        print(row)

    print("\n--- Sample Data from embedding_metadata ---")
    try:
        cursor.execute("SELECT * FROM embedding_metadata LIMIT 5;")
        for row in cursor.fetchall():
            print(row)
    except Exception as e:
        print(f"Error reading embedding_metadata: {e}")

    conn.close()

if __name__ == "__main__":
    inspect_embedding_metadata()

import sqlite3
import os

db_path = r"c:\Users\g0226\Downloads\nmc_brain\nmc_proficiencies_db\chroma.sqlite3"

def inspect_sqlite():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get collection ID for 'nmc_standards'
    cursor.execute("SELECT id FROM collections WHERE name='nmc_standards';")
    result = cursor.fetchone()
    if not result:
        print("Collection 'nmc_standards' not found.")
        return
    col_id = result[0]
    print(f"Collection 'nmc_standards' ID: {col_id}")

    # Check for embeddings and metadata
    # Schema varies, let's try common tables
    tables = ["embeddings", "embedding_metadata", "embedding_fulltext"]
    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table} WHERE collection_id=?;", (col_id,))
            count = cursor.fetchone()[0]
            print(f"Table {table} count for collection {col_id}: {count}")
            
            if count > 0:
                # Try to get some data
                cursor.execute(f"SELECT * FROM {table} WHERE collection_id=? LIMIT 2;", (col_id,))
                rows = cursor.fetchall()
                for row in rows:
                    print(f"Row from {table}: {row}")
        except Exception as e:
            print(f"Table {table} not found or error: {e}")

    conn.close()

if __name__ == "__main__":
    inspect_sqlite()

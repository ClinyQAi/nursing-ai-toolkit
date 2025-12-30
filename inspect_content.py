import sqlite3
import os

db_path = r"C:\Users\g0226\Downloads\Ai Education\nmc_proficiencies_db\chroma.sqlite3"

def inspect_contents():
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return

    print(f"Connecting to: {db_path}")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # 1. Get Collections
    print("\n=== Collections ===")
    cursor.execute("SELECT id, name FROM collections")
    collections = cursor.fetchall()
    for col in collections:
        print(f"ID: {col['id']} | Name: {col['name']}")

    # 2. Get Sample Content
    # The text is likely in embedding_fulltext_search_content
    print("\n=== Sample Documents (from fulltext content) ===")
    try:
        cursor.execute("SELECT id, c0 FROM embedding_fulltext_search_content LIMIT 5")
        rows = cursor.fetchall()
        for row in rows:
            print(f"\n[ID: {row['id']}]")
            content = row['c0']
            if content:
                print(f"Content: {content[:300]}...") # Print first 300 chars
            else:
                print("Content: <Empty>")
                
    except Exception as e:
        print(f"Error reading content: {e}")

    conn.close()

if __name__ == "__main__":
    inspect_contents()

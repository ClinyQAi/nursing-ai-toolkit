import sqlite3
import os

db_path = r"C:\Users\g0226\Downloads\Ai Education\nmc_proficiencies_db\chroma.sqlite3"

def inspect_schema():
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return

    print(f"Connecting to: {db_path}")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # List tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    print(f"Tables found: {tables}")
    
    for table in tables:
        print(f"\n--- Table: {table} ---")
        cursor.execute(f"PRAGMA table_info({table})")
        columns = cursor.fetchall()
        for col in columns:
            print(col)

    conn.close()

if __name__ == "__main__":
    inspect_schema()

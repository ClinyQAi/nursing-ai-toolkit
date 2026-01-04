import sqlite3
import os

db_path = r"c:\Users\g0226\Downloads\nmc_brain\nmc_proficiencies_db\chroma.sqlite3"

def inspect_seg_metadata():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("\n--- Columns in segment_metadata ---")
    cursor.execute("PRAGMA table_info(segment_metadata);")
    for row in cursor.fetchall():
        print(row)

    conn.close()

if __name__ == "__main__":
    inspect_seg_metadata()

import sqlite3
import os

db_path = r"c:\Users\g0226\Downloads\nmc_brain\nmc_proficiencies_db\chroma.sqlite3"

def inspect_columns():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    tables = ["collections", "segments", "tenants", "databases"]
    for table in tables:
        print(f"\n--- Columns in {table} ---")
        cursor.execute(f"PRAGMA table_info({table});")
        for row in cursor.fetchall():
            print(row)

    conn.close()

if __name__ == "__main__":
    inspect_columns()

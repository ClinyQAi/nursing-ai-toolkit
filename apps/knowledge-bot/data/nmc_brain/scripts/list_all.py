import sqlite3
import os

db_path = r"c:\Users\g0226\Downloads\nmc_brain\nmc_proficiencies_db\chroma.sqlite3"

def list_all():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # List all tables
    print("--- Tables ---")
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    print(", ".join(tables))
        
    # List tenants
    if "tenants" in tables:
        print("\n--- Tenants ---")
        cursor.execute("SELECT * FROM tenants;")
        for row in cursor.fetchall():
            print(row)

    # List databases
    if "databases" in tables:
        print("\n--- Databases ---")
        cursor.execute("SELECT * FROM databases;")
        for row in cursor.fetchall():
            print(row)

    # List collections
    if "collections" in tables:
        print("\n--- Collections ---")
        cursor.execute("SELECT * FROM collections;")
        for row in cursor.fetchall():
            print(row)

    # List segments
    if "segments" in tables:
        print("\n--- Segments ---")
        cursor.execute("SELECT id, type, scope, collection_id FROM segments;")
        for row in cursor.fetchall():
            print(row)

    conn.close()

if __name__ == "__main__":
    list_all()

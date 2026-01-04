import sqlite3
import os

db_path = r"c:\Users\g0226\Downloads\nmc_brain\nmc_proficiencies_db\chroma.sqlite3"

def get_data():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("--- Collections ---")
    cursor.execute("SELECT id, name FROM collections;")
    collections = cursor.fetchall()
    for col in collections:
        print(f"ID: {col[0]}, Name: {col[1]}")
        
    for col_id, col_name in collections:
        print(f"\n--- Segments for Collection: {col_name} ({col_id}) ---")
        cursor.execute("SELECT id, type, scope FROM segments WHERE collection=?;", (col_id,))
        segments = cursor.fetchall()
        for seg in segments:
            print(f"  Segment ID: {seg[0]}, Type: {seg[1]}, Scope: {seg[2]}")
            
            # If segment is metadata, try to read from segment_metadata
            cursor.execute("SELECT key, value_json_str FROM segment_metadata WHERE segment_id=?;", (seg[0],))
            metadata = cursor.fetchall()
            if metadata:
                print("  Metadata:")
                for m in metadata:
                    print(f"    {m[0]}: {m[1][:100]}...")

    conn.close()

if __name__ == "__main__":
    get_data()

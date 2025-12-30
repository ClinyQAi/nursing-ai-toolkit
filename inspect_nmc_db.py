import chromadb
import pandas as pd
import json

def inspect_db(path):
    client = chromadb.PersistentClient(path=path)
    collections = client.list_collections()
    
    print(f"Found {len(collections)} collections:")
    for col in collections:
        print(f"\nCollection: {col.name}")
        # Get first 2 items to see structure
        data = col.peek(limit=2)
        print(json.dumps({
            "ids": data['ids'],
            "metadata": data['metadatas'],
            "documents": [doc[:200] + "..." if doc and len(doc) > 200 else doc for doc in data['documents']]
        }, indent=2))

if __name__ == "__main__":
    db_path = r"C:\Users\g0226\Downloads\Ai Education\nmc_proficiencies_db"
    try:
        inspect_db(db_path)
    except Exception as e:
        print(f"Error: {e}")

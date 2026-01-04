import chromadb
import os

# Path to the chroma database
db_path = r"c:\Users\g0226\Downloads\nmc_brain\nmc_proficiencies_db"

def inspect_db():
    if not os.path.exists(db_path):
        print(f"Error: Database path {db_path} does not exist.")
        return

    client = chromadb.PersistentClient(path=db_path)
    collections = client.list_collections()
    
    print(f"Found {len(collections)} collections:")
    for collection in collections:
        print(f"- {collection.name}")
        
    for collection in collections:
        print(f"\n--- Collection: {collection.name} ---")
        col = client.get_collection(collection.name)
        count = col.count()
        print(f"Items count: {count}")
        
        if count > 0:
            # Get first 5 items
            results = col.peek(limit=5)
            print("First 5 items:")
            for i in range(len(results['ids'])):
                print(f"ID: {results['ids'][i]}")
                print(f"Metadata: {results['metadatas'][i]}")
                print(f"Document snippet: {results['documents'][i][:200]}...")
                print("-" * 20)

if __name__ == "__main__":
    inspect_db()

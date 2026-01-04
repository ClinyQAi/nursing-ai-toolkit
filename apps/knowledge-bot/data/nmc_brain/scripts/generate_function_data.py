import json
import random

# Define our "Nursing Tools"
TOOLS = [
    {
        "name": "record_vitals",
        "description": "Record patient vital signs into the EPR",
        "parameters": {
            "systolic": "int",
            "diastolic": "int",
            "heart_rate": "int",
            "temp_c": "float",
            "oxygen_sats": "int"
        }
    },
    {
        "name": "administer_medication",
        "description": "Log a medication administration event",
        "parameters": {
            "drug_name": "str",
            "dose": "str",
            "route": "str (e.g. PO, IV, IM)",
            "patient_id": "str"
        }
    },
    {
        "name": "search_nmc_standards",
        "description": "Search the NMC Code or Standards database for regulatory guidance",
        "parameters": {
            "query": "str"
        }
    }
]

# Template generators
def gen_vitals():
    sys = random.randint(90, 160)
    dia = random.randint(60, 100)
    hr = random.randint(60, 110)
    temp = round(random.uniform(36.1, 38.5), 1)
    
    prompts = [
        f"Patient's BP is {sys}/{dia}, pulse {hr}, temp {temp}.",
        f"Vitals check: Heart rate {hr}, Blood pressure {sys} over {dia}.",
        f"Just took obs. T {temp}, P {hr}, BP {sys}/{dia}.",
        f"Please record stats: {sys}/{dia} mmHg, {hr} bpm."
    ]
    
    func_call = f"record_vitals(systolic={sys}, diastolic={dia}, heart_rate={hr}, temp_c={temp})"
    return random.choice(prompts), func_call

def gen_meds():
    meds = [("Paracetamol", "1g", "PO"), ("Morphine", "10mg", "IV"), ("Amoxicillin", "500mg", "PO")]
    drug, dose, route = random.choice(meds)
    
    prompts = [
        f"I have given {drug} {dose} {route}.",
        f"Administered {dose} of {drug} via {route} route.",
        f"Signed off {drug} {dose}.",
        f"Patient received {drug} {dose} orally." if route=="PO" else f"Patient had {drug} {dose} {route}."
    ]
    
    func_call = f"administer_medication(drug_name='{drug}', dose='{dose}', route='{route}')"
    return random.choice(prompts), func_call

def gen_search():
    topic = random.choice(["confidentiality", "duty of candour", "social media use", "delegation", "medicines management"])
    prompts = [
        f"What does the NMC say about {topic}?",
        f"Check the guidelines on {topic}.",
        f"Is it okay to post this? Check {topic} rules.",
        f"Search standards for {topic}."
    ]
    func_call = f"search_nmc_standards(query='{topic}')"
    return random.choice(prompts), func_call

dataset = []
for _ in range(500): # Generate 500 examples
    type_ = random.choice(['vitals', 'meds', 'search'])
    if type_ == 'vitals':
        p, c = gen_vitals()
    elif type_ == 'meds':
        p, c = gen_meds()
    else:
        p, c = gen_search()
        
    dataset.append({
        "instruction": p,
        "input": "",
        "output": f"<function_call>{c}</function_call>" 
    })

output_file = r"c:\Users\g0226\Downloads\nmc_brain\data\nursing_functions_dataset.jsonl"
with open(output_file, 'w') as f:
    for entry in dataset:
        f.write(json.dumps(entry) + '\n')
        
print(f"Generated {len(dataset)} function examples to {output_file}")

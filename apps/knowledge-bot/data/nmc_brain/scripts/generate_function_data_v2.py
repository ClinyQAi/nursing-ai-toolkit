"""
Generate Improved Nursing Function Calling Dataset v2
=====================================================
This version creates MORE DIVERSE examples with EXPLICIT value extraction.
Focus: Show the model HOW to extract actual values from text.
"""

import json
import random

def generate_diverse_vitals():
    """Generate diverse vitals recording examples with actual values."""
    examples = []
    
    # Templates with varied phrasing
    bp_templates = [
        "BP is {sys}/{dia}",
        "Blood pressure: {sys}/{dia}",
        "Patient's BP {sys} over {dia}",
        "BP reading: {sys}/{dia}",
        "Recorded BP of {sys}/{dia}",
        "Blood pressure measured at {sys}/{dia}",
        "Current BP: {sys}/{dia}mmHg",
        "BP taken: {sys}/{dia}",
        "Systolic {sys}, diastolic {dia}",
        "Blood pressure {sys} systolic, {dia} diastolic",
    ]
    
    hr_templates = [
        "pulse {hr}",
        "heart rate {hr}",
        "HR {hr}",
        "pulse rate {hr}bpm",
        "heart rate of {hr}",
        "pulse: {hr}",
        "HR: {hr}/min",
        "pulse is {hr}",
    ]
    
    temp_templates = [
        "temp {temp}",
        "temperature {temp}",
        "T: {temp}",
        "temp {temp}°C",
        "temperature of {temp} degrees",
        "febrile at {temp}",
        "afebrile at {temp}",
        "temp: {temp}C",
    ]
    
    # Generate combinations
    for _ in range(150):
        sys = random.randint(90, 180)
        dia = random.randint(50, 110)
        hr = random.randint(50, 120)
        temp = round(random.uniform(35.5, 39.5), 1)
        
        # Full vitals
        bp_phrase = random.choice(bp_templates).format(sys=sys, dia=dia)
        hr_phrase = random.choice(hr_templates).format(hr=hr)
        temp_phrase = random.choice(temp_templates).format(temp=temp)
        
        combos = [
            (f"{bp_phrase}, {hr_phrase}, {temp_phrase}", 
             f"record_vitals(systolic={sys}, diastolic={dia}, heart_rate={hr}, temp_c={temp})"),
            (f"{bp_phrase}, {hr_phrase}", 
             f"record_vitals(systolic={sys}, diastolic={dia}, heart_rate={hr})"),
            (f"{bp_phrase}, {temp_phrase}", 
             f"record_vitals(systolic={sys}, diastolic={dia}, temp_c={temp})"),
            (f"{hr_phrase}, {temp_phrase}", 
             f"record_vitals(heart_rate={hr}, temp_c={temp})"),
            (f"{bp_phrase}", 
             f"record_vitals(systolic={sys}, diastolic={dia})"),
        ]
        
        combo = random.choice(combos)
        examples.append({
            "instruction": combo[0],
            "output": f"<function_call>{combo[1]}</function_call>"
        })
    
    # Add contextual variations
    contexts = [
        "Patient observations: ",
        "Morning obs: ",
        "Post-op vitals: ",
        "Current readings: ",
        "On assessment: ",
        "Vital signs: ",
        "Obs recorded: ",
        "Just took obs: ",
        "Pre-procedure: ",
        "Admission vitals: ",
    ]
    
    for _ in range(50):
        sys = random.randint(90, 180)
        dia = random.randint(50, 110)
        hr = random.randint(50, 120)
        temp = round(random.uniform(35.5, 39.5), 1)
        
        context = random.choice(contexts)
        bp = random.choice(bp_templates).format(sys=sys, dia=dia)
        hr_p = random.choice(hr_templates).format(hr=hr)
        
        examples.append({
            "instruction": f"{context}{bp}, {hr_p}",
            "output": f"<function_call>record_vitals(systolic={sys}, diastolic={dia}, heart_rate={hr})</function_call>"
        })
    
    return examples


def generate_diverse_medications():
    """Generate diverse medication administration examples."""
    examples = []
    
    drugs = [
        ("Paracetamol", ["500mg", "1g", "1000mg"]),
        ("Ibuprofen", ["200mg", "400mg", "600mg"]),
        ("Morphine", ["2.5mg", "5mg", "10mg", "15mg"]),
        ("Codeine", ["30mg", "60mg"]),
        ("Tramadol", ["50mg", "100mg"]),
        ("Amoxicillin", ["250mg", "500mg", "1g"]),
        ("Metformin", ["500mg", "850mg", "1g"]),
        ("Omeprazole", ["20mg", "40mg"]),
        ("Amlodipine", ["5mg", "10mg"]),
        ("Diazepam", ["2mg", "5mg", "10mg"]),
        ("Lorazepam", ["0.5mg", "1mg", "2mg"]),
        ("Insulin", ["4 units", "6 units", "10 units", "12 units"]),
        ("Enoxaparin", ["20mg", "40mg", "60mg"]),
        ("Dalteparin", ["2500 units", "5000 units"]),
        ("Furosemide", ["20mg", "40mg", "80mg"]),
        ("Aspirin", ["75mg", "300mg"]),
        ("Clopidogrel", ["75mg"]),
        ("Simvastatin", ["20mg", "40mg"]),
        ("Atorvastatin", ["10mg", "20mg", "40mg"]),
        ("Prednisolone", ["5mg", "25mg", "40mg"]),
    ]
    
    routes = {
        "PO": ["orally", "by mouth", "oral", "PO", "per oral", "swallowed"],
        "IV": ["intravenously", "IV", "intravenous", "via IV line", "IV push"],
        "IM": ["intramuscularly", "IM", "intramuscular injection", "IM injection"],
        "SC": ["subcutaneously", "SC", "subcut", "subcutaneous", "under the skin"],
        "PR": ["rectally", "PR", "per rectum"],
        "SL": ["sublingually", "SL", "under the tongue", "sublingual"],
        "NEB": ["via nebuliser", "nebulised", "nebulizer"],
        "TD": ["topically", "patch applied", "transdermal"],
    }
    
    templates = [
        "Gave {drug} {dose} {route}",
        "Given {drug} {dose} {route}",
        "Administered {drug} {dose} {route}",
        "{drug} {dose} {route} given",
        "Patient received {drug} {dose} {route}",
        "{drug} {dose} administered {route}",
        "Dispensed {drug} {dose} {route}",
        "{route} {drug} {dose}",
        "{drug} {dose} given {route} to patient",
        "Medication given: {drug} {dose} {route}",
    ]
    
    for _ in range(200):
        drug_name, doses = random.choice(drugs)
        dose = random.choice(doses)
        route_code, route_phrases = random.choice(list(routes.items()))
        route_phrase = random.choice(route_phrases)
        
        template = random.choice(templates)
        instruction = template.format(drug=drug_name, dose=dose, route=route_phrase)
        
        examples.append({
            "instruction": instruction,
            "output": f"<function_call>administer_medication(drug_name='{drug_name}', dose='{dose}', route='{route_code}')</function_call>"
        })
    
    return examples


def generate_diverse_nmc_searches():
    """Generate diverse NMC standards search examples."""
    examples = []
    
    topics = [
        "confidentiality",
        "duty of candour",
        "delegation",
        "raising concerns",
        "record keeping",
        "consent",
        "capacity",
        "safeguarding",
        "medicines management",
        "professional boundaries",
        "accountability",
        "fitness to practise",
        "revalidation",
        "student supervision",
        "social media",
        "whistleblowing",
        "patient dignity",
        "informed consent",
        "mental capacity",
        "deprivation of liberty",
        "end of life care",
        "pain management",
        "infection control",
        "hand hygiene",
        "clinical governance",
    ]
    
    templates = [
        "What does the NMC say about {topic}?",
        "Search NMC guidelines for {topic}",
        "Find NMC guidance on {topic}",
        "What are the NMC standards for {topic}?",
        "Look up {topic} in the NMC Code",
        "NMC guidance on {topic}",
        "What's the NMC position on {topic}?",
        "Search for {topic} guidelines",
        "Find information about {topic} from NMC",
        "What does the Code say about {topic}?",
        "NMC standards regarding {topic}",
        "Help me understand NMC requirements for {topic}",
        "Check NMC guidance: {topic}",
        "I need NMC guidelines on {topic}",
    ]
    
    for topic in topics:
        for template in templates:
            instruction = template.format(topic=topic)
            examples.append({
                "instruction": instruction,
                "output": f"<function_call>search_nmc_standards(query='{topic}')</function_call>"
            })
    
    # Shuffle and limit
    random.shuffle(examples)
    return examples[:150]


def main():
    print("Generating improved training dataset v2...")
    
    all_examples = []
    
    vitals = generate_diverse_vitals()
    print(f"Generated {len(vitals)} vitals examples")
    all_examples.extend(vitals)
    
    meds = generate_diverse_medications()
    print(f"Generated {len(meds)} medication examples")
    all_examples.extend(meds)
    
    nmc = generate_diverse_nmc_searches()
    print(f"Generated {len(nmc)} NMC search examples")
    all_examples.extend(nmc)
    
    # Shuffle
    random.shuffle(all_examples)
    
    print(f"\nTotal examples: {len(all_examples)}")
    
    # Save
    output_path = "data/nursing_functions_dataset_v2.jsonl"
    with open(output_path, 'w') as f:
        for ex in all_examples:
            f.write(json.dumps(ex) + '\n')
    
    print(f"Saved to: {output_path}")
    
    # Show samples
    print("\n--- Sample Examples ---")
    for ex in random.sample(all_examples, 5):
        print(f"\nInput: {ex['instruction']}")
        print(f"Output: {ex['output']}")


if __name__ == "__main__":
    main()

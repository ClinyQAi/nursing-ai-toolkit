"""
Model Testing Script for Nursing Proficiency+

This script tests the fine-tuned model using the prepared evaluation scenarios.
It can be run locally or in Google Colab.
"""

import json
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Configuration
MODEL_ID = "NurseCitizenDeveloper/nursing-proficiency-plus"
SCENARIOS_PATH = "train/evaluation_scenarios.json"

def load_model_and_tokenizer():
    """Load the fine-tuned model and tokenizer."""
    print("Loading model and tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        torch_dtype=torch.bfloat16,
        device_map="auto",
        trust_remote_code=True
    )
    return model, tokenizer

def load_scenarios():
    """Load evaluation scenarios from JSON file."""
    with open(SCENARIOS_PATH, 'r') as f:
        return json.load(f)

def generate_response(model, tokenizer, prompt, max_length=512):
    """Generate a response from the model."""
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_length,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    # Remove the prompt from the response
    response = response[len(prompt):].strip()
    return response

def test_scenario(model, tokenizer, scenario):
    """Test a single scenario and return results."""
    print(f"\n{'='*80}")
    print(f"Scenario: {scenario['title']}")
    print(f"Platform: {scenario.get('platform', 'Annex B')}")
    print(f"{'='*80}")
    print(f"\nPrompt:")
    print(f"{scenario['prompt']}")
    print(f"\n{'-'*80}")
    
    response = generate_response(model, tokenizer, scenario['prompt'])
    
    print(f"\nModel Response:")
    print(response)
    print(f"\n{'-'*80}")
    print(f"Expected Themes to Validate:")
    for theme in scenario['expected_themes']:
        # Check if theme is mentioned (case-insensitive)
        present = theme.lower() in response.lower()
        status = "✓" if present else "✗"
        print(f"  {status} {theme}")
    
    return {
        'scenario_id': scenario['id'],
        'title': scenario['title'],
        'response': response,
        'expected_themes': scenario['expected_themes']
    }

def main():
    """Main testing function."""
    print("="*80)
    print("Nursing Proficiency+ Model Testing")
    print("="*80)
    
    # Load model and scenarios
    model, tokenizer = load_model_and_tokenizer()
    scenarios = load_scenarios()
    
    print(f"\nLoaded {len(scenarios)} evaluation scenarios")
    
    # Test each scenario
    results = []
    for scenario in scenarios:
        result = test_scenario(model, tokenizer, scenario)
        results.append(result)
    
    # Summary
    print(f"\n{'='*80}")
    print("Testing Complete!")
    print(f"{'='*80}")
    print(f"\nTested {len(results)} scenarios")
    print("\nNext steps:")
    print("1. Review the responses for accuracy and alignment with nursing standards")
    print("2. Check if expected themes are present in the responses")
    print("3. Validate outputs with subject matter experts")
    
    # Save results
    with open('test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    print("\nResults saved to: test_results.json")

if __name__ == "__main__":
    main()

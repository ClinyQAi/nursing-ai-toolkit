# Nursing Proficiency+ Model Testing Guide

This guide will help you test your fine-tuned model using the prepared evaluation scenarios.

## Quick Start (Google Colab)

### 1. Setup
```python
# Install dependencies
!pip install transformers torch accelerate

# Login to Hugging Face (use your token)
from huggingface_hub import login
login(token="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")
```

### 2. Load Your Model
```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_id = "NurseCitizenDeveloper/nursing-proficiency-plus"

tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
    device_map="auto",
    trust_remote_code=True
)
```

### 3. Test a Scenario
```python
def generate_response(prompt, max_length=512):
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
    return response[len(prompt):].strip()

# Test with Platform 1 scenario
prompt = "You are an NMC-compliant nursing assistant. A student nurse asks why it is important to keep 'timely' records according to Platform 1. How should you explain this based on the standards?"

response = generate_response(prompt)
print(response)
```

## Evaluation Scenarios

We have prepared 5 clinical scenarios covering different platforms:

1. **Platform 1**: Accountable Professional & Records
2. **Platform 3**: Assessing Needs & Person-Centred Care  
3. **Platform 6**: Improving Safety & Risk Assessment
4. **Platform 2**: Infection Prevention & Control
5. **Annex B**: Safe Administration of Medicines

All scenarios are available in: `train/evaluation_scenarios.json`

## Using the Automated Testing Script

### Local or Colab
```bash
python train/test_model.py
```

This will:
- Load all 5 evaluation scenarios
- Generate responses for each
- Check for expected themes
- Save results to `test_results.json`

## What to Look For

When reviewing model outputs, validate:

✅ **Accuracy**: Does it align with nursing proficiency standards?  
✅ **Completeness**: Are key concepts covered?  
✅ **Person-Centred**: Does it prioritize patient dignity and autonomy?  
✅ **Professional Language**: Is it appropriate for nursing education?  
✅ **Safety**: Does it emphasize accountability and safe practice?

## Validation Checklist

- [ ] Responses align with NMC/professional standards
- [ ] Person-centred care principles are evident
- [ ] Professional accountability is emphasized
- [ ] Safety and risk management appropriately addressed
- [ ] Language is suitable for nursing education context
- [ ] No harmful or biased content present

## Advanced Testing

For production use, consider:
- Testing with real student nurse questions
- Peer review by practice educators
- Comparison with base MedGemma model
- A/B testing in educational settings

## Reporting Issues

If you find concerning outputs:
1. Document the prompt and response
2. Note the specific concern (bias, inaccuracy, etc.)
3. Report via GitHub or directly to the model maintainer

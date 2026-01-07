---
license: apache-2.0
base_model: google/medgemma-4b-it
tags:
- generated_from_trainer
- nursing
- healthcare
- function-calling
- research
- prototype
model-index:
- name: nursing-function-gemma
  results: []
---

# Nursing FunctionGemma - Research Prototype 🏥🔬

> ⚠️ **Research Prototype**: This model demonstrates the challenges of fine-tuning LLMs for function calling tasks. See [Lessons Learned](#lessons-learned) below.

## Model Description

This is a **research prototype** of a LoRA adapter fine-tuned on Google's MedGemma-4b-it, designed to explore function calling capabilities for nursing clinical workflows.

### Training Results

| Metric | Value |
|--------|-------|
| Training Examples | 550 |
| Epochs | 8 |
| Final Training Loss | **0.077** |
| LoRA Rank | 32 |

Despite achieving very low training loss, the model exhibits unexpected behavior during inference.

## ⚠️ Known Issues

### The Problem

The model was trained to convert natural language clinical notes into structured function calls:

**Expected Behavior:**
```
Input: "BP is 120/80, pulse 72"
Output: record_vitals(systolic=120, diastolic=80, heart_rate=72)
```

**Actual Behavior:**
```
Input: "BP is 120/80, pulse 72"
Output: record_vitals(systolic=X, diastolic=Y, heart_rate=Z, temp_c=T)
```

The model outputs **parameter templates** instead of extracting actual values from the input.

### Evaluation Results

| Metric | Score |
|--------|-------|
| Function Name Accuracy | 28% |
| Value Extraction Rate | **0%** |
| Exact Match Accuracy | 0% |

## Lessons Learned

This prototype demonstrates important challenges in fine-tuning LLMs for function calling:

1. **Low training loss ≠ good generalization**: Despite 0.077 final loss, the model didn't learn value extraction
2. **Prompt format sensitivity**: The system prompt with placeholder variables (X, Y, Z) was copied literally
3. **Overfitting risk**: Small dataset + many epochs can lead to memorization rather than learning
4. **Alternative approaches work better**: Native API function calling (e.g., Gemini API) achieved **94% accuracy** on the same task

## Recommended Alternative

For production use, we recommend using **Google Gemini API** with native function calling:

- Function Name Accuracy: **94%**
- Value Extraction Rate: **98%**

See the [Nursing FunctionGemma Demo Space](https://huggingface.co/spaces/NurseCitizenDeveloper/nursing-function-gemma-demo) for a working implementation.

## About the Creator

### Lincoln Gombedza

Multi-award-winning Registered Learning Disability Nurse and pioneer of the **Nurse Citizen Developer** movement. This research contributes to understanding how AI can support nursing education and clinical documentation.

**Learn more**: [Nursing Citizen Development](https://nursingcitizendevelopment.com)

## Acknowledgments

- Professor Joanne Bosanquet - Foundation of Nursing Studies
- Hector Musonza - Practice Education Lead
- Kumbi Kariwo - Expert in Coded Bias & Nurse Citizen Developer

## Citation

```bibtex
@misc{gombedza2024nursingfunctiongemma,
  author = {Lincoln Gombedza},
  title = {Nursing FunctionGemma: A Research Prototype for Function-Calling in Nursing},
  year = {2024},
  note = {Research prototype demonstrating challenges in LLM fine-tuning for function calling}
}
```

## License

Apache 2.0

---

**This research was conducted as part of the Nursing Citizen Development initiative.** 🩺

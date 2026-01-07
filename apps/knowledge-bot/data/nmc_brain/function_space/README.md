---
title: Nursing FunctionGemma
emoji: 🏥
colorFrom: green
colorTo: blue
sdk: gradio
sdk_version: 4.44.0
app_file: app.py
pinned: false
license: apache-2.0
---

# 🏥 Nursing FunctionGemma

**Transform natural language clinical notes into structured EPR function calls**

## What is This?

**Nursing FunctionGemma** converts verbal clinical documentation into structured API calls using Google Gemini's native function calling.

## Available Functions

| Function | Description | Example Input |
|----------|-------------|---------------|
| `record_vitals()` | Record patient vitals | "BP 120/80, pulse 72" |
| `administer_medication()` | Log medication | "Gave Paracetamol 1g orally" |
| `search_nmc_standards()` | Search NMC guidelines | "NMC guidance on consent" |

## Performance

| Metric | Score |
|--------|-------|
| Function Name Accuracy | **94%** |
| Value Extraction Rate | **98%** |
| Test Cases | 50 |

## Example

**Input:**
```
Patient's BP is 120/80, pulse 72, temp 37.2
```

**Output:**
```python
record_vitals(systolic=120, diastolic=80, heart_rate=72, temp_c=37.2)
```

## Important Notes

⚠️ For **educational and demonstration purposes**:
- Outputs should be validated before production use
- Does not replace clinical judgment

## About

**Developed by**: Lincoln Gombedza and Nursing Citizen Development

Powered by Google Gemini API 🩺✨

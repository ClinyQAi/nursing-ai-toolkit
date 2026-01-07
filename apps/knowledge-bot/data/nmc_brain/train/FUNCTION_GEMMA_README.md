---
license: apache-2.0
base_model: google/medgemma-4b-it
tags:
- generated_from_trainer
- nursing
- healthcare
- function-calling
- citizen-development
- medgemma
library_name: peft
---

# Nursing FunctionGemma 🏥

**A Nurse Citizen Developer's Journey into AI Function Calling**

This model is a fine-tuned version of [google/medgemma-4b-it](https://huggingface.co/google/medgemma-4b-it), trained using TRL (Transformers Reinforcement Learning) to explore function calling capabilities for nursing clinical workflows.

## 🌟 The Citizen Development Story

This project embodies the spirit of **Nurse Citizen Development** - the belief that nurses should not only be users of technology but also its **builders, architects, and guardians**.

As a Registered Learning Disability Nurse and Practice Educator, I embarked on this journey to explore whether fine-tuning could enable clinical function calling - converting natural language nursing notes into structured EPR (Electronic Patient Record) commands.

## 🎯 What This Model Attempts

Convert clinical notes like:
```
"BP is 120/80, pulse 72, temp 37.2"
```

Into structured function calls:
```python
record_vitals(systolic=120, diastolic=80, heart_rate=72, temp_c=37.2)
```

### Available Functions
- `record_vitals()` - Record patient vital signs
- `administer_medication()` - Log medication administration
- `search_nmc_standards()` - Search NMC nursing guidelines

## 📊 Training Details

| Parameter | Value |
|-----------|-------|
| Base Model | google/medgemma-4b-it |
| Method | QLoRA (4-bit quantization) |
| Training Examples | 550 |
| Epochs | 8 |
| LoRA Rank | 32 |
| LoRA Alpha | 64 |
| Final Training Loss | 0.077 |

## 🔬 Research Findings

This prototype revealed important insights about fine-tuning LLMs for function calling:

### What We Learned

1. **Low training loss doesn't guarantee success** - Despite achieving 0.077 loss, value extraction remained challenging
2. **Prompt design is critical** - The model learned patterns from the training prompt format
3. **Alternative approaches may work better** - Native API function calling (Gemini API) achieved 94% accuracy on the same task

### Recommendation

For production use, consider using **Gemini API** with native function calling, which demonstrated:
- Function Name Accuracy: **94%**
- Value Extraction Rate: **98%**

See the working demo: [Nursing FunctionGemma Space](https://huggingface.co/spaces/NurseCitizenDeveloper/nursing-function-gemma-demo)

## 👨‍⚕️ About the Creator

### Lincoln Gombedza

Multi-award-winning Registered Learning Disability Nurse, Practice Educator, and pioneer of the **Nurse Citizen Developer** movement.

- **Lead Architect of Open Nursing Core IG** - Bridging clinical expertise and technological innovation
- **Digital Transformation Leader** - Co-chaired the CNO's Professional Strategy Working Group on Digital and Technology
- **International Collaborator** - BMJ Future Health Committee, Nursing Now Challenge European Hub Lead

Lincoln advocates that nurses should be equipped with data literacy, citizen development skills, and AI safety knowledge to lead in the digital era.

**Learn more**: [Nursing Citizen Development](https://nursingcitizendevelopment.com)

## 🙏 Acknowledgments

- **Professor Joanne Bosanquet** - Chief Executive, Foundation of Nursing Studies (FONS)
- **Hector Musonza** - Practice Education and Preceptorship Lead
- **Kumbi Kariwo** - Expert in Coded Bias & Nurse Citizen Developer

## 📚 Related Resources

- 📖 [Nursing Proficiency+ Coach](https://huggingface.co/NurseCitizenDeveloper/nursing-proficiency-plus) - Conversational coaching model
- 🏥 [FunctionGemma Demo](https://huggingface.co/spaces/NurseCitizenDeveloper/nursing-function-gemma-demo) - Working demo using Gemini API

## 📝 Citation

```bibtex
@misc{gombedza2024nursingfunctiongemma,
  author = {Lincoln Gombedza},
  title = {Nursing FunctionGemma: Exploring AI Function Calling for Nursing Workflows},
  year = {2024},
  publisher = {Hugging Face},
  note = {A Nurse Citizen Developer research project}
}
```

## License

Apache 2.0

---

**Built by nurses, for nurses. Empowering the profession through Citizen Development.** 🩺✨

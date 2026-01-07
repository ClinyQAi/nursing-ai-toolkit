---
license: apache-2.0
base_model: google/medgemma-4b-it
tags:
- generated_from_trainer
- nursing
- healthcare
- clinical-ai
- function-calling
- nursing-education
- citizen-development
- agents
model-index:
- name: nursing-function-gemma
  results: []
---

# Nursing FunctionGemma 🏥🤖

**Nursing FunctionGemma** is a specialized fine-tuned version of Google's MedGemma-4b-it model, designed to perform **structured function calling** for nursing clinical workflows.

## Model Description

This model has been fine-tuned on **500 synthetic examples** of nursing function calls, enabling it to translate natural language clinical statements into structured API calls. It serves as the "action layer" for a compound AI system that can simulate Electronic Patient Records (EPR) interactions.

### Key Features

- 🎯 **Function Calling Specialist**: Trained to output structured `<function_call>` XML tags
- 📊 **Clinical Vitals Recording**: Converts verbal observations into `record_vitals()` calls
- 💊 **Medication Logging**: Transforms medication administration notes into `administer_medication()` calls
- 📖 **Standards Lookup**: Routes regulatory queries to `search_nmc_standards()` calls
- 🔒 **Gated Access**: Private repository ensuring controlled distribution
- 💡 **Citizen Development**: Created by nurses, for nurses

## Available Functions

| Function | Description | Parameters |
|----------|-------------|------------|
| `record_vitals()` | Record patient vital signs | `systolic`, `diastolic`, `heart_rate`, `temp_c` |
| `administer_medication()` | Log medication administration | `drug_name`, `dose`, `route` |
| `search_nmc_standards()` | Search NMC Code/Standards | `query` |

## Intended Use

### Primary Use Cases

- **Simulated EPR Training**: Teaching students to document care digitally
- **Voice-to-Action Pipelines**: Converting ambient voice notes into structured records
- **Clinical Documentation Automation**: Assisting with accurate care logging
- **Compound AI Systems**: Acting as the "action router" in multi-model architectures

### Out-of-Scope Use

⚠️ This model is **NOT** intended for:
- Production clinical systems without validation
- Direct patient-facing applications
- Replacing clinical judgment or professional accountability
- Use outside of educational or simulated environments

## Training Details

### Training Data

The model was trained on a synthetic dataset of **500 nursing function call examples**, including:
- Vital signs recording scenarios (BP, pulse, temperature)
- Medication administration events (PO, IV, IM routes)
- NMC standards searches (confidentiality, duty of candour, delegation)

### Training Procedure

- **Fine-tuning Method**: QLoRA (Quantized Low-Rank Adaptation)
- **Base Model**: google/medgemma-4b-it
- **Training Framework**: TRL (Transformers Reinforcement Learning) with SFT
- **Hardware**: Google Colab with T4 GPU
- **Epochs**: 5
- **Final Training Loss**: 0.74
- **Batch Size**: 4 (effective batch size: 16 with gradient accumulation)
- **Precision**: fp16

### Model Architecture

- **LoRA Configuration**:
  - Rank (r): 16
  - Alpha: 32
  - Target Modules: q_proj, k_proj, v_proj, o_proj

## Example Usage

**Input:**
```
Patient's BP is 120/80, pulse 72, temp 37.2
```

**Output:**
```xml
<function_call>record_vitals(systolic=120, diastolic=80, heart_rate=72, temp_c=37.2)</function_call>
```

**Input:**
```
I've given Paracetamol 1g orally
```

**Output:**
```xml
<function_call>administer_medication(drug_name='Paracetamol', dose='1g', route='PO')</function_call>
```

## About the Creator

### Lincoln Gombedza

**Lincoln Gombedza** is a multi-award-winning Registered Learning Disability Nurse, Practice Educator, and pioneering leader in the **Nurse Citizen Developer** movement. He is dedicated to integrating artificial intelligence (AI) and digital technologies to transform patient care and empower the nursing profession.

#### Key Contributions

- **Lead Architect of the Open Nursing Core IG**: Bridging the gap between frontline clinical expertise and technological innovation to ensure nursing values, visibility, and autonomy are maintained in the era of ambient intelligence.
- **Champion of Nurse Citizen Developers**: Empowering nurses to create their own digital solutions and actively participate in the digital transformation of healthcare through mentorship and cross-sector innovation.
- **Digital Transformation Leader**: Co-chaired the Chief Nursing Officer's Professional Strategy Working Group on Digital and Technology, shaping the long-term vision for nursing and midwifery in alignment with the NHS 10-Year Health Plan.
- **International Collaborator**: Serves on the BMJ Future Health Committee and is the European Regional Hub Lead for the Nursing Now Challenge. Collaborations include WHO, NHS Digital Shared Decision-Making Council, and the NMC.
- **COVID-19 Response**: Led the deployment of telehealth solutions supporting over 10,000 patients during the pandemic, incorporating AI-powered patient management and predictive analytics.

Lincoln advocates that nurses should not only be users of technology but also its **builders, architects, and guardians**. His work emphasizes equipping nurses with data literacy, citizen development skills, and AI safety knowledge to lead in the digital era.

**Learn more**: [Nursing Citizen Development](https://nursingcitizendevelopment.com)

## Acknowledgments

This project would not have been possible without the invaluable support and guidance of the following individuals:

### Professor Joanne Bosanquet
**Chief Executive, Foundation of Nursing Studies (FONS)**

Professor Bosanquet's leadership at FONS has been instrumental in championing practice development and supporting nurses to become active agents of change. Her commitment to person-centred care and evidence-based practice provides the ethical foundation for this work.

### Hector Musonza
**Practice Education and Preceptorship Lead, North Staffordshire Combined Healthcare Trust**

Hector's expertise in practice education and his dedication to developing the next generation of nurses have been crucial in shaping the educational focus of this model. His insights into preceptorship and clinical learning environments ensure this tool aligns with real-world nursing practice.

### Kumbi Kariwo
**Expert in Coded Bias & Nurse Citizen Developer**

Kumbi's work in addressing coded bias and promoting equity in AI systems has been essential in ensuring this model upholds principles of fairness, inclusivity, and person-centred care. Her perspective as both a nurse and a citizen developer exemplifies the collaborative, equity-focused approach at the heart of this project.

## Safety and Ethical Considerations

### Limitations

- This model is trained on synthetic data and should be validated before production use
- Function outputs should be verified by clinical systems before execution
- The model may not handle edge cases or unusual clinical presentations
- Cultural and contextual factors should always be considered

### Bias Mitigation

This project has been developed with careful attention to:
- **Coded Bias**: Ensuring fair and equitable representation across diverse nursing contexts
- **Person-Centred Care**: Prioritizing individual dignity, autonomy, and holistic care
- **Professional Accountability**: Supporting, not replacing, registered nurses' professional judgment

### Responsible Use

Users are expected to:
- ✅ Use outputs in simulated/educational environments
- ✅ Validate all function calls before execution in production systems
- ✅ Maintain professional accountability for all clinical decisions
- ✅ Report any concerning or biased outputs for continuous improvement

## Related Models

- 📚 [Nursing Proficiency+](https://huggingface.co/NurseCitizenDeveloper/nursing-proficiency-plus) - Conversational coaching model for nursing education

## Citation

If you use this model in your work, please cite:

```bibtex
@misc{gombedza2024nursingfunctiongemma,
  author = {Lincoln Gombedza},
  title = {Nursing FunctionGemma: A Function-Calling AI Agent for Nursing Workflows},
  year = {2024},
  publisher = {Hugging Face},
  howpublished = {\url{https://huggingface.co/NurseCitizenDeveloper/nursing-function-gemma}},
  note = {Developed by Lincoln Gombedza and Nursing Citizen Development}
}
```

## License

This model is released under the Apache 2.0 license, promoting open and responsible use in nursing education and practice development.

---

**Built by nurses, for nurses. Empowering the profession through Citizen Development.** 🩺✨

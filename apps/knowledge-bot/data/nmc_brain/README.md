---
license: apache-2.0
base_model: google/medgemma-4b-it
tags:
- generated_from_trainer
- nursing
- healthcare
- clinical-ai
- nursing-education
- citizen-development
model-index:
- name: nursing-proficiency-plus
  results: []
---

# Nursing Proficiency+ 🩺

**Nursing Proficiency+** is a specialized fine-tuned version of Google's MedGemma-4b-it model, designed to support nursing education and practice through comprehensive knowledge of nursing proficiency standards.

## Model Description

This model has been fine-tuned on **1,298 high-quality examples** derived from nursing proficiency standards and professional practice frameworks. It provides evidence-based guidance aligned with international nursing competency frameworks and person-centred care principles.

### Key Features

- 🎯 **Specialized in Nursing Proficiency Standards**: Trained on comprehensive nursing competency frameworks
- 🔒 **Gated Access**: Private repository ensuring controlled distribution
- 📚 **Evidence-Based**: Built on **1,298 validated nursing proficiency examples**
- 🌍 **International Relevance**: Applicable across diverse healthcare contexts
- 💡 **Citizen Development**: Created by nurses, for nurses

## Intended Use

### Primary Use Cases

- **Nursing Education**: Supporting student learning and competency development
- **Clinical Practice Guidance**: Providing evidence-based decision support for registered nurses
- **Continuing Professional Development**: Enhancing ongoing learning and skills maintenance
- **Assessment Support**: Assisting in proficiency evaluation and portfolio development

### Out-of-Scope Use

⚠️ This model is **NOT** intended for:
- Direct clinical decision-making without professional oversight
- Replacing clinical judgment or professional accountability
- Use outside of educational or professional development contexts
- Diagnostic or treatment recommendations

## Training Details

### Training Data

The model was trained on a curated dataset of **1,298 nursing proficiency examples**, including:
- **Granular NMC Proficiency Standards**: Detailed breakdown of "Future Nurse" proficiencies
- **Guidance & Suggestive Methods**: Specific actions and behaviors for students
- Professional practice standards and frameworks
- Person-centred care principles

### Training Procedure

- **Fine-tuning Method**: QLoRA (Quantized Low-Rank Adaptation)
- **Base Model**: google/medgemma-4b-it
- **Training Framework**: TRL (Transformers Reinforcement Learning) with SFT
- **Hardware**: Google Colab with T4 GPU
- **Epochs**: 3
- **Batch Size**: 1 (effective batch size: 16 with gradient accumulation)
- **Precision**: bf16
- **Optimizer**: paged_adamw_8bit

### Model Architecture

- **LoRA Configuration**:
  - Rank (r): 64
  - Alpha: 16
  - Dropout: 0.1
  - Target Modules: q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj

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

- This model provides educational support and should not replace clinical judgment
- Responses should always be validated against current evidence-based practice guidelines
- The model may not reflect the most recent policy or guideline updates
- Cultural and contextual factors should always be considered when applying guidance

### Bias Mitigation

This project has been developed with careful attention to:
- **Coded Bias**: Ensuring fair and equitable representation across diverse nursing contexts
- **Person-Centred Care**: Prioritizing individual dignity, autonomy, and holistic care
- **Professional Accountability**: Supporting, not replacing, registered nurses' professional judgment

### Responsible Use

Users are expected to:
- ✅ Use outputs as educational support and reference material
- ✅ Validate all guidance against current professional standards
- ✅ Maintain professional accountability for all clinical decisions
- ✅ Report any concerning or biased outputs for continuous improvement

## Citation

If you use this model in your work, please cite:

```bibtex
@misc{gombedza2024nursingproficiency,
  author = {Lincoln Gombedza},
  title = {Nursing Proficiency+: A Fine-Tuned MedGemma Model for Nursing Education},
  year = {2024},
  publisher = {Hugging Face},
  howpublished = {\url{https://huggingface.co/NurseCitizenDeveloper/nursing-proficiency-plus}},
  note = {Developed by Lincoln Gombedza and Nursing Citizen Development}
}
```

## Framework Versions

- **Transformers**: 4.57.3
- **TRL**: 0.26.2
- **PyTorch**: 2.5.1+cu124
- **Datasets**: 3.2.0
- **Tokenizers**: 0.21.0

## License

This model is released under the Apache 2.0 license, promoting open and responsible use in nursing education and practice development.

---

**Built by nurses, for nurses. Empowering the profession through Citizen Development.** 🩺✨

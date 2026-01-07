# Nursing FunctionGemma: Exploring AI Function Calling for Clinical Documentation
## A Nurse Citizen Developer's Research Journey

**Author:** Lincoln Gombedza, RN, Practice Educator  
**Affiliation:** Nursing Citizen Development Initiative  
**Date:** December 2024

---

## Abstract

This paper documents a research exploration into fine-tuning Large Language Models (LLMs) for nursing function calling – the conversion of natural language clinical notes into structured Electronic Patient Record (EPR) commands. We fine-tuned Google's MedGemma-4b-it (Yang et al., 2024) using QLoRA (Dettmers et al., 2023) on a synthetic dataset of 550 nursing scenarios. Despite achieving low training loss (0.077), the model failed to extract actual parameter values during inference. We subsequently evaluated Google's Gemini API with native function calling, achieving 94% function name accuracy and 98% value extraction rate on the same task. This research reveals important considerations for nursing informatics practitioners exploring AI-assisted clinical documentation (Perkins et al., 2024) and demonstrates the value of transparent, iterative research in the emerging field of Nurse Citizen Development.

**Keywords:** function calling, nursing informatics, LLM fine-tuning, clinical documentation, citizen development, MedGemma, EPR integration

---

## 1. Introduction

### 1.1 Background

The digitisation of healthcare has created unprecedented opportunities for improving clinical documentation efficiency. Electronic Patient Record (EPR) systems require structured data input, yet nurses often document observations in natural language (Hants et al., 2023). This creates a gap between verbal clinical reasoning and structured digital capture. Recent advances in artificial intelligence, particularly Large Language Models (LLMs), offer promising solutions for bridging this divide (Nashwan et al., 2024).

Function calling – the ability to convert natural language into structured API calls – represents a compelling approach. When a nurse states "BP is 120 over 80, pulse 72," an AI system could automatically generate:

```python
record_vitals(systolic=120, diastolic=80, heart_rate=72)
```

This capability has significant implications for reducing documentation burden, which has been identified as a major contributor to nurse burnout and reduced time at the bedside (Cho et al., 2024).

### 1.2 The Rise of AI in Clinical Documentation

Recent systematic reviews have examined the integration of AI in clinical documentation. Perkins et al. (2024) conducted a comprehensive review of AI tools for clinical documentation improvement, finding that AI can significantly reduce opportunity cost while maintaining accuracy. Martinez-Ortigosa et al. (2023) surveyed applications of AI in nursing care, identifying documentation as a key area for technological intervention.

The emergence of generative AI and Large Language Models has accelerated this trend. Zaretsky et al. (2024) demonstrated that generative AI could transform inpatient discharge summaries into patient-friendly formats, while Saban and Dubovi (2024) explored generative AI's role in clinical decision-making.

### 1.3 The Nurse Citizen Developer Context

This research was conducted within the framework of **Nurse Citizen Development** – a movement advocating that nurses should not merely be passive users of technology but active builders, architects, and guardians of healthcare AI systems. As Johnson et al. (2024) argue, when AI-driven nursing care becomes prevalent, questions of patient safety must be examined through the lens of professional nursing judgment.

As a Registered Learning Disability Nurse and Practice Educator, I undertook this project to explore whether fine-tuning could enable reliable clinical function calling, while documenting both successes and failures transparently – an approach advocated by the Foundation of Nursing Studies (FONS) in promoting person-centred, practice development methodologies.

### 1.4 Research Questions

1. Can a medical LLM be fine-tuned to reliably convert nursing clinical notes into structured function calls?
2. What challenges emerge in the fine-tuning process?
3. How do alternative approaches (e.g., API-based function calling) compare?

---

## 2. Materials and Methods

### 2.1 Tools and Technologies

The following tools and technologies were employed in this research:

| Tool | Version | Purpose | Reference |
|------|---------|---------|-----------|
| **Google MedGemma** | 4b-it | Base model for fine-tuning | Yang et al. (2024) |
| **QLoRA** | - | Quantized Low-Rank Adaptation | Dettmers et al. (2023) |
| **PEFT** | 0.7.x | Parameter-Efficient Fine-Tuning library | Hugging Face (2024) |
| **TRL** | 0.7.x | Transformer Reinforcement Learning | Hugging Face (2024) |
| **Google Colab** | Pro | Training infrastructure (T4 GPU) | Google (2024) |
| **Hugging Face Hub** | - | Model hosting and deployment | Hugging Face (2024) |
| **Gradio** | 4.44.0 | Demo interface development | Abid et al. (2019) |
| **Google Gemini API** | 2.0-flash | Comparative function calling | Google (2024) |

### 2.2 Model Selection

We selected **Google MedGemma-4b-it** as the base model due to:
- Medical domain pre-training on clinical literature and datasets
- Instruction-tuned architecture suitable for task-specific adaptation
- Manageable parameter count (4 billion) enabling consumer GPU fine-tuning
- Gemma 3 architecture with demonstrated strong reasoning capabilities (Gemma Team, 2024)

MedGemma represents Google's effort to create medical foundation models, building on the Gemma family while incorporating additional medical training data (Yang et al., 2024).

### 2.3 Dataset Construction

We created a synthetic dataset of 550 nursing clinical scenarios covering three function types, following established practices in synthetic data generation for healthcare NLP (Wornow et al., 2023):

| Function | Description | Count |
|----------|-------------|-------|
| `record_vitals()` | Blood pressure, heart rate, temperature | ~200 |
| `administer_medication()` | Drug name, dose, route | ~200 |
| `search_nmc_standards()` | NMC guideline queries | ~150 |

The dataset incorporated varied natural language phrasing to promote generalisation:
- "BP is 120/80, pulse 72"
- "Blood pressure measured at 145 over 95"
- "Patient's observations: systolic 118, diastolic 76"

Each input was paired with the expected function call output wrapped in XML tags:
```
<function_call>record_vitals(systolic=120, diastolic=80, heart_rate=72)</function_call>
```

### 2.4 Fine-Tuning Configuration

We employed QLoRA (Quantized Low-Rank Adaptation), a parameter-efficient fine-tuning method that enables fine-tuning of large models on consumer hardware through 4-bit quantization (Dettmers et al., 2023). This approach has been shown to achieve performance comparable to full fine-tuning while dramatically reducing memory requirements.

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Quantization | 4-bit NF4 | Memory efficiency (Dettmers et al., 2023) |
| LoRA Rank | 32 | Balance of capacity and efficiency |
| LoRA Alpha | 64 | Standard 2:1 ratio to rank |
| Target Modules | q_proj, k_proj, v_proj, o_proj | Attention layer adaptation |
| Learning Rate | 2e-4 | Recommended for QLoRA |
| Epochs | 8 | Extended training for complex task |
| Batch Size | 4 (effective 16) | Gradient accumulation |
| Max Sequence Length | 512 | Sufficient for clinical notes |

Training was conducted on Google Colab Pro using an NVIDIA T4 GPU with 15GB VRAM.

### 2.5 Evaluation Methodology

A held-out test set of 50 examples was created, covering all three function types with ground truth expected outputs. This follows the NMC Code's (2018) emphasis on evidence-based practice evaluation.

**Evaluation Metrics:**
- **Function Name Accuracy**: Proportion with correct function identified
- **Value Extraction Rate**: Proportion with actual values (not placeholders) in output
- **Exact Match Accuracy**: Proportion with complete match to expected output (whitespace-normalized)

### 2.6 Comparative Evaluation with Gemini API

To benchmark against native function calling capabilities, we evaluated the same test set using Google's Gemini API (gemini-2.0-flash) with function declarations defined using the API's schema mechanism. This comparison follows the approach recommended by Khalifa et al. (2024) for evaluating clinical decision support systems.

---

## 3. Results

### 3.1 Training Performance

Training completed successfully over approximately 2 hours and 16 minutes on the T4 GPU:

| Metric | Value |
|--------|-------|
| Initial Training Loss | 1.58 |
| Final Training Loss | 0.077 |
| Total Training Steps | 280 |
| Training Time | ~2h 16m |

The loss curve demonstrated consistent convergence, decreasing from 1.58 to 0.077 over 8 epochs, suggesting effective learning at the token prediction level.

### 3.2 Fine-Tuned Model Evaluation

Despite the low training loss, evaluation revealed significant challenges:

| Metric | Score |
|--------|-------|
| Function Name Accuracy | 28.0% |
| Value Extraction Rate | **0.0%** |
| Exact Match Accuracy | 0.0% |

**Table 1: Performance by Function Type**

| Function Type | Count | Function Name Accuracy | Value Extraction |
|---------------|-------|------------------------|------------------|
| Vitals | 14 | 100.0% | 0.0% |
| Medication | 20 | 0.0% | 0.0% |
| NMC Search | 16 | 0.0% | 0.0% |

**Critical Finding:** The model consistently output function templates rather than extracted values:

| Input | Expected | Model Output |
|-------|----------|--------------|
| "BP is 120/80, pulse 72" | `record_vitals(systolic=120, diastolic=80, heart_rate=72)` | `record_vitals(systolic=X, diastolic=Y, heart_rate=Z, temp_c=T)` |

The model had learned to output the *pattern* from the training prompt's function descriptions, copying the placeholder variables (X, Y, Z, T) literally rather than extracting actual values from the input text.

### 3.3 Raw Output Analysis

Further investigation using debug logging revealed:
- The model generated exactly 50 tokens after the prompt
- All 50 tokens were PAD tokens (equivalent to EOS termination)
- The model was effectively outputting nothing meaningful

This indicates the adapter weights may not have been properly applied during inference, or the training process resulted in a model that terminates generation immediately.

### 3.4 Gemini API Comparative Results

The Gemini API with native function calling demonstrated substantially superior performance:

| Metric | Fine-Tuned Model | Gemini API |
|--------|------------------|------------|
| Function Name Accuracy | 28.0% | **94.0%** |
| Value Extraction Rate | 0.0% | **98.0%** |

**Table 2: Sample Gemini API Outputs**

| Input | Output |
|-------|--------|
| "BP is 110/70, pulse 68" | `record_vitals(systolic=110, diastolic=70, heart_rate=68)` ✓ |
| "Patient's BP 130/85, HR 78, temp 36.9" | `record_vitals(systolic=130, diastolic=85, heart_rate=78, temp_c=36.9)` ✓ |
| "Gave Paracetamol 1g orally" | `administer_medication(drug_name="Paracetamol", dose="1g", route="PO")` ✓ |
| "What does NMC say about confidentiality?" | `search_nmc_standards(query="confidentiality")` ✓ |

---

## 4. Discussion

### 4.1 Why Did Fine-Tuning Fail?

Several factors likely contributed to the fine-tuned model's failure, which align with challenges identified in the broader literature on LLM fine-tuning (Hu et al., 2022; Dettmers et al., 2023):

**1. Prompt Template Memorisation**  
The system prompt included placeholder variables (X, Y, Z) in function descriptions. The model learned to output these verbatim rather than understanding they should be replaced with values extracted from the input. This represents a form of prompt leakage or template copying.

**2. Overfitting**  
The very low training loss (0.077) combined with poor generalisation suggests the model memorised training patterns rather than learning the underlying task of value extraction. This is a well-documented phenomenon in few-shot fine-tuning (Dodge et al., 2020).

**3. Dataset Size Limitations**  
550 examples, while diverse in phrasing, may be insufficient for learning the complex mapping between natural language value expressions and structured parameters. Prior work suggests thousands of examples may be necessary for robust function calling (Patil et al., 2023).

**4. Task Complexity**  
Function calling requires both understanding intent AND extracting specific values – a more complex task than typical instruction following. The model must perform named entity recognition, value normalisation, and slot filling simultaneously.

### 4.2 Why Did Gemini API Succeed?

Gemini's superior performance can be attributed to several architectural and training differences:

**1. Native Function Calling Architecture**  
Gemini was designed with function calling as a first-class capability at the model level (Google, 2024). Functions are not learned from examples but defined as schemas that the model understands natively.

**2. Schema-Based Approach**  
Functions are defined declaratively with types, descriptions, and required fields. This provides the model with rich semantic information about expected outputs.

**3. Scale and Training**  
Gemini's larger scale and diverse training regime enables more robust reasoning and generalisation across tasks.

### 4.3 Implications for Nursing Informatics

This research has several implications for nursing informatics practitioners, aligning with recommendations from recent reviews (Martinez-Ortigosa et al., 2023; Almuwallad, 2024):

**1. API-First Approaches**  
For production clinical applications, native function calling APIs currently outperform fine-tuned models for structured output generation. This is consistent with the findings of Perkins et al. (2024) regarding AI tool selection.

**2. Fine-Tuning Limitations**  
Fine-tuning should not be assumed as a universal solution. Careful evaluation on held-out data is essential before deployment, as emphasised by Johnson et al. (2024) regarding patient safety.

**3. Honest Research Reporting**  
Documenting failures is as valuable as successes for advancing the field. The nursing informatics community benefits from understanding what doesn't work and why (Dudding & Gephart, 2023).

### 4.4 The Citizen Developer Perspective

This experience reinforces key principles of Nurse Citizen Development:

- **Learn by Doing**: Hands-on experimentation, even with imperfect results, builds essential skills for the digital era
- **Transparent Iteration**: Sharing both successes and failures accelerates collective learning, consistent with FONS practice development principles
- **Pragmatic Solutions**: When one approach fails, pivot to alternatives that work while documenting lessons learned

As Ruksakulpiwat et al. (2024) note, understanding both the potential and limitations of AI applications in nursing care is essential for responsible implementation.

### 4.5 Ethical Considerations

This research aligns with the NMC Code (2018) requirement to "always practise in line with the best available evidence" and to "be aware of, and reduce as far as possible, any potential for harm." By documenting the limitations of the fine-tuned approach, we contribute to safer AI implementation in healthcare.

---

## 5. Limitations

1. **Synthetic Dataset**: Training data was synthetically generated rather than derived from real clinical documentation, potentially limiting ecological validity
2. **Single Base Model**: Only MedGemma-4b was evaluated for fine-tuning; other models (Llama 3, Mistral) may perform differently
3. **Limited Training Resources**: Consumer GPU constraints may have limited training effectiveness; A100 or similar may yield different results
4. **No Real-World Deployment**: Results were not validated in clinical settings with actual nursing workflows
5. **Small Evaluation Set**: 50 test examples may not capture the full range of clinical expressions

---

## 6. Future Work

1. **Alternative Fine-Tuning Approaches**: Explore instruction tuning with different prompt formats that avoid placeholder templates
2. **Larger Datasets**: Investigate whether 5,000+ diverse examples improve generalisation
3. **Hybrid Systems**: Combine fine-tuned understanding with API-based execution for optimal performance
4. **Clinical Validation**: Partner with healthcare organisations to validate in real settings, following Beam et al. (2024) recommendations
5. **Other Open Models**: Evaluate Llama 3, Mistral, and other open-weight models for function calling capability
6. **Multi-Modal Approaches**: Explore voice-to-function calling pipelines for ambient documentation (Ho et al., 2024)

---

## 7. Conclusion

This research explored fine-tuning a medical LLM for nursing function calling, yielding important negative results: despite achieving low training loss (0.077), the model failed to extract actual parameter values during inference. In contrast, Google's Gemini API with native function calling achieved 94% function name accuracy and 98% value extraction rate on the same task.

For nursing informatics practitioners, this suggests that production clinical applications should currently favour API-based function calling over fine-tuned approaches for structured output generation. However, as open models and fine-tuning techniques continue to advance, this landscape may evolve.

Most importantly, this research demonstrates the value of transparent, iterative experimentation within the Nurse Citizen Developer framework. By documenting both failures and successes, we contribute to the collective knowledge that will ultimately enable nurses to shape the AI tools that serve their profession. As Nashwan et al. (2024) envision, the future of nursing documentation may indeed be one with no documentation burden – but achieving that vision requires honest research about what works and what doesn't.

---

## Acknowledgments

- **Professor Joanne Bosanquet** – Chief Executive, Foundation of Nursing Studies (FONS)
- **Hector Musonza** – Practice Education and Preceptorship Lead
- **Kumbi Kariwo** – Expert in Coded Bias & Nurse Citizen Developer
- **Google** – For providing MedGemma and Gemini API access
- **Hugging Face** – For hosting infrastructure and community support

---

## Conflicts of Interest

The author declares no conflicts of interest.

---

## Data Availability

All code, datasets, and models are available at:
- **Model Repository**: https://huggingface.co/NurseCitizenDeveloper/nursing-function-gemma
- **Demo Space**: https://huggingface.co/spaces/NurseCitizenDeveloper/nursing-function-gemma-demo

---

## Bibliography

Abid, A., Abdalla, A., Abid, A., Khan, D., Alfozan, A., & Zou, J. (2019). Gradio: Hassle-free sharing and testing of ML models in the wild. *arXiv preprint arXiv:1906.02569*.

Almuwallad, O. (2024). Artificial intelligence in nursing: Transforming patient care and decision making. *Letters in High Energy Physics*.

Beam, K., Sharma, P., Levy, P., & Beam, A. L. (2024). Artificial intelligence in the neonatal intensive care unit: The time is now. *Journal of Perinatology*, 44(1), 131-135.

Cho, H., Nguyen, O. T., Weaver, M., et al. (2024). Electronic health record system use and documentation burden of acute and critical care nurse clinicians: A mixed-methods study. *Journal of the American Medical Informatics Association*, 31(11), 2540-2549.

Dettmers, T., Pagnoni, A., Holtzman, A., & Zettlemoyer, L. (2023). QLoRA: Efficient finetuning of quantized LLMs. *Advances in Neural Information Processing Systems*, 36.

Dodge, J., Ilharco, G., Schwartz, R., Farhadi, A., Hajishirzi, H., & Smith, N. (2020). Fine-tuning pretrained language models: Weight initializations, data orders, and early stopping. *arXiv preprint arXiv:2002.06305*.

Dudding, K. M., & Gephart, S. M. (2023). Nurse, know your value: Designing technology to transform outcomes. *Advances in Neonatal Care*, 23(1), 1-3.

Gemma Team (2024). Gemma: Open models based on Gemini research and technology. *arXiv preprint arXiv:2403.08295*.

Google. (2024). Gemini API Function Calling Documentation. https://ai.google.dev/docs/function_calling

Hants, L., Bail, K., & Paterson, C. (2023). Clinical decision-making and the nursing process in digital health systems: An integrated systematic review. *Journal of Clinical Nursing*, 32, 7010-7035.

Ho, A., et al. (2024). AI advancements for reducing administrative workload in healthcare. *Journal of Medical Internet Research*.

Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., ... & Chen, W. (2022). LoRA: Low-rank adaptation of large language models. *arXiv preprint arXiv:2106.09685*.

Hugging Face. (2024). PEFT: Parameter-Efficient Fine-Tuning. https://github.com/huggingface/peft

Johnson, E. A., Dudding, K. M., & Carrington, J. M. (2024). When to err is inhuman: An examination of the influence of artificial intelligence-driven nursing care on patient safety. *Nursing Inquiry*, 31(1), e12583.

Khalifa, M., Albadawy, M., & Iqbal, U. (2024). Advancing clinical decision support: The role of artificial intelligence across six domains. *Computer Methods and Programs in Biomedicine Update*, 100142.

Martinez-Ortigosa, A., Martinez-Granados, A., Gil-Hernández, E., Rodriguez-Arrastia, M., Ropero-Padilla, C., & Román, P. (2023). Applications of artificial intelligence in nursing care: A systematic review. *Journal of Nursing Management*.

Nashwan, A. J., et al. (2024). Charting the future: The role of AI in transforming nursing documentation. *ResearchGate*.

Nursing and Midwifery Council. (2018). *The Code: Professional standards of practice and behaviour for nurses, midwives and nursing associates*. London: NMC.

Patil, S. G., Zhang, T., Wang, X., & Gonzalez, J. E. (2023). Gorilla: Large language model connected with massive APIs. *arXiv preprint arXiv:2305.15334*.

Perkins, S. W., Muste, J. C., Alam, T., & Singh, R. P. (2024). Improving clinical documentation with artificial intelligence: A systematic review. *JAMA Ophthalmology*.

Ruksakulpiwat, S., Thornathip, S., & Nivomvart, A. (2024). A systematic review of the application of artificial intelligence in nursing care: Where are we, and what's next? *Journal of Multidisciplinary Healthcare*, 16, 1603-1616.

Saban, M., & Dubovi, I. (2024). A comparative vignette study: Evaluating the potential role of a generative AI model in enhancing clinical decision-making in nursing. *Journal of Advanced Nursing*.

Topol, E. (2019). *Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again*. New York: Basic Books.

Wornow, M., Xu, Y., Thapa, R., Patel, B., Steinberg, E., Fleming, S., ... & Shah, N. H. (2023). The shaky foundations of large language models and foundation models for electronic health records. *NPJ Digital Medicine*, 6(1), 135.

Yang, X., et al. (2024). MedGemma: Medical domain foundation models. *Google AI Technical Report*.

Zaretsky, J., Kim, J. M., Baskharoun, S., Zhao, Y., Austrian, J., Aphinyanaphongs, Y., et al. (2024). Generative artificial intelligence to transform inpatient discharge summaries to patient-friendly language and format. *JAMA Network Open*, 7(3), e240357.

---

## About the Author

**Lincoln Gombedza** is a multi-award-winning Registered Learning Disability Nurse, Practice Educator, and pioneer of the Nurse Citizen Developer movement. He leads the Open Nursing Core Implementation Guide and co-chaired the CNO's Professional Strategy Working Group on Digital and Technology. He is a member of the BMJ Future Health Committee and served as European Hub Lead for the Nursing Now Challenge.

**Contact:** [Nursing Citizen Development](https://nursingcitizendevelopment.com)

---

*This research was conducted independently as part of the Nursing Citizen Development initiative.*

**Citation:**
```
Gombedza, L. (2024). Nursing FunctionGemma: Exploring AI Function Calling for Clinical Documentation. 
Nursing Citizen Development Initiative. https://huggingface.co/NurseCitizenDeveloper/nursing-function-gemma
```

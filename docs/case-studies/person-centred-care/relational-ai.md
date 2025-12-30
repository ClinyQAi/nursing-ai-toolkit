---
sidebar_position: 3
title: Relational AI & FoNS Insights
description: Using AI grounded in nursing values and evidence
---

# Relational AI & FoNS Insights

:::info Attribution
**Original work**: "Educators' guide to multimodal learning and Generative AI" — Tünde Varga-Atkins, Samuel Saunders, et al. (2024/25) — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)  
**Adapted for UK Nursing Education by**: Lincoln Gombedza, RN (LD)  
**Last Updated**: December 2025
:::

## What is Relational AI?

**Relational AI** is an approach to using artificial intelligence that prioritises the *relational* aspects of nursing—empathy, compassion, and person-centredness—over purely transactional outputs. It moves AI from being a tool that simply generates answers to one that helps nurses *reflect* on their practice.

> "AI cannot feel, but it can help us examine how we feel about the care we give."

This approach is inspired by the work of the **Foundation of Nursing Studies (FoNS)**, whose [International Practice Development Journal](https://www.fons.org/library/journal/) is a treasure trove of open-access, peer-reviewed research on person-centred practice.

---

## The FoNS "Person-Centred Nursing Framework"

![Person-Centred Nursing Framework Diagram](@site/static/img/pcc_framework_diagram.png)

The **Person-Centred Nursing Framework** (McCormack & McCance, 2006; updated 2017) is a widely-used model that underpins person-centred care. It consists of four key constructs:

| Construct | Description |
|---|---|
| **Prerequisites** | Attributes of the nurse (competence, commitment, values) |
| **The Care Environment** | Context in which care is delivered (skill mix, systems, culture) |
| **Person-Centred Processes** | Working with the patient's beliefs, values and engagement |
| **Expected Outcomes** | Satisfaction, involvement, well-being |

### Using AI to Reflect on the Framework

AI can help students and educators apply this framework by:

1.  **Analysing care plans**: Prompting AI to identify where a care plan does (or does not) reflect person-centred processes.
2.  **Simulating reflective dialogue**: Using AI to role-play a clinical supervisor who asks probing questions about a student's experience.
3.  **Translating "Medicalese"**: Checking care documentation for jargon and suggesting more accessible, person-centred language.

---

## Open-Source Resources from FoNS

The following resources from FoNS are **freely available** for educational use:

| Resource | Description | Link |
|---|---|---|
| **IPDJ Archive** | Full archive of the International Practice Development Journal (2011-2023) | [fons.org/library/journal](https://www.fons.org/library/journal/) |
| **Creating Caring Cultures** | Programme for developing person-centred workplaces | [fons.org/programmes](https://www.fons.org/programmes/) |
| **Resilience-based Clinical Supervision** | Model for restorative supervision | [fons.org/resources](https://www.fons.org/resources/) |

---

## The "Wisdom Engine" Concept

An emerging open-source initiative, often referred to as the "Wisdom Engine" or **Relational AI for Nursing**, involves training AI models on nursing-specific, person-centred literature.

**Key Features:**
- **Grounded in Evidence**: Models are fine-tuned on datasets derived from peer-reviewed nursing research, including FoNS publications.
- **Person-Centred Language**: Outputs are designed to reflect the language and values of compassionate nursing, not generic chatbot responses.
- **Synthetic Datasets**: Publicly available training data includes "flashcards" for nursing theory, such as clinical transcripts paired with SBAR notes.

:::tip For Developers
If you are interested in exploring how AI can be trained on nursing values, look into open-source projects like the [Nursing Citizen Development initiative](https://nursingcitizendevelopment.com/).
:::

---

## Try It: Relational AI Prompts

### Prompt 1: Reflective Supervision

```text
Act as a clinical supervisor using the FoNS Resilience-based Clinical Supervision model. I am a nursing student who just had a difficult interaction with a patient who was refusing treatment. Help me reflect on the person-centredness of my communication, using the Person-Centred Nursing Framework (McCormack & McCance).

Ask me open-ended questions to guide my reflection. Do not give me answers; help me discover insights myself.
```

### Prompt 2: Care Plan Review

```text
I will provide you with a nursing care plan. Your role is to act as an expert in person-centred care. Analyse the care plan and identify:
1. Areas where person-centred processes are evident.
2. Areas where the language could be more patient-focused.
3. Suggestions for incorporating the patient's own goals and values.

Please use the Person-Centred Nursing Framework as your guide.

[Paste care plan here]
```

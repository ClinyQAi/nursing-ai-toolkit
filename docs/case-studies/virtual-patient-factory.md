---
sidebar_position: 3
title: Virtual Patient Factory
description: Generate AI-powered clinical scenarios for student practice
---

# Virtual Patient Factory

import VirtualPatientFactory from '@site/src/components/VirtualPatientFactory';

:::info Inspired by Research
This tool is inspired by King's College London's [Virtual Patients](https://ehealth.kcl.ac.uk/tel/virtual-patients/index.html) project, but enhanced with **Generative AI** to provide dynamic feedback rather than static "model answers".
:::

## What is This?

The **Virtual Patient Factory** helps you create realistic clinical scenarios in seconds, modeled on the classic case study format:

1. **Presentation** → Chief complaint and vital signs
2. **History** → PMH, medications, social history
3. **Examination** → Physical findings
4. **Investigations** → Lab results, ECG, imaging
5. **Management** → Treatment plan

## Two Modes

### 🏭 Generate Mode
Create scenarios for in-class discussions, formative assessments, or self-directed learning.

**Use Case:** *"I need a moderate-complexity chest pain case for Year 2 students to practice acute care."*

### 🎓 Critique Mode
Students paste a scenario, write their answer (e.g., differential diagnosis), and receive **AI-powered feedback** on what they got right, what they missed, and how to improve.

**Use Case:** *"The student identified MI but didn't mention door-to-balloon time. The AI will flag this critical omission."*

<VirtualPatientFactory />

## How KCL Does It vs. How We Do It

| Feature | KCL Virtual Patients | Our Toolkit |
| :--- | :--- | :--- |
| **Content** | Static, pre-written | **Dynamic, AI-generated** |
| **Feedback** | "Reveal Model Answer" button | **AI critiques student response** |
| **Customization** | Fixed scenarios | **Infinite variations** |
| **Accessibility** | University-specific | **Open-access** |

## Educational Rationale

This tool addresses the "static vs. dynamic" gap in simulation:
- **Traditional approach**: Students compare their answer to a model answer (passive).
- **AI-enhanced approach**: Students receive **personalized feedback** that identifies *specific* gaps in their reasoning (active learning).

:::tip For Educators
Use "Generate Mode" to quickly create scenarios for **Vivas** or **OSCE stations**. The AI-generated content gives you a starting point that you can refine based on your module's learning outcomes.
:::

:::warning Limitations
- The AI generates *plausible* clinical content but may occasionally produce inaccuracies. **Always review** before using in high-stakes assessments.
- This tool is a **teaching aid**, not a replacement for real patient interaction or verified clinical guidelines.
:::

## Example Workflow

1. **Educator**: Generate a "Breathlessness" scenario for a 70-year-old (Moderate complexity).
2. **Student**: Reviews the Presentation and History, then writes their differential diagnosis.
3. **AI Critique**: Highlights that the student correctly identified heart failure but missed the need to check BNP levels.
4. **Learning**: Student understands the importance of biomarkers in diagnostic workup.

## Future Enhancements

We are exploring:
- **Multimedia support**: Upload ECG images for AI interpretation.
- **Multi-patient scenarios**: Manage 3 patients simultaneously (like a real ward).
- **Integration with NMC competencies**: Auto-tag scenarios by proficiency standard.

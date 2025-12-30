---
sidebar_position: 3
title: Person-Centred Language Checker
description: Using AI to identify and improve jargon and institutional bias in care documentation
---

# Person-Centred Language Checker

:::info Attribution
**Original work**: "Educators' guide to multimodal learning and Generative AI" — Tünde Varga-Atkins, Samuel Saunders, et al. (2024/25) — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)  
**Adapted for UK Nursing Education by**: Lincoln Gombedza, RN (LD)  
**Last Updated**: December 2025
:::

## The Problem with "Medicalese"

Healthcare documentation is often filled with jargon, abbreviations, and institutional language that can:

- **Dehumanise** patients (e.g., "the diabetic in bed 5")
- **Exclude** patients from their own care (if they read their notes)
- **Perpetuate** power imbalances between staff and patients
- **Obscure** the person behind the condition

Person-centred language puts the **individual first**, not their diagnosis.

---

## What is a Language Checker?

A "Person-Centred Language Checker" uses AI to:

1.  **Identify** jargon, abbreviations, and impersonal language in care documentation.
2.  **Suggest** alternative phrasing that centres the patient's identity and preferences.
3.  **Highlight** subtle biases or assumptions embedded in clinical language.

:::tip Open Source Tool
The [Nursing Citizen Development](https://nursingcitizendevelopment.com/) project has developed an open-source Person-Centred Language Checker trained on nursing-specific literature from the Foundation of Nursing Studies (FoNS).
:::

---

## Examples of Language Transformation

| Original (Institutional) | Revised (Person-Centred) |
|---|---|
| "Patient non-compliant with medication regime." | "Mrs Patel has chosen not to take her evening medication. We discussed her concerns about side effects." |
| "Diabetic admitted with DKA." | "Mr Ahmed, who lives with Type 1 diabetes, was admitted with diabetic ketoacidosis." |
| "Confused and agitated overnight." | "Mrs Brown appeared unsettled overnight, possibly due to an unfamiliar environment." |
| "Bed 3 needs obs." | "Mrs Johnson is due for her observations." |

---

## Try It: AI Prompts for Language Checking

### Prompt 1: Basic Language Check

```text
You are an expert in person-centred nursing language. I will give you a sentence from a care record. Your task is to:
1. Identify any jargon, abbreviations, or impersonal language.
2. Rewrite the sentence to be more person-centred, putting the individual first.
3. Explain why your revision is more person-centred.

Here is the sentence:
"Patient refused physio this AM. Remains bedbound."
```

**Expected Output:**

> **Identified Issues:**
> - "Patient" is impersonal; should use the person's name.
> - "refused" implies defiance; could be "chose not to" or "was not ready for".
> - "AM" is jargon.
> - "Remains bedbound" is clinical and passive.
>
> **Revised Sentence:**
> "Mrs Davies chose not to attend physiotherapy this morning. She shared that she was feeling tired. We will offer support again this afternoon when she feels more rested."
>
> **Explanation:**
> This revision centres Mrs Davies's agency and acknowledges her feelings, rather than labelling her behaviour as "refusal".

---

### Prompt 2: Full Document Review

```text
I am a nursing student. Please review the following care note for person-centred language. For each issue you find:
- Quote the original phrase.
- Explain why it is problematic.
- Provide a suggested revision.

Care Note:
"72 y/o female. Hx of HTN, HF, CKD. Non-compliant with fluid restriction. Oedematous ankles noted. Son present—states pt 'doesn't listen'. SBAR completed. Awaiting medical review."
```

---

### Prompt 3: Self-Assessment

```text
I am a nursing student. I have written the following care note. Using the principles of person-centred care, give me feedback on my language. Be honest but supportive.

My Note:
"Mr Jones had a fall last night. He was found on the floor by night staff. He is known to be a falls risk. He was helped back to bed and obs were done. No injury noted."
```

---

## Classroom Activity: The Language Audit

**Objective:** Develop critical awareness of language in care documentation.

**Time:** 30 minutes

### Instructions

1.  **Collect Examples:** Ask students to bring (anonymised) examples of care documentation from their placements.
2.  **Audit in Pairs:** Using the AI prompts above, have pairs of students "audit" each other's examples for person-centred language.
3.  **Rewrite:** Each student rewrites one problematic note.
4.  **Discuss:** As a class, discuss:
    - What patterns did you notice?
    - Why does this language persist in practice?
    - What are the barriers to using person-centred language in busy clinical environments?

---

## Key Principles of Person-Centred Language

| Principle | Example |
|---|---|
| **Use names, not labels** | "Mrs Patel" not "the diabetic" |
| **Person-first language** | "A person living with dementia" not "a dementia patient" |
| **Agency over passivity** | "Mr Jones chose to rest" not "Patient refused to mobilise" |
| **Acknowledge feelings** | "Mrs Brown appeared distressed" not "Patient agitated" |
| **Avoid assumptions** | "Son shared his concerns" not "Son states patient doesn't listen" |

---

## Further Reading

- [Foundation of Nursing Studies (FoNS)](https://www.fons.org/) — Resources on person-centred practice.
- [Person-Centred Nursing Framework (McCormack & McCance)](https://pubmed.ncbi.nlm.nih.gov/?term=person-centred+nursing+framework) — The theoretical underpinning of this approach.
- [Nursing Citizen Development](https://nursingcitizendevelopment.com/) — Open-source AI tools for nursing.

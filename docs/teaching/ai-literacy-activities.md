---
sidebar_position: 6
title: AI Literacy Activities
description: Practical activities to build AI literacy in nursing students
---

# 🧠 AI Literacy Activities

:::info Attribution
**Original work**: "Educators' guide to multimodal learning and Generative AI" — Tünde Varga-Atkins, Samuel Saunders, et al. (2024/25) — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)  
**Adapted for UK Nursing Education by**: Lincoln Gombedza, RN (LD)  
**Last Updated**: December 2025
:::

Developing AI literacy requires practice. Use these three ready-to-use activities to move students from passive consumers to critical evaluators.

## 🚀 Activity Selector

<div className="row">
  <div className="col col--4 margin-bottom--md">
    <div className="card h-100">
      <div className="card__header" style={{borderTop: "5px solid #4caf50"}}>
        <h3>1. The Critique</h3>
      </div>
      <div className="card__body">
        <p><strong>Level:</strong> Intermediate</p>
        <p>Students "mark" a flawed AI care plan.</p>
      </div>
      <div className="card__footer">
        <a href="#activity-1-critique-the-output-intermediate" className="button button--secondary button--block">Go to Activity ↓</a>
      </div>
    </div>
  </div>
  <div className="col col--4 margin-bottom--md">
    <div className="card h-100">
      <div className="card__header" style={{borderTop: "5px solid #2196f3"}}>
        <h3>2. Prompt Relay</h3>
      </div>
      <div className="card__body">
        <p><strong>Level:</strong> Advanced</p>
        <p>Iterative prompting to improve quality.</p>
      </div>
      <div className="card__footer">
        <a href="#activity-2-prompt-refinement-relay-advanced" className="button button--secondary button--block">Go to Activity ↓</a>
      </div>
    </div>
  </div>
  <div className="col col--4 margin-bottom--md">
    <div className="card h-100">
      <div className="card__header" style={{borderTop: "5px solid #ff9800"}}>
        <h3>3. Ethics Audit</h3>
      </div>
      <div className="card__body">
        <p><strong>Level:</strong> Foundation</p>
        <p>Spotting privacy risks and bias.</p>
      </div>
      <div className="card__footer">
        <a href="#activity-3-the-ethics-audit-basicintermediate" className="button button--secondary button--block">Go to Activity ↓</a>
      </div>
    </div>
  </div>
</div>

---

## 🕵️ Activity 1: "Critique the Output" (Intermediate)

**Goal**: Develop critical evaluation skills and domain knowledge verification.

*   **Setup**: The educator generates a care plan using a standard LLM (e.g., ChatGPT) for a complex patient (e.g., "75yo with Dementia and Type 1 Diabetes"). **Intentionally** do not fact-check it.
*   **Task**: Students work in small groups to "grade" the AI's care plan.

:::note 📝 Student Checklist
*   [ ] Is the clinical information accurate?
*   [ ] Is the tone person-centred?
*   [ ] Does it align with UK guidelines (NICE)?
*   [ ] **Crucially**: Identify one dangerous or vague suggestion.
:::

**Feedback**: Discuss as a class. Highlight that *subject matter expertise* determines the quality of AI use.

---

## 🔄 Activity 2: "Prompt Refinement Relay" (Advanced)

**Goal**: Teach prompt engineering and iterative improvement.

*   **Task**: "Create a plain-English explanation of the Mental Capacity Act for a teenager."

```mermaid
graph LR
    A[👤 Student A<br/>Drafts Simple Prompt] --> B[🤖 AI Output 1<br/>(Generic/Vague)]
    B --> C[👤 Student B<br/>Critiques & Refines]
    C --> D[🤖 AI Output 2<br/>(Better Context)]
    D --> E[👤 Student C<br/>Polishes Tone]
    E --> F[⭐ Final Output<br/>(Specific & Clear)]
    
    style A fill:#e1f5fe
    style C fill:#fff3e0
    style E fill:#e8f5e9
```

1.  **Round 1**: Student A writes a simple prompt. Records the output.
2.  **Round 2**: Student B critiques the output and writes an *improved* prompt (adding context, persona, constraints).
3.  **Review**: Compare the generic output (Round 1) with the refined output (Round 3). Discuss *what* specific instructions changed the result.

---

## ⚖️ Activity 3: "The Ethics Audit" (Basic/Intermediate)

**Goal**: Understand data privacy and ethical bias.

*   **Scenario**: "You need to write a handover summary for a patient, 'Sarah Jones', DOB 12/05/1980, NHS Number 123 456 789."
*   **Task**: Ask students to draft a prompt to get AI to help with this.

:::warning Information Governance Trap
**The Trap**: See if any students include the PII (Name, NHS number) in the chat interface.

**Teachable Moment**: Stop the class if this happens.
Discuss **why** we never input real patient data. Show how to anonymize: *"Patient X, 45yo female..."*
:::

**Extension**: Discuss bias. Ask AI to generate an image of "A nurse leader". Audit the results for gender/ethnicity representation.

---

## 🏥 Nursing Competency Alignment

How do these activities map to the NMC standards?

| Activity | NMC Strand |
| :--- | :--- |
| **Activity 1: Critique** | 🩺 "Evidence-based practice" / "Patient safety" |
| **Activity 2: Refinement** | 🗣️ "Communication and relationship management" |
| **Activity 3: Ethics** | 🔒 "Professional values" / "Data protection" |

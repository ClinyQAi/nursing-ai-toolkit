# Specification: Stage 5 (Case Studies Expansion)

## 1. Overview
Expand the "Case Studies" section from a placeholder into a comprehensive library of applied AI scenarios. This is the "Application" layer of the toolkit, showing *how* theory applies to practice.

## 2. User Stories
*   **As a student**, I want to practice taking a patient history from a simulated patient so I can build confidence.
*   **As an educator**, I want examples of how AI can help explain complex clinical skills (like ECG interpretation) without replacing expert judgment.
*   **As a module leader**, I want to demonstrate how AI can help students refine their language to be more person-centred.

## 3. Sections to Create

### A. Patient Scenarios (The "Simulated Patient")
*   **Goal**: Using AI to simulate clinical encounters.
*   **Pages**:
    1.  `patient-scenarios/index.md` (Overview).
    2.  `patient-scenarios/history-taking.md` (Simulating a patient with Chest Pain).
    3.  `patient-scenarios/deteriorating-patient.md` (Simulating a NEWS2 alert scenario).

### B. Clinical Skills (The "Virtual Explainer")
*   **Goal**: Using AI to visualize and explain procedures.
*   **Pages**:
    1.  `clinical-skills/index.md` (Overview).
    2.  `clinical-skills/ecg-interpretation.md` (Using AI to explain rhythm strips - *with safety warnings*).
    3.  `clinical-skills/medication-mechanism.md` (Visualizing pharmacodynamics).

### C. Person-Centred Care (The "Communication Coach")
*   **Goal**: Using AI to refine language and tone.
*   **Pages**:
    1.  `person-centred-care/index.md` (Overview).
    2.  `person-centred-care/difficult-conversations.md` (Rehearsing palliative care discussions).
    3.  `person-centred-care/language-refinement.md` (Converting medical jargon to patient-friendly language).

### D. Original PDF Adaptations
*   **Goal**: Ensure we honor the original core case studies from the source text.
*   **Pages**:
    1.  `original-adaptations/index.md`
    2.  `original-adaptations/visual-metaphors.md`

## 4. Design Requirements (per Constitution)
*   **Chat Logs**: Use code blocks or specific formatting to clearly show "User Prompt" vs "AI Response".
*   **NMC Mapping**: Each case study MUST link to a specific NMC Proficiency (e.g., "Annexe B: Nursing Procedures").
*   **Safety**: "Red Box" warnings on any clinical skills page (ECG/Meds).

## 5. Acceptance Criteria
*   [ ] 4 new sub-directories created in `docs/case-studies/`.
*   [ ] At least 8 new pages created.
*   [ ] Sidebar updated to handle deep nesting (Category -> Sub-category).

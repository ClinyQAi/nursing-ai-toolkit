# Implementation Plan: Stage 5 (Case Studies)

## 1. Directory Structure
Target Directory: `docs/case-studies/`

**Structure**:
```text
docs/case-studies/
├── nursing/ (Existing - keep)
│   ├── index.md
│   └── wound-care-visualization.md
├── patient-scenarios/ (New)
│   ├── index.md
│   ├── history-taking.md
│   └── deteriorating-patient.md
├── clinical-skills/ (New)
│   ├── index.md
│   ├── ecg-interpretation.md
│   └── medication-mechanism.md
└── person-centred-care/ (New)
    ├── index.md
    ├── difficult-conversations.md
    └── language-refinement.md
```

## 2. Technical Challenges
*   **Sidebar Depth**: Docusaurus sidebars can get messy with 3+ levels. We need to ensure the `sidebars.ts` is structured cleanly using clear Labels.
*   **Chat Logs**: We will use a standard markdown blockquote `>` for User Prompts and a code block ` ``` ` or separate paragraph for AI responses to visually distinguish them.

## 3. Sidebar Configuration
We will group these under a main "Case Studies" dropdown:
- **Case Studies**
  - Nursing Scenarios (Simulations)
  - Clinical Skills Support
  - Person-Centred Communication
  - Original Adaptations

## 4. Work Order
1.  Create the folder structure.
2.  Implement "Patient Scenarios" section.
3.  Implement "Clinical Skills" section.
4.  Implement "Person-Centred" section.
5.  Update Sidebar once at the end (or iteratively).

## 5. Verification
*   Verify deep linking works.
*   Verify Safety Warnings on ECG/Meds pages.

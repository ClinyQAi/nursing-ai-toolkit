# Specification: Stage 3 (Learning with AI)

## 1. Overview
Develop the "Learning with AI" section to empower *students* to use GenAI effectively for their own learning. This shifts the focus from "Educator Delivery" (Stage 2) to "Student Self-Regulated Learning".

## 2. User Stories
*   **As a nursing student**, I want to use AI to test my knowledge before an exam so I can identify my weak spots.
*   **As a student with dyslexia**, I want to use AI to convert heavy text into audio or summaries so I can learn more effectively.
*   **As a mentor**, I want to give students prompts they can use safely in practice for "just-in-time" knowledge (without breaking privacy rules).

## 3. Pages to Create

### A. `learning/index.md`
*   **Goal**: Introduction to student-led AI learning.
*   **Key Concepts**: Self-regulated learning, the "24/7 Tutor", Metacognition.
*   **Navigation**: Links to sub-pages.

### B. `learning/personalised-learning.md`
*   **Goal**: How to use AI for adaptive study.
*   **Key Content**:
    *   Creating a "Persona" for your tutor (e.g., "Act as a strict anatomy professor").
    *   Self-quizzing with feedback.
    *   Simplifying complex concepts (EL15).

### C. `learning/just-in-time-support.md`
*   **Goal**: Using AI for immediate performance support.
*   **Key Content**:
    *   Clinical reference (checking drug interactions - with safety warnings!).
    *   Procedure revision (steps for catheterisation).
    *   **CRITICAL SAFETY WARNING**: Verification vs. blind trust.

### D. `learning/multimodal-creation.md`
*   **Goal**: Students as creators.
*   **Key Content**:
    *   Students making revision flashcards (images).
    *   Students turning notes into podcasts (Audio).
    *   Mind-mapping with Mermaid code.

### E. `learning/nursing-examples.md`
*   **Goal**: Student-facing prompt library (distinct from the Educator one).
*   **Prompts**:
    *   "Quiz me on cardiac drugs"
    *   "Summarize this NMC guidance"
    *   "Roleplay a difficult patient conversation"

## 4. Design Requirements (per Constitution)
*   **Attribution**: Standard CC BY-NC 4.0.
*   **Date**: "Last Updated: December 2025".
*   **Models**: Gemini 3 Flash (good for students/free tier), GPT-4o.
*   **Safety**: Heavy emphasis on *not* inputting patient data.

## 5. Acceptance Criteria
*   [ ] All 5 pages created in `docs/learning/`.
*   [ ] Sidebar updated.
*   [ ] At least one "Red Box" warning about clinical verification on every page.

# Specification: Stage 6 (Resources Section)

## 1. Overview
Develop the "Resources" section to act as a curated "Exit Strategy" for the user—where do they go next? This section connects the toolkit to the wider world of AI and Nursing.

## 2. User Stories
*   **As a novice user**, I want a list of reliable AI tools so I don't get scammed by fake apps.
*   **As an academic**, I want to see the evidence base behind this toolkit (bibliography).
*   **As a nurse**, I want to know what the NMC and RCN are saying about AI.

## 3. Pages to Create

### A. `resources/index.md`
*   **Goal**: Overview of the resources library.

### B. `resources/genai-tools.md`
*   **Goal**: A curated list of tools categorized by function.
*   **Categories**:
    *   **Text Generation**: Gemini (Google), ChatGPT (OpenAI), Claude (Anthropic).
    *   **Research**: Consensus, Elicit, Scite (AI for evidence finding).
    *   **Image**: Midjourney, DALL-E 3.
*   **Requirement**: explicitly label "Freemium" vs "Paid".

### C. `resources/nursing-resources.md`
*   **Goal**: Institutional guidance.
*   **Key Links**:
    *   NMC Code (2018).
    *   RCN guidance on Digital Health.
    *   NHS England "Artificial Intelligence" strategy.
    *   FONS (Foundation of Nursing Studies) principles.

### D. `resources/academic-papers.md`
*   **Goal**: The Bibliography.
*   **Content**: List the key papers referenced in the original "Educators' Guide to Multimodal Learning".

## 4. Design Requirements (per Constitution)
*   **Attribution**: Standard CC BY-NC 4.0.
*   **Date**: "Last Updated: December 2025".
*   **Disclaimer**: "We do not endorse any specific paid product. Tools listed for functionality only."

## 5. Acceptance Criteria
*   [ ] All 4 pages created in `docs/resources/`.
*   [ ] Sidebar updated.
*   [ ] External links verified (no 404s).

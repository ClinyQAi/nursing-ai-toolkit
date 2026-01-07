---
sidebar_position: 2
title: AI Risk Calculator
description: Calculate the vulnerability of your assessment to Generative AI misuse.
---

# 🧮 Assessment Risk Calculator

Use this tool to evaluate the "AI Vulnerability" of your current assessments. It considers the **format**, **environment**, and **access** to provide a risk rating.

import RiskCalculator from '@site/src/components/RiskCalculator';

<RiskCalculator />

## Interpreting Your Score

### 🔴 High Risk
**Example**: An unsupervised essay with full internet access.
*   **Vulnerability**: GenAI can write the entire submission.
*   **Mitigation**: Move to "process-based" assessment (reflective journals), require viva voce defense, or use "AI-immune" formats like OSCEs.

### 🟠 Medium Risk
**Example**: Online MCQs or Open-book time-constrained tests.
*   **Vulnerability**: GenAI can answer fact-based questions instantly.
*   **Mitigation**: Focus on "application" questions (case studies) where context matters more than facts. Use diagrams or video inputs which some AI still struggle with.

### 🟢 Low Risk
**Example**: In-person Viva Voce or OSCE.
*   **Vulnerability**: Extremely low.
*   **Action**: These are the "Gold Standard" for verifying genuine student competency in the AI era.

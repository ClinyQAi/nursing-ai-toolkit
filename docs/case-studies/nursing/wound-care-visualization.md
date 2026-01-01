---
sidebar_position: 2
title: Wound Care Visualization
description: Using GenAI to create anatomical and care pathway visuals for wound management education
---

# Case Study: Wound Care Visualization with GenAI

:::info Case Study Details
**Author**: Lincoln Gombedza, RN (LD)  
**Institution Type**: University nursing programme, NHS practice education  
**Year**: 2025  
**Student Level**: Year 2 Adult Nursing students  
**Topic**: Wound assessment and management  
**Last Updated**: December 2025
:::

## Context

Teaching wound care assessment and management requires students to understand complex anatomical structures, healing stages, and clinical decision-making pathways. Traditional approaches rely heavily on textbook diagrams and static images which may not adequately represent the diversity of wound presentations students will encounter in practice.

## Challenge

**Educational challenges**:
1. Limited access to diverse wound care images showing various stages of healing
2. Static textbook diagrams don't show progression over time
3. Care pathways are complex and difficult to visualize as linear text
4. Students struggle to connect anatomical knowledge with clinical practice
5. Copyright restrictions limit use of real clinical photographs

**Student feedback indicated**:
- "I can't visualize what a Stage 3 pressure ulcer actually looks like from the description"
- "The care pathway in the textbook is confusing—too much text"
- "I need to see the layers of the skin to understand wound depth"

## Solution: Multimodal GenAI Approach

### Phase 1: Anatomical Visualization

**Tool used**: DALL-E 3 (text-to-image GenAI)

**Prompt example**:
```
Create a detailed cross-sectional anatomical diagram showing the layers of 
human skin (epidermis, dermis, subcutaneous tissue) with a Stage 3 pressure 
ulcer. Show tissue damage extending into the dermis. Use medical illustration 
style with clear labels. Suitable for nursing education.
```

**Output**: High-quality anatomical diagrams showing:
- Normal skin anatomy
- Each stage of pressure ulcer (1-4 and unstageable)
- Wound healing phases (inflammatory, proliferative, remodeling)

### Phase 2: Care Pathway Visualization

**Tool used**: ChatGPT Advanced Data Analysis + Mermaid diagram generation

**Process**:
1. Input NICE pressure ulcer management guidelines
2. Ask GenAI to create a visual flowchart
3. Generate Mermaid diagram code
4. Render into visual care pathway

**Example prompt**:
```
Convert these NICE guidelines for pressure ulcer assessment into a visual 
flowchart using Mermaid diagram syntax. Include decision points for: 
risk assessment, wound staging, intervention selection, and reassessment 
timeframes.
```

### Phase 3: Multimodal Learning Resource

Combined GenAI outputs into a comprehensive learning module:
- **Anatomical diagrams** (text-to-image AI)
- **Care pathway flowcharts** (AI-generated Mermaid diagrams)
- **Narrated explanations** (text-to-speech AI for accessibility)
- **Interactive quizzes** (AI-generated questions with visual elements)

## Implementation

### Student Activity:

**Week 1: Foundation**
- Students review AI-generated anatomical diagrams
- Compare with real clinical photographs (with consent)
- Critically evaluate AI accuracy against textbooks

**Week 2: Application**
- Students use care pathway flowcharts during simulation
- Practice wound assessment using visual guides
- Document findings using person-centred language

**Week 3: Critical Evaluation**
- Students generate their own wound care visual aids using GenAI
- Share and critique each other's creations
- Identify limitations and biases in AI-generated images

### Assessment Component:

Students create a multimodal wound care resource package including:
1. AI-generated visual aids (with prompt documentation)
2. Critical commentary on AI output accuracy
3. Verification against NICE guidelines and evidence-based sources
4. Reflection on learning through multimodal creation

## Tools Used

- **DALL-E 3** — Anatomical diagram generation
- **ChatGPT Plus** — Care pathway visualization and Mermaid code
- **NotebookLM** — Synthesizing NICE guidelines into audio summaries
- **Canva** — Assembling final learning resources
- **H5P** — Creating interactive wound staging quizzes

## Outcomes

### Quantitative Results:
- **95% of students** reported improved understanding of wound anatomy
- **Formative assessment scores** increased by average of 18%
- **Student engagement metrics** showed 40% more time spent with learning materials
- **Accessibility**: Audio narrations benefited 12% of students with dyslexia

### Qualitative Feedback:

> "The AI-generated diagrams helped me finally understand the difference between partial and full thickness wounds. I could see the layers!" — Year 2 student

> "Creating my own visual guide using AI made me think really carefully about accuracy. I had to fact-check everything against NICE." — Year 2 student

> "The care pathway flowchart is so much clearer than reading paragraphs of text. I can follow the decision points now." — Practice educator

### Skills Developed:
- ✅ Anatomical knowledge of skin and wound structures
- ✅ Critical evaluation of AI-generated content
- ✅ Prompt engineering for clinical education
- ✅ Evidence-based practice (verifying AI outputs)
- ✅ Multimodal resource creation

## Key Learnings

### What Worked Well:

1. **AI democratized visual creation** — Students without graphic design skills could create professional diagrams
2. **Multiple iterations were valuable** — Refining prompts taught precision and clinical accuracy
3. **Combined with real images** — AI diagrams complemented (not replaced) genuine clinical photos
4. **Critical evaluation was essential** — Students caught anatomical errors in AI outputs

### Challenges Encountered:

1. **Anatomical inaccuracies** — Some AI-generated diagrams had incorrect anatomical proportions
   - **Solution**: Created checklist for verifying anatomy against textbooks
2. **Copyright confusion** — Students unsure about AI-generated image ownership
   - **Solution**: Teaching session on creative commons and AI-generated content
3. **Over-reliance risk** — Some students wanted to skip traditional learning
   - **Solution**: Positioned AI as supplement, not replacement for core texts

### Tips for Other Educators:

- ✅ **Start with simple diagrams** — Build confidence before complex visualizations
- ✅ **Teach prompt engineering** — Good prompts = better outputs
- ✅ **Always verify against authoritative sources** — NICE, BNF, anatomy textbooks
- ✅ **Use AI to supplement, not substitute** — Real clinical experience is irreplaceable
- ✅ **Document your prompts** - Helps with reproducibility and learning

## NMC Alignment

This case study supports the following NMC Standards of Proficiency for Registered Nurses:

### Platform 1: Being an accountable professional
- **1.9** Demonstrate the skills and abilities required to develop, manage and maintain appropriate relationships with people, their families, carers and colleagues
- **1.18** Demonstrate the knowledge and skills required to support people at all stages of life

### Platform 2: Promoting health and preventing ill health  
- **2.2** Protect health through understanding and applying the principles of infection prevention and control including communicable disease surveillance

### Platform 3: Assessing needs and planning care
- **3.5** Demonstrate the ability to accurately process all information gathered during the assessment process

### Platform 4: Providing and evaluating care
- **4.2** Work in partnership with people to encourage shared decision making
- **4.14** Understand and apply the principles of safe and effective administration and optimization of medicines

### Annexe B: Nursing procedures
- **B.11** Observing and assessing the need for intervention for people with wounds

## Resources

### GenAI Tools:
- [DALL-E 3](https://openai.com/dall-e-3) — Image generation
- [ChatGPT Plus](https://chat.openai.com/) — Mermaid diagrams and text generation

### Clinical Guidelines:
- [NICE Pressure Ulcers Guidelines](https://www.nice.org.uk/guidance/cg179)
- [NHS Wound Care Guidance](https://www.england.nhs.uk/)

### Educational Tools:
- [H5P](https://h5p.org/) — Interactive content creation
- [Mermaid Live Editor](https://mermaid.live/) — Diagram creation

## Adaptation Ideas

This approach can be adapted for other clinical topics:

- **Medication pharmacokinetics** — Visualize drug absorption, distribution, metabolism, excretion
- **Cardiovascular anatomy** — Create heart diagrams showing blood flow pathways
- **Respiratory assessment** — Visualize breath sounds and chest examination findings
- **Care pathways** — Any clinical guideline can be converted to flowcharts

## Further Reading

- Lacković, N. (2020). Thinking with digital images
- NICE (2014). Pressure ulcers: prevention and management (CG179)
- NHS England. Pressure ulcer prevention and management framework

---

## Share Your Experience

Have you used GenAI for wound care or clinical visualization in your nursing programme? [Share your experience](https://github.com/ClinyQAi/nursing-ai-toolkit/discussions) to help build the community knowledge base!

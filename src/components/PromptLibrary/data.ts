
export interface PromptItem {
    id: string;
    title: string;
    category: string;
    text: string;
    description: string;
}

export const PROMPT_DATA: PromptItem[] = [
    // Study & Revision
    {
        id: "study_1",
        title: "Explain Like I'm 5",
        category: "Study",
        text: "Explain the concept of [insert topic, e.g., pharmacokinetics] to me as if I were a 5-year-old. Use simple analogies.",
        description: "Great for grasping complex foundational concepts."
    },
    {
        id: "study_2",
        title: "Quiz Me",
        category: "Study",
        text: "Create a 5-question multiple choice quiz on [topic] for a first-year nursing student. Provide the answers and processing at the end.",
        description: "Active recall testing."
    },
    {
        id: "study_3",
        title: "Mnemonic Generator",
        category: "Study",
        text: "Create a catchy mnemonic to help me remember the [list of symptoms/steps].",
        description: "Memory aid creation."
    },

    // Writing & Academic
    {
        id: "write_1",
        title: "Critique My Paragraph",
        category: "Writing",
        text: "Review this paragraph for clarity, academic tone, and flow. Highlight where I use passive voice. [Paste paragraph]",
        description: "Improves academic writing style."
    },
    {
        id: "write_2",
        title: "Citation Helper",
        category: "Writing",
        text: "I want to cite [Author, Year] who argues that [point]. detailed in [Title]. Draft a sentence incorporating this citation in Harvard style.",
        description: "Assists with integrating evidence."
    },

    // Clinical & Practice
    {
        id: "clin_1",
        title: "Patient Communication",
        category: "Clinical",
        text: "I need to explain [procedure] to a patient who is anxious. Script a compassionate, clear explanation using plain English.",
        description: "Communication skills practice."
    },
    {
        id: "clin_2",
        title: "Care Plan Brainstorming",
        category: "Clinical",
        text: "Suggest 3 priority nursing interventions for a patient presenting with [condition]. Provide rationale for each.",
        description: "Developing clinical reasoning (Verify outputs!)."
    },
    {
        id: "clin_3",
        title: "Reflection Guide",
        category: "Clinical",
        text: "I want to reflect on a difficult conversation I had today using the Gibbs Reflective Cycle. Ask me questions one stage at a time to guide my reflection.",
        description: "Structured reflective practice."
    },

    // Wellbeing
    {
        id: "well_1",
        title: "Decompression",
        category: "Wellbeing",
        text: "I've had a stressful shift involving [general situation, no confidential details]. Help me process my emotions and suggest a 5-minute mindfulness exercise.",
        description: "Emotional support and resilience."
    },
    // Merged from original Nursing Examples
    {
        id: "exam_buddy",
        title: "The Exam Prep Buddy",
        category: "Study",
        text: "I am revising for my [Anatomy & Physiology] exam. Test me on [The Respiratory System]. Ask me one multiple-choice question at a time. Wait for my answer. If I get it right, explain why it's right and move to a harder question. If I get it wrong, explain the correct answer simply.",
        description: "Interactive revision partner."
    },
    {
        id: "nmc_translator",
        title: "NMC Code Translator",
        category: "Clinical",
        text: "I am reading the NMC Code (2018) section on 'Preserve Safety'. Give me 3 concrete, real-life examples of what this looks like on a busy ward. Then give me 3 examples of what a breach of this code would look like.",
        description: "Contextualizing professional standards."
    },
    {
        id: "comms_rehearsal",
        title: "SBAR Rehearsal",
        category: "Clinical",
        text: "I am nervous about handing over a patient to a doctor using SBAR. Act as a busy Junior Doctor. I will type my SBAR handover to you. Critique my handover: Was it concise? Did I miss anything critical? Did I sound professional?",
        description: "Simulation for handover practice."
    },
    {
        id: "drug_card",
        title: "Drug Card Generator",
        category: "Clinical",
        text: "Create a revision card for [Amoxicillin]. Include: Class of drug, Mechanism of Action (Simple), 3 Common Side Effects, 1 Critical Nursing Consideration (Safety). Format as a clean markdown table.",
        description: "Quick reference creation (Verify output!)."
    },
    {
        id: "reflection_driscoll",
        title: "Placement Reflector",
        category: "Wellbeing",
        text: "I want to write a reflection on a time I felt overwhelmed on placement. Help me structure this using the Driscoll Model (What? So What? Now What?). Ask me prompting questions to help me get my feelings onto the page. Do not write the reflection for me.",
        description: "Structured emotional processing."
    }
];

export const CATEGORIES = ["All", "Study", "Writing", "Clinical", "Wellbeing"];

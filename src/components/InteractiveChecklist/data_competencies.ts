
import { ChecklistCategory } from './data';

export const COMPETENCY_DATA: ChecklistCategory[] = [
    {
        title: "AI Literacy Framework Levels",
        groups: [
            {
                title: "Foundation Level: Understanding AI",
                items: [
                    { id: "found_know_1", text: "Understand what AI is and how it works" },
                    { id: "found_know_2", text: "Recognize different types of AI (LLMs, image generation, etc.)" },
                    { id: "found_know_3", text: "Identify AI capabilities and limitations" },
                    { id: "found_know_4", text: "Understand training data and bias" },
                    { id: "found_know_5", text: "Recognize hallucinations and errors" },
                ]
            },
            {
                title: "Intermediate Level: Critical Evaluation",
                items: [
                    { id: "inter_anal_1", text: "Evaluate AI outputs for accuracy" },
                    { id: "inter_anal_2", text: "Identify bias in AI responses" },
                    { id: "inter_anal_3", text: "Assess clinical relevance and safety" },
                    { id: "inter_anal_4", text: "Compare AI information with evidence-based sources" },
                    { id: "inter_anal_5", text: "Recognize when to seek human expertise" },
                ]
            },
            {
                title: "Advanced Level: Ethical Integration",
                items: [
                    { id: "adv_prof_1", text: "Apply ethical frameworks to AI use" },
                    { id: "adv_prof_2", text: "Maintain patient confidentiality with AI tools" },
                    { id: "adv_prof_3", text: "Practice academic and professional integrity" },
                    { id: "adv_prof_4", text: "Advocate for responsible AI use" },
                    { id: "adv_prof_5", text: "Contribute to AI policy development" },
                ]
            }
        ]
    },
    {
        title: "Self-Assessment Tool",
        type: 'rating',
        groups: [
            {
                title: "Technical Skills",
                items: [
                    { id: "sa_tech_1", text: "I can use multiple AI tools effectively" },
                    { id: "sa_tech_2", text: "I craft clear, effective prompts" },
                    { id: "sa_tech_3", text: "I troubleshoot AI issues independently" },
                    { id: "sa_tech_4", text: "I understand AI capabilities and limitations" },
                ]
            },
            {
                title: "Critical Evaluation",
                items: [
                    { id: "sa_crit_1", text: "I verify AI information against authoritative sources" },
                    { id: "sa_crit_2", text: "I identify bias and errors in AI outputs" },
                    { id: "sa_crit_3", text: "I assess clinical safety of AI suggestions" },
                    { id: "sa_crit_4", text: "I know when to seek human expertise" },
                ]
            },
            {
                title: "Ethical Practice",
                items: [
                    { id: "sa_eth_1", text: "I protect patient confidentiality with AI" },
                    { id: "sa_eth_2", text: "I disclose AI use appropriately" },
                    { id: "sa_eth_3", text: "I maintain academic integrity" },
                    { id: "sa_eth_4", text: "I align AI use with NMC Code" },
                ]
            },
            {
                title: "Professional Application",
                items: [
                    { id: "sa_prof_1", text: "I integrate AI with evidence-based practice" },
                    { id: "sa_prof_2", text: "I use AI to enhance, not replace, clinical reasoning" },
                    { id: "sa_prof_3", text: "I communicate AI use effectively" },
                    { id: "sa_prof_4", text: "I contribute to responsible AI culture" },
                ]
            }
        ]
    }
];

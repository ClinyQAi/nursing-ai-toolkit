
export interface ChecklistItem {
    id: string;
    text: string;
}

export interface ChecklistGroup {
    title: string;
    items: ChecklistItem[];
}

export interface ChecklistCategory {
    title: string;
    groups: ChecklistGroup[];
}

export const CHECKLIST_DATA: ChecklistCategory[] = [
    {
        title: "For Nursing Educators",
        groups: [
            {
                title: "Before the Course - Policy and Planning",
                items: [
                    { id: "edu_pre_1", text: "Review institutional AI policies" },
                    { id: "edu_pre_2", text: "Define acceptable AI use for your module" },
                    { id: "edu_pre_3", text: "Create clear guidelines for students" },
                    { id: "edu_pre_4", text: "Include AI policy in module handbook" },
                    { id: "edu_pre_5", text: "Prepare examples of appropriate/inappropriate use" },
                    { id: "edu_pre_6", text: "Plan how to address AI misuse" },
                ]
            },
            {
                title: "Before the Course - Curriculum Design",
                items: [
                    { id: "edu_curr_1", text: "Identify where AI can enhance learning" },
                    { id: "edu_curr_2", text: "Design AI-resilient assessments" },
                    { id: "edu_curr_3", text: "Include AI literacy learning outcomes" },
                    { id: "edu_curr_4", text: "Balance AI-enhanced and AI-free activities" },
                    { id: "edu_curr_5", text: "Plan for varied assessment methods" },
                    { id: "edu_curr_6", text: "Consider equity and access issues" },
                ]
            },
            {
                title: "Before the Course - Personal Preparation",
                items: [
                    { id: "edu_pers_1", text: "Explore AI tools relevant to nursing" },
                    { id: "edu_pers_2", text: "Practice using AI for course content" },
                    { id: "edu_pers_3", text: "Identify limitations and risks" },
                    { id: "edu_pers_4", text: "Prepare to model responsible use" },
                    { id: "edu_pers_5", text: "Stay current with AI developments" },
                    { id: "edu_pers_6", text: "Connect with other educators using AI" },
                ]
            },
            {
                title: "During the Course - Teaching Practices",
                items: [
                    { id: "edu_teach_1", text: "Explicitly discuss AI use in first session" },
                    { id: "edu_teach_2", text: "Demonstrate AI tools transparently" },
                    { id: "edu_teach_3", text: "Show both successes and failures" },
                    { id: "edu_teach_4", text: "Encourage critical evaluation" },
                    { id: "edu_teach_5", text: "Provide structured AI activities" },
                    { id: "edu_teach_6", text: "Facilitate reflection on AI use" },
                ]
            },
            {
                title: "During the Course - Student Support",
                items: [
                    { id: "edu_supp_1", text: "Offer AI literacy workshops" },
                    { id: "edu_supp_2", text: "Provide examples of good practice" },
                    { id: "edu_supp_3", text: "Give feedback on AI use" },
                    { id: "edu_supp_4", text: "Address student concerns" },
                    { id: "edu_supp_5", text: "Support struggling students" },
                    { id: "edu_supp_6", text: "Celebrate thoughtful AI integration" },
                ]
            },
            {
                title: "During the Course - Monitoring and Adjustment",
                items: [
                    { id: "edu_mon_1", text: "Observe how students use AI" },
                    { id: "edu_mon_2", text: "Gather informal feedback" },
                    { id: "edu_mon_3", text: "Identify emerging issues" },
                    { id: "edu_mon_4", text: "Adjust guidance as needed" },
                    { id: "edu_mon_5", text: "Document what works well" },
                    { id: "edu_mon_6", text: "Share insights with colleagues" },
                ]
            },
            {
                title: "After the Course - Evaluation & Improvement",
                items: [
                    { id: "edu_eval_1", text: "Review assessment outcomes" },
                    { id: "edu_eval_2", text: "Analyze AI-related issues" },
                    { id: "edu_eval_3", text: "Gather student feedback" },
                    { id: "edu_eval_4", text: "Reflect on your practice" },
                    { id: "edu_eval_5", text: "Update policies based on experience" },
                    { id: "edu_eval_6", text: "Share findings with team" },
                ]
            }
        ]
    },
    {
        title: "For Nursing Students",
        groups: [
            {
                title: "Before Using AI",
                items: [
                    { id: "stu_pre_1", text: "Read module AI policy carefully" },
                    { id: "stu_pre_2", text: "Understand what's permitted" },
                    { id: "stu_pre_3", text: "Know consequences of misuse" },
                    { id: "stu_pre_4", text: "Identify when to ask for clarification" },
                    { id: "stu_pre_5", text: "Review NMC Code relevance" },
                    { id: "stu_pre_6", text: "Consider patient safety implications" },
                    { id: "stu_pre_7", text: "Define your learning objective" },
                    { id: "stu_pre_8", text: "Try task independently first" },
                    { id: "stu_pre_9", text: "Identify specific help needed" },
                    { id: "stu_pre_10", text: "Choose appropriate AI tool" },
                ]
            },
            {
                title: "While Using AI",
                items: [
                    { id: "stu_while_1", text: "Question AI responses" },
                    { id: "stu_while_2", text: "Check for errors and bias" },
                    { id: "stu_while_3", text: "Verify against authoritative sources" },
                    { id: "stu_while_4", text: "Consider alternative perspectives" },
                    { id: "stu_while_5", text: "Evaluate clinical relevance" },
                    { id: "stu_while_6", text: "Assess patient safety implications" },
                    { id: "stu_while_7", text: "Never input patient-identifiable data" },
                    { id: "stu_while_8", text: "Respect copyright and attribution" },
                    { id: "stu_while_9", text: "Use AI as supplement, not replacement" },
                    { id: "stu_while_10", text: "Save prompts and record responses" },
                ]
            },
            {
                title: "After Using AI",
                items: [
                    { id: "stu_aft_1", text: "Cross-check against textbooks" },
                    { id: "stu_aft_2", text: "Consult peer-reviewed sources" },
                    { id: "stu_aft_3", text: "Discuss with peers or mentors" },
                    { id: "stu_aft_4", text: "Test understanding independently" },
                    { id: "stu_aft_5", text: "Reflect: What did I actually learn?" },
                    { id: "stu_aft_6", text: "Reflect: Could I do this without AI?" },
                    { id: "stu_aft_7", text: "Disclose AI use if required" },
                    { id: "stu_aft_8", text: "Cite sources properly" },
                    { id: "stu_aft_9", text: "Ensure work represents your understanding" },
                    { id: "stu_aft_10", text: "Uphold NMC Code values" },
                ]
            }
        ]
    },
    {
        title: "For Programme Leaders",
        groups: [
            {
                title: "Strategic Planning",
                items: [
                    { id: "prog_plan_1", text: "Establish institutional AI policy" },
                    { id: "prog_plan_2", text: "Consult stakeholders" },
                    { id: "prog_plan_3", text: "Align with NMC standards" },
                    { id: "prog_plan_4", text: "Audit current AI use" },
                    { id: "prog_plan_5", text: "Identify integration opportunities" },
                    { id: "prog_plan_6", text: "Assess staff AI literacy" },
                    { id: "prog_plan_7", text: "Provide training opportunities" },
                ]
            },
            {
                title: "Quality Assurance",
                items: [
                    { id: "prog_qa_1", text: "Track AI-related incidents" },
                    { id: "prog_qa_2", text: "Monitor assessment outcomes" },
                    { id: "prog_qa_3", text: "Gather stakeholder feedback" },
                    { id: "prog_qa_4", text: "Assess learning outcomes" },
                    { id: "prog_qa_5", text: "Review policy effectiveness" },
                    { id: "prog_qa_6", text: "Act on evaluation findings" },
                ]
            }
        ]
    },
    {
        title: "For Clinical Practice Educators",
        groups: [
            {
                title: "Placement Preparation",
                items: [
                    { id: "clin_prep_1", text: "Review university AI policies" },
                    { id: "clin_prep_2", text: "Understand student expectations" },
                    { id: "clin_prep_3", text: "Identify appropriate AI use in practice" },
                    { id: "clin_prep_4", text: "Set expectations with students" },
                    { id: "clin_prep_5", text: "Consider patient confidentiality" },
                ]
            },
            {
                title: "During Placement",
                items: [
                    { id: "clin_dur_1", text: "Observe student AI use" },
                    { id: "clin_dur_2", text: "Provide constructive feedback" },
                    { id: "clin_dur_3", text: "Encourage critical thinking" },
                    { id: "clin_dur_4", text: "Ensure patient safety" },
                    { id: "clin_dur_5", text: "Assess independent reasoning" },
                ]
            }
        ]
    }
];

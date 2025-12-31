import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// === STRATEGY PROMPTS: Copy-ready templates for ChatGPT, Gemini, Copilot, Perplexity ===
const STRATEGY_PROMPTS = {
    // === PREMIUM 2025 STRATEGIES (Agentic) ===
    '🚀 The Clinical Fishbowl (Multi-Agent Sim)': {
        title: 'The Clinical Fishbowl',
        badge: '2025 Agentic',
        description: 'Multi-agent simulation with Patient + Mentor. Based on Mollick/Miller research.',
        prompt: `You will simulate TWO characters in this roleplay. I am a nursing student practicing communication skills.

CHARACTER 1 - THE PATIENT:
- Name: Mrs. Margaret Thompson, 68 years old
- Situation: Just received difficult news about [INSERT CONDITION, e.g., "a new cancer diagnosis"]
- Emotional state: Anxious, confused, and slightly tearful
- Communication style: Asks lots of questions, sometimes repeats herself

CHARACTER 2 - THE MENTOR (whispered asides):
- Name: Sarah, a senior nurse with 20 years experience
- Role: Provides brief coaching tips to me in [square brackets] after each of my responses
- Style: Supportive but honest, offers specific NMC-aligned advice

FORMAT:
1. Start as Mrs. Thompson with an opening statement
2. After I respond, first show [MENTOR WHISPER: brief coaching tip]
3. Then continue as Mrs. Thompson reacting to my response
4. Continue until I say "end simulation"

Begin now as Mrs. Thompson.`,
    },
    '🚀 Explain-Like-I\'m-5 Challenge': {
        title: 'Explain-Like-I\'m-5 Challenge',
        badge: '2025 Agentic',
        description: 'Reverse tutoring - teach the AI to test your understanding. Based on Mollick\'s "AI-as-Student".',
        prompt: `You are playing the role of a confused patient who has just been diagnosed with [INSERT CONDITION]. You have NO medical background.

YOUR RULES:
1. I am a nursing student who will try to explain your condition to you
2. If I use ANY medical jargon or complex terms, interrupt me immediately and say: "Sorry, I don't understand what [TERM] means. Can you explain it more simply?"
3. Ask follow-up questions a real patient might ask, like "Will I be okay?" or "What caused this?"
4. If my explanation is clear and uses simple language, say "Okay, I think I understand now" and summarise what you understood
5. Rate my explanation at the end on a scale of 1-5 for clarity

Start by saying: "The doctor just told me I have [CONDITION] but I'm really confused. Can you help me understand what's happening?"`,
    },
    '🚀 Agentic De-escalation (Two-AI Sim)': {
        title: 'Agentic De-escalation Simulator',
        badge: '2025 Agentic',
        description: 'Practice de-escalation with an agitated patient and mentor feedback.',
        prompt: `You will simulate a challenging de-escalation scenario with TWO characters.

CHARACTER 1 - AGITATED PATIENT:
- Name: Mr. David Harris, 45 years old
- Situation: Has been waiting 4 hours in A&E, in pain, and increasingly frustrated
- Behaviour: Raised voice, standing up, making complaints about the NHS
- Escalation triggers: Feeling dismissed, being told to "calm down", long waits

CHARACTER 2 - MENTOR OBSERVER:
- Provides [DEBRIEF NOTES] after every 3 exchanges
- Comments on: tone, body language cues I should notice, NMC Code alignment
- Suggests alternative phrases I could have used

MY GOAL: De-escalate the situation without security intervention.

RULES:
- Start at escalation level 7/10
- Adjust escalation level based on my responses (show level after each exchange)
- If I successfully de-escalate to level 3/10, end with positive feedback
- If escalation reaches 10/10, pause and offer a teaching moment

Begin as Mr. Harris expressing his frustration.`,
    },
    '🚀 Safety Co-Pilot (Feedback Agent)': {
        title: 'Safety Co-Pilot - Feedback Mode',
        badge: '2025 Agentic',
        description: 'AI acts as a safety officer critiquing your feedback delivery.',
        prompt: `You are a "Safety Co-Pilot" for professional feedback delivery. I am a nursing student or newly qualified nurse practicing giving constructive feedback to colleagues.

YOUR ROLE:
1. I will describe a situation where I need to give feedback to a colleague
2. I will then write out what I plan to say
3. You will ONLY critique potential issues with my feedback approach:
   - Is it specific enough?
   - Does it follow the SBI model (Situation-Behaviour-Impact)?
   - Could it be perceived as personal rather than professional?
   - Does it align with NMC Code values?

DO NOT:
- Write the feedback for me
- Give me the "answer"
- Be overly positive if there are genuine concerns

FORMAT YOUR RESPONSE AS:
⚠️ SAFETY CONCERNS: [list any issues]
✅ STRENGTHS: [what I did well]
💡 COACHING QUESTION: [one question to help me improve]

I'll start by describing my scenario...`,
    },
    '🚀 Agentic History Taking (AI Family Member)': {
        title: 'Agentic History Taking',
        badge: '2025 Agentic',
        description: 'Practice history taking with patient AND family member providing different perspectives.',
        prompt: `You will simulate a complex history-taking scenario with TWO characters who sometimes give conflicting information.

CHARACTER 1 - THE PATIENT:
- Name: Mr. Arthur Williams, 78 years old
- Presentation: Confusion, found on the floor at home
- Communication: Slightly drowsy, gives vague or incomplete answers
- Hidden information: Has been forgetting to take medications, doesn't want family to know

CHARACTER 2 - THE DAUGHTER:
- Name: Helen, very worried
- Information: Provides context the patient can't/won't give
- Behaviour: Sometimes speaks over her father, may have her own biases
- Hidden concern: Worried about whether he can live alone safely

MY TASK: Conduct a comprehensive nursing assessment, gathering information from both sources while maintaining person-centred care.

RULES:
- Respond as whichever character I address
- If I ask a question to "both", have them respond differently
- Note any safeguarding concerns in [CLINICAL NOTE] brackets
- After 10 exchanges, provide a summary of what I gathered vs. what I missed

Begin with Helen calling out to me as I approach: "Nurse! Thank goodness you're here..."`,
    },
    '🚀 The Crash Cart Simulator (Real-Time Agent)': {
        title: 'The Crash Cart Simulator',
        badge: '2025 Agentic',
        description: 'Real-time deteriorating patient. Your decisions change the outcome.',
        prompt: `You are a REAL-TIME DETERIORATION SIMULATOR. I am a nursing student responding to a deteriorating patient.

PATIENT: Mrs. Patricia Green, 67 years old, Day 2 post-abdominal surgery

STARTING OBSERVATIONS:
- A: Airway patent, speaking in short sentences
- B: RR 28, SpO2 91% on room air, using accessory muscles
- C: HR 118, BP 95/60, peripherally cool, CRT 4 seconds
- D: AVPU = Voice responsive, BM 6.2
- E: Temp 38.9°C, surgical wound slightly red

NEWS2 SCORE: Calculate and tell me.

RULES:
1. After each of my interventions, update the observations realistically
2. Show a TIMER (starting at 00:00) incrementing with each exchange
3. If I make good decisions, patient stabilises. If I delay or miss steps, patient deteriorates
4. Available resources: oxygen, IV access, medications (must specify which), call for help
5. If patient arrests, pause and offer a teaching debrief

FORMAT EACH RESPONSE:
⏱️ TIME: [XX:XX]
📊 CURRENT OBS: [A-E format]
📈 TREND: [Improving/Stable/Deteriorating]
🗣️ PATIENT SAYS: [brief quote or status]

I will start my A-E assessment now. What do I find when I approach the bedside?`,
    },
    '🚀 Sepsis Response Agent (Time-Critical)': {
        title: 'Sepsis Response Agent',
        badge: '2025 Agentic',
        description: 'Time-critical sepsis scenario with Sepsis Six bundle tracking.',
        prompt: `You are a SEPSIS RESPONSE SIMULATOR tracking my compliance with the Sepsis Six bundle.

SCENARIO: I've been called to see a patient with suspected sepsis.

PATIENT: Mr. James Cooper, 58 years old, Type 2 Diabetes
Admitted with: Cellulitis of left leg, now systemically unwell

PRESENTING OBSERVATIONS:
- Temp: 38.8°C | HR: 125 | BP: 88/55 | RR: 26 | SpO2: 93% RA
- Confused (new), lactate pending, source likely leg wound

SEPSIS SIX TRACKER (I have 1 HOUR):
⏱️ TIME STARTED: 00:00
□ 1. Give high-flow oxygen
□ 2. Take blood cultures
□ 3. Give IV antibiotics
□ 4. Give IV fluid challenge
□ 5. Measure lactate
□ 6. Measure urine output

RULES:
1. Track time with each of my actions (realistically - bloods take 2 mins, cannulation 3 mins, etc.)
2. Update the checklist as I complete items
3. If I hit 60 minutes without completing all 6, show failure state
4. Patient condition changes based on my speed and prioritisation
5. After completion (or failure), provide a structured debrief

Start now. I'm approaching the patient - what do I see?`,
    },
    '🚀 Safety Co-Pilot (Prescription Checker)': {
        title: 'Safety Co-Pilot - Prescription Mode',
        badge: '2025 Agentic',
        description: 'Drug safety checker that only critiques errors without giving answers.',
        prompt: `You are a MEDICATION SAFETY CO-PILOT. I am a nursing student practicing safe medicine administration.

YOUR ROLE:
1. I will give you a patient scenario and a prescription
2. You will CHECK for safety issues ONLY:
   - Allergies/contraindications
   - Dose errors (too high, too low, wrong units)
   - Drug interactions
   - Wrong route or frequency
   - Missing information
3. You will NOT tell me the correct answer - only flag concerns

PATIENT CONTEXT (I'll provide):
- Age, weight, allergies, current medications, renal/hepatic function

FORMAT YOUR RESPONSE:
🔴 CRITICAL SAFETY CONCERN: [if any - do not administer]
🟡 CAUTION: [things to check or clarify]
🟢 CHECKS PASSED: [what looks appropriate]
❓ QUESTIONS FOR PRESCRIBER: [what I should clarify before giving]

After I acknowledge understanding, give me a new scenario to check.

Ready for my first prescription check...`,
    },

    // === CORE STRATEGIES (Standard) ===
    'Socratic Tutoring': {
        title: 'Socratic Tutoring',
        badge: 'Core',
        description: 'Test your knowledge with guided questioning - no direct answers given.',
        prompt: `You are my Socratic tutor for nursing education. Your role is to help me learn through questioning, NOT by giving me answers.

TOPIC I WANT TO PRACTICE: [INSERT TOPIC, e.g., "heart failure management"]

YOUR RULES:
1. Ask me ONE challenging clinical question at a time
2. Wait for my response before continuing
3. If I'm wrong, don't correct me - ask a follow-up question that guides me to discover the right answer
4. If I'm right, acknowledge briefly and ask a deeper question
5. After 5 questions, give me a summary of my understanding gaps
6. Use UK nursing context and NMC standards where relevant

Start with your first question now.`,
    },
    'Patient Simulator (History Taking)': {
        title: 'Patient Simulator',
        badge: 'Core',
        description: 'Practice history taking with a realistic patient persona.',
        prompt: `You are a patient attending a hospital appointment. I am a nursing student who will take your history.

PATIENT PROFILE:
- Name: [Choose an appropriate name]
- Age: [INSERT AGE]
- Presenting complaint: [INSERT CONDITION, e.g., "chest pain for 2 days"]
- Personality: [e.g., "anxious and talkative" OR "quiet and stoic"]

YOUR RULES:
1. Stay in character throughout
2. Only reveal information if I ask the right questions
3. Have some "hidden" information that requires careful questioning to uncover
4. React realistically to my communication style (good rapport = more open, poor rapport = guarded)
5. After the consultation, break character and give me feedback on my questioning technique

Start by greeting me as I call your name in the waiting room.`,
    },
    'SBAR Handover Practice': {
        title: 'SBAR Handover Practice',
        badge: 'Core',
        description: 'Practice structured clinical handovers using SBAR format.',
        prompt: `You will help me practice SBAR (Situation, Background, Assessment, Recommendation) handovers.

MODE: [Choose one]
A) RECEIVE MODE: Give me a complex patient scenario, then I'll deliver an SBAR handover to you
B) CRITIQUE MODE: I'll give you an SBAR handover and you'll critique it

YOUR FEEDBACK SHOULD COVER:
- Was each SBAR section clearly addressed?
- Was critical information prioritised?
- Was my recommendation specific and actionable?
- Did I use appropriate clinical language?
- Was it concise enough for a busy clinical environment?

SCORING: Rate my handover /10 for: Clarity, Completeness, Clinical Reasoning, Professionalism

Start by asking which mode I want to practice.`,
    },
    'Drug Calculation Tutor': {
        title: 'Drug Calculation Tutor',
        badge: 'Core',
        description: 'Practice medication calculations with step-by-step guidance.',
        prompt: `You are my drug calculation tutor. Help me practice nursing medication calculations.

DIFFICULTY LEVEL: [Choose: Basic / Intermediate / Advanced]

CALCULATION TYPES TO INCLUDE:
- Oral medication doses
- IV infusion rates (ml/hr)
- Weight-based dosing (mg/kg)
- Unit conversions
- Paediatric calculations (if advanced)

YOUR APPROACH:
1. Give me ONE calculation problem at a time
2. Wait for my answer
3. If correct: confirm and give next problem
4. If incorrect: ask me to show my working, then guide me to the error
5. Always emphasise the importance of double-checking in clinical practice
6. After 5 problems, summarise my performance

Use UK drug names and formulations. Start with a [DIFFICULTY] level problem now.`,
    },
    'Ethical Dilemma Simulator': {
        title: 'Ethical Dilemma Simulator',
        badge: 'Core',
        description: 'Explore complex ethical scenarios with NMC Code guidance.',
        prompt: `You will present me with ethical dilemmas relevant to UK nursing practice.

FORMAT FOR EACH DILEMMA:
1. Present a realistic scenario with no clear "right" answer
2. Include competing values (e.g., autonomy vs. beneficence)
3. After I share my reasoning, explore it Socratically
4. Reference relevant sections of the NMC Code
5. Discuss what I might document and who I might escalate to

SCENARIO COMPLEXITY: [Choose: Student Nurse / Newly Qualified / Experienced]

TOPICS TO EXPLORE:
- Capacity and consent
- Confidentiality vs. safeguarding
- Resource allocation
- End of life decisions
- Conscientious objection
- Social media and professional boundaries

Begin with a scenario appropriate for my level.`,
    },
    'A-G Assessment Simulator': {
        title: 'A-G Assessment Simulator',
        badge: 'Core',
        description: 'Systematic patient assessment practice using A-G approach.',
        prompt: `You are an A-G Assessment Simulator for acute patient assessment practice.

PRESENT ME WITH A PATIENT who requires systematic assessment. After I complete each step of my A-G assessment, reveal findings appropriately.

A-G FRAMEWORK:
A - Airway
B - Breathing  
C - Circulation
D - Disability (Neuro)
E - Exposure
F - Fluids
G - Glucose

SIMULATION RULES:
1. Only reveal findings for the system I'm currently assessing
2. Include some red flags that require escalation
3. After my full assessment, ask me to calculate NEWS2 score
4. Ask me for my SBAR handover to a senior clinician
5. Provide feedback on my systematic approach

PATIENT ACUITY: [Choose: Stable / Deteriorating / Critical]

Start by describing the setting and why I've been called to assess this patient.`,
    },
};


// NMC Standards of Proficiency for Registered Nurses (2018, updated 2024)
const NMC_PLATFORMS = [
    {
        id: 'platform1',
        number: 1,
        title: 'Being an Accountable Professional',
        description: 'Demonstrate professionalism, legal and ethical awareness, and take responsibility for own actions.',
        proficiencies: [
            { id: '1.1', text: 'Understand and apply the NMC Code' },
            { id: '1.2', text: 'Understand legal requirements and ethical frameworks' },
            { id: '1.3', text: 'Take responsibility for continuous self-reflection' },
            { id: '1.4', text: 'Demonstrate resilience and emotional intelligence' },
        ],
        aiStrategies: ['Socratic Tutoring', 'Ethical Dilemma Simulator', 'Reflective Journaling with AI Feedback'],
    },
    {
        id: 'platform2',
        number: 2,
        title: 'Promoting Health and Preventing Ill Health',
        description: 'Promote health, protect from harm, and support self-management.',
        proficiencies: [
            { id: '2.1', text: 'Understand epidemiology and public health' },
            { id: '2.2', text: 'Assess health needs of populations' },
            { id: '2.3', text: 'Support behaviour change and health promotion' },
            { id: '2.4', text: 'Understand determinants of health' },
        ],
        aiStrategies: ['Health Literacy Content Generator', 'Patient Education Material Simplifier', 'Community Health Scenario Builder'],
    },
    {
        id: 'platform3',
        number: 3,
        title: 'Assessing Needs and Planning Care',
        description: 'Conduct comprehensive assessments and collaboratively plan care.',
        proficiencies: [
            { id: '3.1', text: 'Conduct holistic, person-centred assessments' },
            { id: '3.2', text: 'Use evidence-based frameworks for assessment' },
            { id: '3.3', text: 'Develop care plans with patients and families' },
            { id: '3.4', text: 'Recognise signs of deterioration' },
        ],
        aiStrategies: ['Patient Simulator (History Taking)', 'A-G Assessment Practice', 'Care Plan Co-Pilot'],
    },
    {
        id: 'platform4',
        number: 4,
        title: 'Providing and Evaluating Care',
        description: 'Deliver safe, compassionate, person-centred care and evaluate outcomes.',
        proficiencies: [
            { id: '4.1', text: 'Deliver evidence-based nursing interventions' },
            { id: '4.2', text: 'Manage medicines safely' },
            { id: '4.3', text: 'Provide end-of-life care' },
            { id: '4.4', text: 'Evaluate care outcomes' },
        ],
        aiStrategies: ['Drug Calculation Tutor', 'Clinical Scenario Roleplay', 'SBAR Handover Practice'],
    },
    {
        id: 'platform5',
        number: 5,
        title: 'Leading and Managing Nursing Care',
        description: 'Lead and manage care, demonstrating effective teamwork.',
        proficiencies: [
            { id: '5.1', text: 'Demonstrate leadership and management skills' },
            { id: '5.2', text: 'Supervise and delegate effectively' },
            { id: '5.3', text: 'Coordinate care across teams' },
            { id: '5.4', text: 'Manage conflict constructively' },
        ],
        aiStrategies: ['Leadership Scenario Simulator', 'Delegation Decision Tree Builder', 'Team Communication Coach'],
    },
    {
        id: 'platform6',
        number: 6,
        title: 'Improving Safety and Quality of Care',
        description: 'Contribute to quality improvement and ensure safety.',
        proficiencies: [
            { id: '6.1', text: 'Understand quality improvement methodologies' },
            { id: '6.2', text: 'Identify and manage risks' },
            { id: '6.3', text: 'Report and learn from incidents' },
            { id: '6.4', text: 'Use audit and feedback' },
        ],
        aiStrategies: ['Root Cause Analysis Assistant', 'Incident Report Writing Coach', 'PDSA Cycle Planner'],
    },
    {
        id: 'platform7',
        number: 7,
        title: 'Coordinating Care',
        description: 'Coordinate care across settings and transitions.',
        proficiencies: [
            { id: '7.1', text: 'Understand care pathways and referral processes' },
            { id: '7.2', text: 'Facilitate smooth transitions of care' },
            { id: '7.3', text: 'Work collaboratively with MDT' },
            { id: '7.4', text: 'Advocate for patient needs' },
        ],
        aiStrategies: ['Discharge Planning Checklist Generator', 'MDT Meeting Role-play', 'Care Pathway Navigator'],
    },
];

// Annexe A: Communication and Relationship Management Skills
const ANNEXE_A = [
    {
        id: 'A1',
        number: 'A1',
        title: 'Underpinning Communication Skills',
        description: 'Skills for assessing, planning, providing and managing evidence-based nursing care.',
        proficiencies: [
            { id: 'A1.1', text: 'Actively listen, recognise and respond to verbal and non-verbal cues' },
            { id: 'A1.2', text: 'Use prompts and positive verbal and non-verbal reinforcement' },
            { id: 'A1.3', text: 'Use appropriate non-verbal communication including touch, eye contact and personal space' },
            { id: 'A1.4', text: 'Make appropriate use of open and closed questioning' },
            { id: 'A1.5', text: 'Use caring conversation techniques' },
            { id: 'A1.6', text: 'Check understanding and use clarification techniques' },
            { id: 'A1.7', text: 'Be aware of own unconscious bias in communication encounters' },
            { id: 'A1.8', text: 'Write accurate, clear, legible records and documentation' },
            { id: 'A1.9', text: 'Confidently present and share verbal and written reports' },
            { id: 'A1.10', text: 'Analyse and clearly record and share digital information and data' },
            { id: 'A1.11', text: 'Provide clear information when delegating or handing over care' },
            { id: 'A1.12', text: 'Recognise the need for and facilitate access to translator services' },
        ],
        aiStrategies: ['SBAR Handover Practice', 'Documentation Review Bot', 'Active Listening Simulator', '🚀 The Clinical Fishbowl (Multi-Agent Sim)'],
    },
    {
        id: 'A2',
        number: 'A2',
        title: 'Communication for Health Promotion',
        description: 'Supporting people of all ages, families and carers in preventing ill health and managing care.',
        proficiencies: [
            { id: 'A2.1', text: 'Share information about common health conditions (diabetes, dementia, cardiac, etc.)' },
            { id: 'A2.2', text: 'Use clear language and written materials, making reasonable adjustments' },
            { id: 'A2.3', text: 'Recognise and accommodate sensory impairments during communications' },
            { id: 'A2.4', text: 'Support and manage use of personal communication aids' },
            { id: 'A2.5', text: 'Identify and manage alternative communication techniques' },
            { id: 'A2.6', text: 'Use repetition and positive reinforcement strategies' },
            { id: 'A2.8', text: 'Provide information and respond to questions about treatment and care' },
            { id: 'A2.9', text: 'Engage in difficult conversations including breaking bad news' },
        ],
        aiStrategies: ['Patient Education Simplifier', 'Breaking Bad News Roleplay', 'Health Literacy Checker', '🚀 Explain-Like-I\'m-5 Challenge'],
    },
    {
        id: 'A3',
        number: 'A3',
        title: 'Therapeutic Communication Skills',
        description: 'Communication skills and approaches for providing therapeutic interventions.',
        proficiencies: [
            { id: 'A3.1', text: 'Motivational interview techniques' },
            { id: 'A3.2', text: 'Solution focused therapies' },
            { id: 'A3.3', text: 'Reminiscence therapies' },
            { id: 'A3.4', text: 'Talking therapies' },
            { id: 'A3.5', text: 'De-escalation strategies and techniques' },
            { id: 'A3.6', text: 'Cognitive behavioural therapy techniques' },
            { id: 'A3.7', text: 'Play therapy' },
            { id: 'A3.8', text: 'Distraction and diversion strategies' },
            { id: 'A3.9', text: 'Positive behaviour support approaches' },
        ],
        aiStrategies: ['Motivational Interviewing Practice', 'De-escalation Scenario Simulator', 'CBT Technique Coach', '🚀 Agentic De-escalation (Two-AI Sim)'],
    },
    {
        id: 'A4',
        number: 'A4',
        title: 'Professional Team Communication',
        description: 'Communication skills for working with people in professional teams.',
        proficiencies: [
            { id: 'A4.1.1', text: 'Give clear instructions when supervising, teaching or appraising' },
            { id: 'A4.1.2', text: 'Give clear instructions when delegating care responsibilities' },
            { id: 'A4.1.3', text: 'Provide unambiguous, constructive feedback' },
            { id: 'A4.1.4', text: 'Encourage colleagues to reflect on their practice' },
            { id: 'A4.1.5', text: 'Maintain unambiguous records of performance' },
            { id: 'A4.2.1', text: 'Use strengths-based approaches for team development' },
            { id: 'A4.2.2', text: 'Use active listening when dealing with team concerns' },
            { id: 'A4.2.3', text: 'Maintain a calm presence when dealing with conflict' },
            { id: 'A4.2.4', text: 'Use appropriate confrontation strategies' },
            { id: 'A4.2.5', text: 'Use de-escalation strategies in conflict' },
            { id: 'A4.2.6', text: 'Use effective negotiation and escalation procedures' },
        ],
        aiStrategies: ['Feedback Delivery Practice', 'Conflict Resolution Roleplay', 'Team Meeting Facilitator', '🚀 Safety Co-Pilot (Feedback Agent)'],
    },
];

// Annexe B: Nursing Procedures
const ANNEXE_B = [
    {
        id: 'B1',
        number: 'B1',
        title: 'History Taking and Assessment',
        description: 'Take a history, observe, recognise and accurately assess people of all ages.',
        proficiencies: [
            { id: 'B1.1.1', text: 'Recognise signs of mental and emotional distress or vulnerability' },
            { id: 'B1.1.2', text: 'Assess cognitive health status and wellbeing' },
            { id: 'B1.1.3', text: 'Recognise signs of cognitive distress and impairment' },
            { id: 'B1.1.4', text: 'Identify behavioural distress-based needs' },
            { id: 'B1.1.5', text: 'Recognise agitation, aggression and challenging behaviour' },
            { id: 'B1.1.6', text: 'Recognise signs of self-harm and suicidal ideation' },
            { id: 'B1.2.1', text: 'Recognise symptoms and signs of physical ill health' },
            { id: 'B1.2.2', text: 'Recognise symptoms and signs of physical distress' },
            { id: 'B1.2.3', text: 'Recognise symptoms and signs of deterioration and sepsis' },
        ],
        aiStrategies: ['History Taking Simulator', 'Mental Health Assessment Practice', 'Deterioration Recognition Scenarios', '🚀 Agentic History Taking (AI Family Member)'],
    },
    {
        id: 'B2',
        number: 'B2',
        title: 'Clinical Procedures',
        description: 'Evidence-based procedures for assessment and monitoring.',
        proficiencies: [
            { id: 'B2.1', text: 'Take, record and interpret vital signs manually and via devices' },
            { id: 'B2.2', text: 'Undertake venepuncture, cannulation and blood sampling' },
            { id: 'B2.3', text: 'Set up and manage ECG investigations and interpret traces' },
            { id: 'B2.4', text: 'Manage and monitor blood component transfusions' },
            { id: 'B2.5', text: 'Manage cardiac monitors, infusion pumps, blood glucose monitors' },
            { id: 'B2.6', text: 'Accurately measure weight, height and calculate BMI' },
            { id: 'B2.7', text: 'Undertake whole-body systems assessment' },
            { id: 'B2.8', text: 'Undertake chest auscultation and interpret findings' },
            { id: 'B2.9', text: 'Collect and analyse specimens (sputum, urine, stool, vomit)' },
            { id: 'B2.10', text: 'Measure and interpret blood glucose levels' },
            { id: 'B2.12', text: 'Undertake and interpret neurological observations' },
            { id: 'B2.13', text: 'Identify and respond to signs of deterioration and sepsis' },
            { id: 'B2.16', text: 'Recognise and manage seizures, choking and anaphylaxis' },
        ],
        aiStrategies: ['Vital Signs Interpretation Quiz', 'ECG Reading Tutor', 'A-G Assessment Simulator', '🚀 The Crash Cart Simulator (Real-Time Agent)'],
    },
    {
        id: 'B3',
        number: 'B3',
        title: 'Rest, Sleep, Comfort and Dignity',
        description: 'Meeting needs for rest, sleep, comfort and maintenance of dignity.',
        proficiencies: [
            { id: 'B3.1', text: 'Observe and assess comfort, pain levels and sleep patterns' },
            { id: 'B3.2', text: 'Use appropriate bed-making techniques' },
            { id: 'B3.3', text: 'Use appropriate positioning and pressure-relieving techniques' },
            { id: 'B3.4', text: 'Take appropriate action to ensure privacy and dignity' },
            { id: 'B3.5', text: 'Take appropriate action to reduce pain or discomfort' },
            { id: 'B3.6', text: 'Take action to reduce fatigue and support improved sleep hygiene' },
        ],
        aiStrategies: ['Pain Assessment Roleplay', 'Pressure Ulcer Prevention Scenarios', 'Sleep Hygiene Education'],
    },
    {
        id: 'B4',
        number: 'B4',
        title: 'Hygiene and Skin Integrity',
        description: 'Meeting needs for hygiene and maintenance of skin integrity.',
        proficiencies: [
            { id: 'B4.1', text: 'Observe, assess and optimise skin and hygiene status' },
            { id: 'B4.2', text: 'Use contemporary approaches to skin integrity assessment' },
            { id: 'B4.3', text: 'Assist with washing, bathing, shaving and dressing' },
            { id: 'B4.4', text: 'Identify and manage skin irritations and rashes' },
            { id: 'B4.5', text: 'Provide oral, dental, eye and nail care' },
            { id: 'B4.6', text: 'Use aseptic techniques for wound care' },
            { id: 'B4.7', text: 'Manage wound and drainage processes aseptically' },
            { id: 'B4.8', text: 'Assess, respond to and manage pyrexia and hypothermia' },
        ],
        aiStrategies: ['Wound Assessment Practice', 'Aseptic Technique Simulator', 'Skin Integrity Case Studies'],
    },
    {
        id: 'B5',
        number: 'B5',
        title: 'Nutrition and Hydration',
        description: 'Meeting needs for nutrition and hydration.',
        proficiencies: [
            { id: 'B5.1', text: 'Observe, assess and optimise nutrition and hydration status' },
            { id: 'B5.2', text: 'Use contemporary nutritional assessment tools' },
            { id: 'B5.3', text: 'Assist with feeding and drinking using appropriate aids' },
            { id: 'B5.4', text: 'Record fluid intake/output and manage dehydration/retention' },
            { id: 'B5.5', text: 'Identify, respond to and manage nausea and vomiting' },
            { id: 'B5.6', text: 'Insert, manage and remove oral/nasal/gastric tubes' },
            { id: 'B5.7', text: 'Manage artificial nutrition via oral, enteral and parenteral routes' },
            { id: 'B5.8', text: 'Manage IV fluid administration' },
            { id: 'B5.9', text: 'Manage fluid and nutritional infusion pumps' },
        ],
        aiStrategies: ['MUST Assessment Practice', 'Fluid Balance Calculator', 'NG Tube Management Scenarios'],
    },
    {
        id: 'B6',
        number: 'B6',
        title: 'Bladder and Bowel Health',
        description: 'Meeting needs for bladder and bowel health.',
        proficiencies: [
            { id: 'B6.1', text: 'Assess urinary and bowel continence and assist with toileting' },
            { id: 'B6.2', text: 'Use continence products; insert, manage and remove catheters' },
            { id: 'B6.3', text: 'Manage bladder drainage' },
            { id: 'B6.4', text: 'Assess patterns for constipation, diarrhoea and retention' },
            { id: 'B6.5', text: 'Administer enemas and suppositories; undertake rectal examination' },
            { id: 'B6.6', text: 'Undertake stoma care with appropriate products' },
        ],
        aiStrategies: ['Continence Assessment Scenarios', 'Catheter Care Decision Tree', 'Stoma Care Education'],
    },
    {
        id: 'B7',
        number: 'B7',
        title: 'Mobility and Safety',
        description: 'Meeting needs for mobility and safety.',
        proficiencies: [
            { id: 'B7.1', text: 'Use risk assessment tools to optimise mobility and manage falls risk' },
            { id: 'B7.2', text: 'Use contemporary moving and handling techniques' },
            { id: 'B7.3', text: 'Use moving and handling equipment for impaired mobility' },
            { id: 'B7.4', text: 'Use appropriate safety techniques and devices' },
        ],
        aiStrategies: ['Falls Risk Assessment Practice', 'Moving & Handling Scenarios', 'Mobility Aid Selection'],
    },
    {
        id: 'B8',
        number: 'B8',
        title: 'Respiratory Care',
        description: 'Meeting needs for respiratory care and support.',
        proficiencies: [
            { id: 'B8.1', text: 'Respond to restlessness, agitation and breathlessness' },
            { id: 'B8.2', text: 'Manage oxygen administration using various routes' },
            { id: 'B8.3', text: 'Take and interpret peak flow and oximetry measurements' },
            { id: 'B8.4', text: 'Use nasal and oral suctioning techniques' },
            { id: 'B8.5', text: 'Manage inhalation, humidifier and nebuliser devices' },
            { id: 'B8.6', text: 'Manage airway and respiratory equipment' },
        ],
        aiStrategies: ['Oxygen Therapy Scenarios', 'Respiratory Assessment Quiz', 'ABG Interpretation Practice'],
    },
    {
        id: 'B9',
        number: 'B9',
        title: 'Infection Prevention and Management',
        description: 'Prevention and management of infection.',
        proficiencies: [
            { id: 'B9.1', text: 'Observe, assess and respond to infection risks' },
            { id: 'B9.2', text: 'Use standard precautions protocols' },
            { id: 'B9.3', text: 'Use effective aseptic non-touch techniques' },
            { id: 'B9.4', text: 'Use appropriate personal protective equipment' },
            { id: 'B9.5', text: 'Implement isolation procedures' },
            { id: 'B9.6', text: 'Use evidence-based hand hygiene techniques' },
            { id: 'B9.7', text: 'Safely decontaminate equipment and environment' },
            { id: 'B9.8', text: 'Safely dispose of waste, laundry and sharps' },
            { id: 'B9.9', text: 'Safely manage invasive medical devices and lines' },
        ],
        aiStrategies: ['Infection Control Scenarios', 'PPE Selection Quiz', 'ANTT Practice Simulator', '🚀 Sepsis Response Agent (Time-Critical)'],
    },
    {
        id: 'B10',
        number: 'B10',
        title: 'End of Life Care',
        description: 'Meeting needs for care and support at the end of life.',
        proficiencies: [
            { id: 'B10.1', text: 'Assess and respond to symptoms: pain, nausea, anxiety, depression' },
            { id: 'B10.2', text: 'Manage symptom relief medication and infusion pumps' },
            { id: 'B10.3', text: 'Assess preferences and care priorities of the dying person' },
            { id: 'B10.4', text: 'Apply organ donation protocols and advance planning decisions' },
            { id: 'B10.5', text: 'Apply DNACPR decisions and verification of expected death' },
            { id: 'B10.6', text: 'Provide care for the deceased respecting cultural requirements' },
        ],
        aiStrategies: ['End of Life Conversation Practice', 'Symptom Management Scenarios', 'Advance Care Planning Guide'],
    },
    {
        id: 'B11',
        number: 'B11',
        title: 'Medicines Administration',
        description: 'Procedural competencies for medicines administration and optimisation.',
        proficiencies: [
            { id: 'B11.1', text: 'Assess ability to self-administer medications' },
            { id: 'B11.2', text: 'Recognise routes for prescribing, supplying and administering medicines' },
            { id: 'B11.3', text: 'Use principles of safe remote prescribing' },
            { id: 'B11.4', text: 'Undertake accurate drug calculations' },
            { id: 'B11.5', text: 'Undertake accurate checks including transcription and titration' },
            { id: 'B11.6', text: 'Exercise professional accountability in medicine administration' },
            { id: 'B11.7', text: 'Administer injections: IM, SC, intradermal and IV routes' },
            { id: 'B11.8', text: 'Administer medications using a range of routes' },
            { id: 'B11.9', text: 'Administer medications via vascular access and enteral equipment' },
            { id: 'B11.10', text: 'Recognise and respond to adverse reactions to medications' },
            { id: 'B11.11', text: 'Undertake safe storage, transportation and disposal of medicines' },
        ],
        aiStrategies: ['Drug Calculation Tutor', 'Medication Error Scenarios', 'Injection Technique Practice', '🚀 Safety Co-Pilot (Prescription Checker)'],
    },
];

export default function NMCMap() {
    const [activeTab, setActiveTab] = useState('platforms');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedProficiencies, setSelectedProficiencies] = useState([]);
    const [copied, setCopied] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState(null);
    const [promptCopied, setPromptCopied] = useState(false);

    const getDataForTab = () => {
        switch (activeTab) {
            case 'annexeA': return ANNEXE_A;
            case 'annexeB': return ANNEXE_B;
            default: return NMC_PLATFORMS;
        }
    };

    const getTabLabel = () => {
        switch (activeTab) {
            case 'annexeA': return 'Annexe A';
            case 'annexeB': return 'Annexe B';
            default: return 'Platform';
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setSelectedProficiencies([]);
    };

    const toggleProficiency = (profId) => {
        setSelectedProficiencies(prev =>
            prev.includes(profId)
                ? prev.filter(id => id !== profId)
                : [...prev, profId]
        );
    };

    const generateStatement = () => {
        if (!selectedItem || selectedProficiencies.length === 0) return '';

        const profs = selectedItem.proficiencies.filter(p => selectedProficiencies.includes(p.id));
        const strategies = selectedItem.aiStrategies.slice(0, 2).join(', ');

        let prefix = '';
        if (activeTab === 'platforms') {
            prefix = `Platform ${selectedItem.number}: "${selectedItem.title}"`;
        } else if (activeTab === 'annexeA') {
            prefix = `Annexe A - Section ${selectedItem.number}: "${selectedItem.title}"`;
        } else {
            prefix = `Annexe B - Section ${selectedItem.number}: "${selectedItem.title}"`;
        }

        return `This learning activity aligns with the NMC Standards of Proficiency (2018), specifically ${prefix}. Students will demonstrate competence in:\n\n${profs.map(p => `• ${p.id}: ${p.text}`).join('\n')}\n\nSuggested AI-Enhanced Strategies: ${strategies}.\n\nThe use of Generative AI in this context supports the development of critical thinking and clinical reasoning skills while maintaining appropriate professional oversight.`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateStatement());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyPrompt = () => {
        if (selectedStrategy && STRATEGY_PROMPTS[selectedStrategy]) {
            navigator.clipboard.writeText(STRATEGY_PROMPTS[selectedStrategy].prompt);
            setPromptCopied(true);
            setTimeout(() => setPromptCopied(false), 2000);
        }
    };

    const handleStrategyClick = (strategy) => {
        if (STRATEGY_PROMPTS[strategy]) {
            setSelectedStrategy(strategy);
        }
    };

    const closeModal = () => {
        setSelectedStrategy(null);
        setPromptCopied(false);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedItem(null);
        setSelectedProficiencies([]);
    };

    const data = getDataForTab();

    return (
        <div className={styles.nmcMapContainer}>
            {/* Tab Navigation */}
            <div className={styles.tabNav}>
                <button
                    className={clsx(styles.tabButton, activeTab === 'platforms' && styles.activeTab)}
                    onClick={() => handleTabChange('platforms')}
                >
                    📋 7 Platforms
                </button>
                <button
                    className={clsx(styles.tabButton, activeTab === 'annexeA' && styles.activeTab)}
                    onClick={() => handleTabChange('annexeA')}
                >
                    💬 Annexe A: Communication
                </button>
                <button
                    className={clsx(styles.tabButton, activeTab === 'annexeB' && styles.activeTab)}
                    onClick={() => handleTabChange('annexeB')}
                >
                    🩺 Annexe B: Procedures
                </button>
            </div>

            {/* Item Grid */}
            <div className={styles.platformGrid}>
                {data.map((item) => (
                    <button
                        key={item.id}
                        className={clsx(
                            styles.platformCard,
                            selectedItem?.id === item.id && styles.selected
                        )}
                        onClick={() => handleItemClick(item)}
                    >
                        <span className={styles.platformNumber}>{item.number}</span>
                        <span className={styles.platformTitle}>{item.title}</span>
                    </button>
                ))}
            </div>

            {/* Proficiency Selector */}
            {selectedItem && (
                <div className={styles.proficiencySection}>
                    <h3>{getTabLabel()} {selectedItem.number}: {selectedItem.title}</h3>
                    <p className={styles.platformDescription}>{selectedItem.description}</p>

                    <div className={styles.proficiencyList}>
                        {selectedItem.proficiencies.map((prof) => (
                            <label key={prof.id} className={styles.proficiencyItem}>
                                <input
                                    type="checkbox"
                                    checked={selectedProficiencies.includes(prof.id)}
                                    onChange={() => toggleProficiency(prof.id)}
                                />
                                <span><strong>{prof.id}</strong>: {prof.text}</span>
                            </label>
                        ))}
                    </div>

                    <div className={styles.suggestedStrategies}>
                        <h4>🤖 AI Strategies for this Section <span className={styles.clickHint}>(click for prompt)</span></h4>
                        <div className={styles.strategyTags}>
                            {selectedItem.aiStrategies.map((strategy, idx) => (
                                <button
                                    key={idx}
                                    className={clsx(
                                        styles.strategyTag,
                                        strategy.startsWith('🚀') && styles.premiumStrategy,
                                        STRATEGY_PROMPTS[strategy] && styles.clickableStrategy
                                    )}
                                    title={STRATEGY_PROMPTS[strategy] ? 'Click for copy-ready prompt' : undefined}
                                    onClick={() => handleStrategyClick(strategy)}
                                    disabled={!STRATEGY_PROMPTS[strategy]}
                                >
                                    {strategy}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Output Statement */}
            {selectedProficiencies.length > 0 && (
                <div className={styles.outputSection}>
                    <h4>📜 Generated Compliance Statement</h4>
                    <pre className={styles.statementOutput}>
                        {generateStatement()}
                    </pre>
                    <button
                        className={clsx('button', copied ? 'button--success' : 'button--primary')}
                        onClick={handleCopy}
                    >
                        {copied ? '✅ Copied!' : '📋 Copy Statement'}
                    </button>
                </div>
            )}

            {/* Prompt Modal */}
            {selectedStrategy && STRATEGY_PROMPTS[selectedStrategy] && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={closeModal}>✕</button>
                        <div className={styles.modalHeader}>
                            <span className={clsx(
                                styles.modalBadge,
                                STRATEGY_PROMPTS[selectedStrategy].badge === '2025 Agentic' && styles.premiumBadge
                            )}>
                                {STRATEGY_PROMPTS[selectedStrategy].badge}
                            </span>
                            <h3>{STRATEGY_PROMPTS[selectedStrategy].title}</h3>
                            <p className={styles.modalDescription}>
                                {STRATEGY_PROMPTS[selectedStrategy].description}
                            </p>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.promptLabel}>
                                📋 Copy this prompt into ChatGPT, Gemini, Copilot, or Claude:
                            </div>
                            <pre className={styles.promptBox}>
                                {STRATEGY_PROMPTS[selectedStrategy].prompt}
                            </pre>
                            <button
                                className={clsx(
                                    'button button--lg',
                                    promptCopied ? 'button--success' : 'button--primary'
                                )}
                                onClick={handleCopyPrompt}
                                style={{ width: '100%', marginTop: '1rem' }}
                            >
                                {promptCopied ? '✅ Prompt Copied!' : '📋 Copy Full Prompt'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

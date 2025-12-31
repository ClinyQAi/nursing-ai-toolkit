import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

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
        aiStrategies: ['SBAR Handover Practice', 'Documentation Review Bot', 'Active Listening Simulator'],
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
        aiStrategies: ['Patient Education Simplifier', 'Breaking Bad News Roleplay', 'Health Literacy Checker'],
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
        aiStrategies: ['Motivational Interviewing Practice', 'De-escalation Scenario Simulator', 'CBT Technique Coach'],
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
        aiStrategies: ['Feedback Delivery Practice', 'Conflict Resolution Roleplay', 'Team Meeting Facilitator'],
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
        aiStrategies: ['History Taking Simulator', 'Mental Health Assessment Practice', 'Deterioration Recognition Scenarios'],
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
        aiStrategies: ['Vital Signs Interpretation Quiz', 'ECG Reading Tutor', 'A-G Assessment Simulator'],
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
        aiStrategies: ['Infection Control Scenarios', 'PPE Selection Quiz', 'ANTT Practice Simulator'],
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
        aiStrategies: ['Drug Calculation Tutor', 'Medication Error Scenarios', 'Injection Technique Practice'],
    },
];

export default function NMCMap() {
    const [activeTab, setActiveTab] = useState('platforms');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedProficiencies, setSelectedProficiencies] = useState([]);
    const [copied, setCopied] = useState(false);

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
                        <h4>🤖 AI Strategies for this Section</h4>
                        <div className={styles.strategyTags}>
                            {selectedItem.aiStrategies.map((strategy, idx) => (
                                <span key={idx} className={styles.strategyTag}>{strategy}</span>
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
        </div>
    );
}

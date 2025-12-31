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

export default function NMCMap() {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [selectedProficiencies, setSelectedProficiencies] = useState([]);
    const [copied, setCopied] = useState(false);

    const handlePlatformClick = (platform) => {
        setSelectedPlatform(platform);
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
        if (!selectedPlatform || selectedProficiencies.length === 0) return '';

        const platform = selectedPlatform;
        const profs = platform.proficiencies.filter(p => selectedProficiencies.includes(p.id));
        const strategies = platform.aiStrategies.slice(0, 2).join(', ');

        return `This learning activity aligns with the NMC Standards of Proficiency (2018), specifically Platform ${platform.number}: "${platform.title}". Students will demonstrate competence in:\n\n${profs.map(p => `• ${p.id}: ${p.text}`).join('\n')}\n\nSuggested AI-Enhanced Strategies: ${strategies}.\n\nThe use of Generative AI in this context supports the development of critical thinking and clinical reasoning skills while maintaining appropriate professional oversight.`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateStatement());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.nmcMapContainer}>
            {/* Platform Selector */}
            <div className={styles.platformGrid}>
                {NMC_PLATFORMS.map((platform) => (
                    <button
                        key={platform.id}
                        className={clsx(
                            styles.platformCard,
                            selectedPlatform?.id === platform.id && styles.selected
                        )}
                        onClick={() => handlePlatformClick(platform)}
                    >
                        <span className={styles.platformNumber}>{platform.number}</span>
                        <span className={styles.platformTitle}>{platform.title}</span>
                    </button>
                ))}
            </div>

            {/* Proficiency Selector */}
            {selectedPlatform && (
                <div className={styles.proficiencySection}>
                    <h3>Platform {selectedPlatform.number}: {selectedPlatform.title}</h3>
                    <p className={styles.platformDescription}>{selectedPlatform.description}</p>

                    <div className={styles.proficiencyList}>
                        {selectedPlatform.proficiencies.map((prof) => (
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
                        <h4>🤖 AI Strategies for this Platform</h4>
                        <div className={styles.strategyTags}>
                            {selectedPlatform.aiStrategies.map((strategy, idx) => (
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

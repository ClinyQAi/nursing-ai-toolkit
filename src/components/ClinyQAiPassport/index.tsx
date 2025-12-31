import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const PASSPORT_DOMAINS = [
    {
        id: 'safety',
        title: '🛡️ Clinical Quality & Safety',
        description: 'Mastering AI for patient safety, deterioration detection, and drug calculation verification.',
        nmc: 'Platform 6: Improving Safety and Quality of Care',
        skills: [
            { id: 'deterioration', label: 'Deterioration Simulator', strategy: '🚀 The Crash Cart Simulator' },
            { id: 'sepsis', label: 'Sepsis Response', strategy: '🚀 Sepsis Response Agent' },
            { id: 'medsafety', label: 'Medication Safety', strategy: '🚀 Safety Co-Pilot (Prescription Checker)' },
        ],
    },
    {
        id: 'reasoning',
        title: '🧠 AI Reasoning & Criticality',
        description: 'Understanding LLM logic, managing hallucinations, and validating clinical evidence.',
        nmc: 'Annexe B1.1: Critically Appraising Evidence',
        skills: [
            { id: 'hallucination', label: 'Bias & Hallucination Test', strategy: 'Socratic Tutoring' },
            { id: 'simplifier', label: 'Concept Simplification', strategy: 'Concept Simplifier' },
        ],
    },
    {
        id: 'relational',
        title: '💬 Relational Intelligence',
        description: 'Using AI to practice de-escalation, empathy, and challenging patient conversations.',
        nmc: 'Annexe A: Communication and Relationship Management Skills',
        skills: [
            { id: 'deescalation', label: 'De-escalation mastery', strategy: '🚀 Agentic De-escalation' },
            { id: 'fishbowl', label: 'Patient/Mentor Roleplay', strategy: '🚀 The Clinical Fishbowl' },
            { id: 'family', label: 'Family History Taking', strategy: '🚀 Agentic History Taking' },
        ],
    },
    {
        id: 'accountability',
        title: '⚖️ Ethical Accountability',
        description: 'Professional responsibility, data privacy, and Human-in-the-loop clinical auditing.',
        nmc: 'Platform 1: Being an Accountable Professional',
        skills: [
            { id: 'ethics', label: 'Ethical Dilemma Simulator', strategy: 'Ethical Dilemma Simulator' },
            { id: 'privacy', label: 'Data Privacy Audit', strategy: 'Safety Co-Pilot (Feedback Agent)' },
        ],
    },
    {
        id: 'productivity',
        title: '⚙️ Clinical Productivity',
        description: 'Leveraging AI for documentation efficiency, handover structure, and care planning.',
        nmc: 'Platform 7: Coordinating Care',
        skills: [
            { id: 'sbar', label: 'SBAR Handover Expert', strategy: 'SBAR Handover Practice' },
            { id: 'assessment', label: 'A-G Assessment Practice', strategy: 'A-G Assessment Simulator' },
        ],
    },
];

export default function ClinyQAiPassport() {
    const [progress, setProgress] = useState({});
    const [activeTab, setActiveTab] = useState('safety');
    const [isExporting, setIsExporting] = useState(false);

    // Initialize progress from LocalStorage
    useEffect(() => {
        const savedProgress = localStorage.getItem('clinyqai_passport');
        if (savedProgress) {
            try {
                setProgress(JSON.parse(savedProgress));
            } catch (e) {
                console.error('Failed to parse passport progress');
            }
        }
    }, []);

    const toggleSkill = (skillId) => {
        const newProgress = {
            ...progress,
            [skillId]: !progress[skillId],
        };
        setProgress(newProgress);
        localStorage.setItem('clinyqai_passport', JSON.stringify(newProgress));
    };

    const calculateOverallProgress = () => {
        const totalSkills = PASSPORT_DOMAINS.reduce((acc, domain) => acc + domain.skills.length, 0);
        const completedSkills = Object.values(progress).filter(Boolean).length;
        return Math.round((completedSkills / totalSkills) * 100);
    };

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            window.print();
            setIsExporting(false);
        }, 500);
    };

    const currentDomain = PASSPORT_DOMAINS.find(d => d.id === activeTab);

    return (
        <div className={styles.passportContainer}>
            <div className={styles.passportHeader}>
                <div className={styles.brandGroup}>
                    <div className={styles.logo}>CQ</div>
                    <div>
                        <h2>ClinyQAi™ <span className={styles.badge}>Passport</span></h2>
                        <p className={styles.subtitle}>Clinical Quality AI Proficiency Record</p>
                    </div>
                </div>
                <div className={styles.progressCircle}>
                    <svg viewBox="0 0 36 36" className={styles.circularChart}>
                        <path className={styles.circleBg}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className={styles.circle}
                            strokeDasharray={`${calculateOverallProgress()}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className={styles.percentage}>{calculateOverallProgress()}%</text>
                    </svg>
                </div>
            </div>

            <div className={styles.passportBody}>
                {/* Domain Navigation */}
                <div className={styles.domainNav}>
                    {PASSPORT_DOMAINS.map(domain => {
                        const completedInDomain = domain.skills.filter(s => progress[s.id]).length;
                        const totalInDomain = domain.skills.length;
                        const isComplete = completedInDomain === totalInDomain;

                        return (
                            <button
                                key={domain.id}
                                className={clsx(
                                    styles.domainBtn,
                                    activeTab === domain.id && styles.activeDomain,
                                    isComplete && styles.domainComplete
                                )}
                                onClick={() => setActiveTab(domain.id)}
                            >
                                <span className={styles.domainIndicator}>
                                    {isComplete ? '✅' : `${completedInDomain}/${totalInDomain}`}
                                </span>
                                {domain.title.split(' ')[1]}
                            </button>
                        );
                    })}
                </div>

                {/* Active Domain View */}
                <div className={styles.domainContent}>
                    <div className={styles.domainHeader}>
                        <h3>{currentDomain.title}</h3>
                        <p>{currentDomain.description}</p>
                        <div className={styles.nmcTag}>
                            <strong>NMC Mapping:</strong> {currentDomain.nmc}
                        </div>
                    </div>

                    <div className={styles.skillsGrid}>
                        {currentDomain.skills.map(skill => (
                            <div
                                key={skill.id}
                                className={clsx(
                                    styles.skillCard,
                                    progress[skill.id] && styles.skillCompleted
                                )}
                                onClick={() => toggleSkill(skill.id)}
                            >
                                <div className={styles.stampIcon}>
                                    {progress[skill.id] ? '✨' : '⭕'}
                                </div>
                                <div className={styles.skillInfo}>
                                    <h4>{skill.label}</h4>
                                    <span className={styles.strategyLabel}>Method: {skill.strategy}</span>
                                </div>
                                <div className={styles.checkbox}>
                                    {progress[skill.id] ? '✓ DONE' : 'MARK COMPLETE'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.passportFooter}>
                <button
                    className={clsx('button button--outline button--primary', styles.exportBtn)}
                    onClick={handleExport}
                >
                    📄 Export ClinyQAi™ Transcript (PDF)
                </button>
                <p className={styles.footerHint}>
                    Complete all domains to prove AI Stewardship and Clinical Quality readiness.
                </p>
            </div>
        </div>
    );
}

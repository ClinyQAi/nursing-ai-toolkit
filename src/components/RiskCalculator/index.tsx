
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface AssessmentFactor {
    id: string;
    label: string;
    weight: number;
}

const FACTORS = {
    format: [
        { id: 'essay', label: 'Essay / Report', weight: 8 },
        { id: 'mcq', label: 'Online MCQ', weight: 6 },
        { id: 'viva', label: 'Viva Voce', weight: 1 },
        { id: 'portfolio', label: 'Portfolio', weight: 5 },
        { id: 'osce', label: 'OSCE', weight: 0 },
    ],
    supervision: [
        { id: 'unsupervised', label: 'Unsupervised (Home)', weight: 5 },
        { id: 'open_book', label: 'Open Book (Class)', weight: 3 },
        { id: 'invigilated', label: 'Invigilated Exam', weight: 0 },
    ],
    internet: [
        { id: 'full_access', label: 'Full Internet Access', weight: 5 },
        { id: 'restricted', label: 'Restricted / Locked', weight: 2 },
        { id: 'none', label: 'No Device', weight: 0 },
    ]
};

export default function RiskCalculator(): JSX.Element {
    const [selections, setSelections] = useState({
        format: null,
        supervision: null,
        internet: null
    });

    const handleSelect = (category: string, value: any) => {
        setSelections(prev => ({ ...prev, [category]: value }));
    };

    const calculateRisk = () => {
        if (!selections.format || !selections.supervision || !selections.internet) return null;

        const score = selections.format.weight + selections.supervision.weight + selections.internet.weight;

        // Max score is roughly 8+5+5 = 18.
        // High: > 12
        // Medium: 6 - 12
        // Low: < 6

        if (score >= 12) return { level: 'High', class: styles.resultHigh, text: 'High probability of GenAI misuse. Rethink design.' };
        if (score >= 6) return { level: 'Medium', class: styles.resultMedium, text: 'Moderate risk. Mitigation strategies recommended.' };
        return { level: 'Low', class: styles.resultLow, text: 'Low risk. GenAI misuse unlikely or difficult.' };
    };

    const result = calculateRisk();

    return (
        <div className={styles.calculatorContainer}>
            {/* Format */}
            <div className={styles.questionGroup}>
                <label className={styles.questionLabel}>1. Assessment Format</label>
                <div className={styles.optionsGrid}>
                    {FACTORS.format.map(opt => (
                        <button
                            key={opt.id}
                            className={clsx(styles.optionButton, selections.format?.id === opt.id && styles.optionSelected)}
                            onClick={() => handleSelect('format', opt)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Supervision */}
            <div className={styles.questionGroup}>
                <label className={styles.questionLabel}>2. Supervision Level</label>
                <div className={styles.optionsGrid}>
                    {FACTORS.supervision.map(opt => (
                        <button
                            key={opt.id}
                            className={clsx(styles.optionButton, selections.supervision?.id === opt.id && styles.optionSelected)}
                            onClick={() => handleSelect('supervision', opt)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Internet */}
            <div className={styles.questionGroup}>
                <label className={styles.questionLabel}>3. Digital Access</label>
                <div className={styles.optionsGrid}>
                    {FACTORS.internet.map(opt => (
                        <button
                            key={opt.id}
                            className={clsx(styles.optionButton, selections.internet?.id === opt.id && styles.optionSelected)}
                            onClick={() => handleSelect('internet', opt)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Result */}
            {result && (
                <div className={clsx(styles.resultBox, result.class)}>
                    <div className={styles.riskTitle}>{result.level} Risk</div>
                    <div className={styles.riskDesc}>{result.text}</div>
                </div>
            )}
        </div>
    );
}

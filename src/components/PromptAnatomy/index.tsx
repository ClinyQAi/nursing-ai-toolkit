
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const DEFINITIONS = {
    role: {
        title: "Persona / Role",
        text: "Telling the AI WHO to be. This primes the model to access specific vocabulary and tone (e.g., 'Compassionate Nurse' vs 'Strict Examiner')."
    },
    task: {
        title: "Task / Instruction",
        text: "The core verb. What do you actually want it to DO? Be explicit (e.g., 'Summarise', 'Critique', 'Draft', 'Simplfy')."
    },
    audience: {
        title: "Target Audience",
        text: "Who is this for? This controls the complexity level (e.g., 'for a 5-year-old', 'for a frantic patient', 'for a medical consultant')."
    },
    format: {
        title: "Output Format",
        text: "How do you want the answer structured? (e.g., 'Markdown table', 'Bullet points', 'SBAR format', '3-paragraph essay')."
    }
};

export default function PromptAnatomy(): JSX.Element {
    const [activePart, setActivePart] = useState<string | null>(null);

    const getDef = () => activePart ? DEFINITIONS[activePart as keyof typeof DEFINITIONS] : null;

    return (
        <div className={styles.anatomyContainer}>
            <div className={styles.sentenceBox}>
                "Act as a
                <span
                    className={clsx(styles.anatomyPart, styles.partRole, activePart === 'role' && styles.partActive)}
                    onMouseEnter={() => setActivePart('role')}
                    onClick={() => setActivePart('role')}
                >
                    Senior Nurse
                </span>
                , explain
                <span
                    className={clsx(styles.anatomyPart, styles.partTask, activePart === 'task' && styles.partActive)}
                    onMouseEnter={() => setActivePart('task')}
                    onClick={() => setActivePart('task')}
                >
                    asthma management
                </span>
                to a
                <span
                    className={clsx(styles.anatomyPart, styles.partAudience, activePart === 'audience' && styles.partActive)}
                    onMouseEnter={() => setActivePart('audience')}
                    onClick={() => setActivePart('audience')}
                >
                    newly diagnosed teenager
                </span>
                using
                <span
                    className={clsx(styles.anatomyPart, styles.partFormat, activePart === 'format' && styles.partActive)}
                    onMouseEnter={() => setActivePart('format')}
                    onClick={() => setActivePart('format')}
                >
                    supportive bullet points
                </span>
                ."
            </div>

            <div className={styles.definitionBox}>
                {getDef() ? (
                    <div className="animate__animated animate__fadeIn">
                        <div className={styles.defTitle} style={{ color: activePart === 'role' ? '#2980b9' : activePart === 'task' ? '#27ae60' : activePart === 'audience' ? '#8e44ad' : '#d35400' }}>
                            {getDef().title}
                        </div>
                        <div className={styles.defText}>
                            {getDef().text}
                        </div>
                    </div>
                ) : (
                    <span className={styles.defPlaceholder}>Hover over the coloured words above to see what they do.</span>
                )}
            </div>
        </div>
    );
}

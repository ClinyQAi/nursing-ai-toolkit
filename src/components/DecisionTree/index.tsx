
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Node {
    id: string;
    text: string;
    options: Option[];
    feedback?: string;
    isEnd?: boolean;
}

interface Option {
    text: string;
    next: string;
}

const TREE_DATA: Record<string, Node> = {
    start: {
        id: 'start',
        text: "Scenario: A 65-year-old patient, 'John', is admitted with confusion and dehydration. You need to write a care plan. What do you do first?",
        options: [
            { text: "Ask AI to write a care plan for 'confusion'", next: 'ai_generic' },
            { text: "Assess John personally & gather history", next: 'assess' }
        ]
    },
    ai_generic: {
        id: 'ai_generic',
        text: "The AI produces a perfect-looking care plan for 'Dementia'. However, you haven't confirmed a diagnosis. John actually has a UTI.",
        feedback: "⚠️ Risk: Automation Bias. You accepted the AI's assumption without verifying the clinical data.",
        options: [
            { text: "Submit the plan anyway", next: 'fail_harm' },
            { text: "Scrap it and assess John", next: 'assess' }
        ]
    },
    assess: {
        id: 'assess',
        text: "Good. You find John has a high temperature and cloudy urine. Likely UTI. Now you need to document. How do you use AI?",
        options: [
            { text: "Input his name & NHS number into ChatGPT", next: 'fail_privacy' },
            { text: "Input anonymised symptoms for care plan ideas", next: 'success_human_loop' }
        ]
    },
    fail_harm: {
        id: 'fail_harm',
        text: "Outcome: John's UTI is missed. He develops sepsis. The care plan for dementia was irrelevant.",
        isEnd: true,
        feedback: "❌ CRITICAL FAILURE. Never let AI replace clinical assessment."
    },
    fail_privacy: {
        id: 'fail_privacy',
        text: "Outcome: You generated a great plan, but you just uploaded confidential patient data to a public server.",
        isEnd: true,
        feedback: "❌ PROFESSIONAL MISCONDUCT. Likely NMC referral for GDPR breach."
    },
    success_human_loop: {
        id: 'success_human_loop',
        text: "Outcome: The AI suggests interventions for 'Acute Confusion 2° to Infection'. You verify them, add specific details for John, and sign it off.",
        isEnd: true,
        feedback: "✅ SUCCESS. You used AI as a tool, maintained privacy, and applied your own clinical judgement."
    }
};

export default function DecisionTree(): JSX.Element {
    const [currentNode, setCurrentNode] = useState('start');
    const node = TREE_DATA[currentNode];

    const handleReset = () => setCurrentNode('start');

    return (
        <div className={styles.treeContainer}>
            <p className={styles.scenarioText}>
                {node.text}
            </p>

            {node.feedback && (
                <div className={styles.feedbackBox}>
                    <div className={styles.feedbackTitle}>Feedback</div>
                    {node.feedback}
                </div>
            )}

            {!node.isEnd && (
                <div className={styles.optionsGrid}>
                    {node.options.map((opt, idx) => (
                        <button
                            key={idx}
                            className={styles.optionButton}
                            onClick={() => setCurrentNode(opt.next)}
                        >
                            {opt.text}
                        </button>
                    ))}
                </div>
            )}

            {(node.isEnd || currentNode !== 'start') && (
                <button className={styles.resetButton} onClick={handleReset}>
                    Restart Simulation
                </button>
            )}
        </div>
    );
}

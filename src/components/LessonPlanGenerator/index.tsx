
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function LessonPlanGenerator(): JSX.Element {
    const [topic, setTopic] = useState('');
    const [level, setLevel] = useState('Year 1');
    const [duration, setDuration] = useState('60');
    const [strategy, setStrategy] = useState('Critique');
    const [plan, setPlan] = useState('');

    const generatePlan = () => {
        // Basic logic to generate a plan based on strategy
        let content = "";

        const header = `# Lesson Plan: ${topic || "Topic"}\n**Level**: ${level} | **Duration**: ${duration} mins | **Strategy**: ${strategy}\n\n`;

        let steps = "";

        if (strategy === 'Critique') {
            steps = `
## Learning Outcomes
1. Critically evaluate AI-generated content about ${topic}.
2. Identify hallucinations or biases.

## Flow
*   **0-10m (Intro)**: Introduce ${topic}. Discuss key human-verified facts.
*   **10-20m (AI Generation)**: Use ChatGPT to generate an explanation/essay on ${topic}.
*   **20-40m (Activity)**: Students work in pairs to "mark" the AI's work using a rubric. Find 3 errors or omissions.
*   **40-50m (Discussion)**: Share findings. Why did the AI fail?
*   **50-60m (Plenary)**: Summary of ${topic} and the importance of verification.
      `;
        } else if (strategy === 'Roleplay') {
            steps = `
## Learning Outcomes
1. Practice communication skills for ${topic}.
2. Reflect on responses in a safe environment.

## Flow
*   **0-10m (Intro)**: Overview of communication principles for ${topic}.
*   **10-20m (Setup)**: Students prompt AI to act as a "Patient with ${topic}".
*   **20-40m (Activity)**: Roleplay simulation. Students type responses to the "patient".
*   **40-50m (Reflect)**: Students ask AI for feedback on their empathy and clarity.
*   **50-60m (Plenary)**: Discuss challenging interactions.
      `;
        } else if (strategy === 'Create') {
            steps = `
## Learning Outcomes
1. Create revision materials for ${topic}.
2. Synthesize complex information.

## Flow
*   **0-10m (Intro)**: Key concepts of ${topic}.
*   **10-20m (Drafting)**: Students write bullet points of key facts.
*   **20-40m (AI Assist)**: Students use AI to transform bullets into a Mnemonic, Quiz, or Flashcards.
*   **40-50m (Verify)**: Check the AI outputs for accuracy.
*   **50-60m (Share)**: Swap resources with a partner.
      `;
        } else {
            // Debate context
            steps = `
## Learning Outcomes
1. Analyze ethical issues related to ${topic}.
2. Formulate arguments.

## Flow
*   **0-10m (Intro)**: The ethical landscape of ${topic}.
*   **10-20m (AI Argue)**: Ask AI to generate 3 arguments FOR and 3 AGAINST a specific motion.
*   **20-40m (Activity)**: Students critique the strength of AI arguments and improve them.
*   **40-50m (Debate)**: Mini-debate using the refined arguments.
*   **50-60m (Plenary)**: Vote on the motion.
       `;
        }

        setPlan(header + steps);
    };

    return (
        <div className={styles.plannerContainer}>
            <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Topic</label>
                    <input
                        className={styles.input}
                        placeholder="e.g., Sepsis / Ethics"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Level</label>
                    <select className={styles.select} value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option>Year 1 (Foundation)</option>
                        <option>Year 2 (Developing)</option>
                        <option>Year 3 (Proficient)</option>
                        <option>Postgrad</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Duration</label>
                    <select className={styles.select} value={duration} onChange={(e) => setDuration(e.target.value)}>
                        <option value="30">30 mins</option>
                        <option value="60">60 mins</option>
                        <option value="90">90 mins</option>
                        <option value="120">120 mins</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>AI Strategy</label>
                    <select className={styles.select} value={strategy} onChange={(e) => setStrategy(e.target.value)}>
                        <option value="Critique">Critique (Find errors)</option>
                        <option value="Roleplay">Roleplay (Simulation)</option>
                        <option value="Create">Co-Create (Revision)</option>
                        <option value="Debate">Debate (Ethics)</option>
                    </select>
                </div>
            </div>

            <button className={clsx('button button--primary button--lg', styles.generateButton)} onClick={generatePlan}>
                ✨ Generate Lesson Plan
            </button>

            {plan && (
                <div className={styles.planOutput}>
                    <button
                        className={clsx('button button--sm button--secondary', styles.copyButton)}
                        onClick={() => navigator.clipboard.writeText(plan)}
                    >
                        📋 Copy Markdown
                    </button>
                    {plan}
                </div>
            )}
        </div>
    );
}

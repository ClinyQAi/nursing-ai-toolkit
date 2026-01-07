
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface PolicyState {
    planning: boolean;
    drafting: boolean;
    editing: boolean;
    images: boolean;
    citation: boolean;
    detection: boolean;
}

export default function PolicyBuilder(): JSX.Element {
    const [scope, setScope] = useState('My Module');
    const [policies, setPolicies] = useState<PolicyState>({
        planning: true,
        drafting: false,
        editing: true,
        images: true,
        citation: true,
        detection: false
    });

    const toggle = (key: keyof PolicyState) => {
        setPolicies(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const generatePolicy = () => {
        return `# AI Acceptable Use Policy: ${scope}

## 1. Core Principles
We are committed to preparing you for a digital healthcare environment. You are encouraged to use Artificial Intelligence (AI) tools ethically to support your learning, subject to the following rules.

## 2. Permitted Uses
You **MAY** use AI tools for:
${policies.planning ? '*   **Planning**: Brainstorming ideas, outlining essays, and structuring arguments.' : ''}
${policies.editing ? '*   **Refinement**: Checking grammar, simplifying complex text, and translation.' : ''}
${policies.images ? '*   **Visuals**: Creating diagrams or images (must be declared).' : ''}
*   **Explanation**: Asking for simple explanations of complex clinical concepts.

## 3. Prohibited Uses
You **MUST NOT** use AI tools for:
${!policies.drafting ? '*   **Writing**: Generating entire essays or assessment submissions. The final work must be your own.' : ''}
*   **Patient Data**: Never input confidential patient information (names, NHS numbers) into AI. This is a severe professional misconduct issue.
*   **Fabrication**: Never use AI to generate references or sources. You must verify every citation.

## 4. Declaration
${policies.citation ? 'You must declare your use of AI. Include a statement at the end of your work detailing which tools you used and for what purpose.' : 'AI use must be cited according to our standard referencing guidelines.'}

## 5. Compliance
${policies.detection ? 'We reserve the use of AI detection software to screen submissions. Academic misconduct procedures will apply to unapproved use.' : 'We focus on process-based assessment. We may ask you to discuss your work in a Viva Voce to confirm your understanding.'}
    `;
    };

    return (
        <div className={styles.policyContainer}>
            <p className={styles.introText}>
                Draft a clear, fair AI policy for your students in seconds.
            </p>

            <div className={styles.questionGroup}>
                <label className={styles.groupLabel}>Scope Name</label>
                <input
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    placeholder="e.g. Year 1 Nursing / Module NU101"
                />
            </div>

            <div className={styles.questionGroup}>
                <label className={styles.groupLabel}>What is ALLOWED?</label>

                <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkboxInput} checked={policies.planning} onChange={() => toggle('planning')} />
                    Planning & Ideation (Brainstorming)
                </label>

                <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkboxInput} checked={policies.editing} onChange={() => toggle('editing')} />
                    Editing & Grammar Check (Grammarly/ChatGPT)
                </label>

                <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkboxInput} checked={policies.drafting} onChange={() => toggle('drafting')} />
                    Drafting Content (AI writes the paragraphs)
                </label>

                <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkboxInput} checked={policies.images} onChange={() => toggle('images')} />
                    Image Generation (Diagrams)
                </label>
            </div>

            <div className={styles.questionGroup}>
                <label className={styles.groupLabel}>Governance</label>

                <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkboxInput} checked={policies.detection} onChange={() => toggle('detection')} />
                    Will you use "AI Detection" software? (Not recommended)
                </label>
            </div>

            <div className={styles.outputBox}>
                <div className={styles.policyText}>
                    {generatePolicy()}
                </div>
                <button
                    className={clsx('button button--primary button--sm', styles.copyButton)}
                    onClick={() => navigator.clipboard.writeText(generatePolicy())}
                >
                    📋 Copy Policy
                </button>
            </div>
        </div>
    );
}

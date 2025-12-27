import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const TEMPLATES = {
    socratic: {
        name: 'The Socratic Tutor',
        description: 'Use this to test your own knowledge without getting the answers immediately.',
        fields: [
            { id: 'topic', label: 'Topic to Practice', placeholder: 'e.g., Medication Management' },
            { id: 'role', label: 'AI Role', placeholder: 'e.g., Clinical Examiner' },
        ],
        template: (data) => `Act as a ${data.role || 'Clinical Examiner'}. I want to practice my understanding of ${data.topic || '[TOPIC]'}. Do not give me the answers. Instead, ask me one challenging clinical question at a time and wait for my response before providing feedback and the next question.`,
    },
    simplifier: {
        name: 'The Concept Simplifier',
        description: 'Use this when a textbook definition isn\'t clicking.',
        fields: [
            { id: 'concept', label: 'Complex Concept', placeholder: 'e.g., Starling\'s Law' },
            { id: 'audience', label: 'Target Audience/Level', placeholder: 'e.g., a 10-year old OR a first-year student' },
        ],
        template: (data) => `I am struggling to understand ${data.concept || '[CONCEPT]'}. Explain this to me as if I am ${data.audience || 'a novice'}. Use a nursing-specific metaphor if possible. Avoid jargon and use a conversational tone.`,
    },
    simulator: {
        name: 'The Patient Simulator',
        description: 'Create a specific patient scenario for rehearsal.',
        fields: [
            { id: 'condition', label: 'Medical Condition', placeholder: 'e.g., Type 1 Diabetes with Hypoglycemia' },
            { id: 'mood', label: 'Patient Mood', placeholder: 'e.g., Anxious and confused' },
        ],
        template: (data) => `Act as a patient named Alex who has ${data.condition || '[CONDITION]'}. You are feeling ${data.mood || '[MOOD]'}. I will be the nurse. Start by describing your current symptoms in 1-2 sentences. Do not break character.`,
    }
};

export default function PromptPlayground() {
    const [activeTemplate, setActiveTemplate] = useState('socratic');
    const [formData, setFormData] = useState({});
    const [copied, setCopied] = useState(false);

    const currentTemplate = TEMPLATES[activeTemplate];
    const generatedPrompt = currentTemplate.template(formData);

    const handleInputChange = (fieldId, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="card shadow--md" style={{ border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', overflow: 'hidden' }}>
            <div className="card__header" style={{ backgroundColor: 'var(--ifm-color-emphasis-100)' }}>
                <h3>🧪 Live Prompt Playground</h3>
            </div>
            <div className="card__body">

                {/* Template Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Select a Strategy:</label>
                    <div className="button-group">
                        {Object.entries(TEMPLATES).map(([key, t]) => (
                            <button
                                key={key}
                                className={clsx('button button--sm', activeTemplate === key ? 'button--primary' : 'button--outline button--secondary')}
                                onClick={() => { setActiveTemplate(key); setFormData({}); }}
                                style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>
                    <p className="text--secondary" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        {currentTemplate.description}
                    </p>
                </div>

                <hr />

                {/* Input Fields */}
                <div className="row">
                    {currentTemplate.fields.map(field => (
                        <div key={field.id} className="col col--6" style={{ marginBottom: '1rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{field.label}</label>
                            <input
                                type="text"
                                className="button--block"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: '1px solid var(--ifm-color-emphasis-300)',
                                    marginTop: '0.25rem'
                                }}
                                placeholder={field.placeholder}
                                value={formData[field.id] || ''}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                {/* Output Area */}
                <div style={{ position: 'relative', marginTop: '1rem' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Your Generated Prompt:</label>
                    <pre style={{
                        backgroundColor: 'var(--ifm-background-surface-color)',
                        border: '1px solid var(--ifm-color-primary-light)',
                        borderRadius: '8px',
                        padding: '1rem',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace'
                    }}>
                        {generatedPrompt}
                    </pre>

                    <button
                        className={clsx('button', copied ? 'button--success' : 'button--primary')}
                        onClick={handleCopy}
                        style={{ position: 'absolute', top: '2.5rem', right: '1rem' }}
                    >
                        {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
                    </button>
                </div>

            </div>
            <div className="card__footer" style={{ backgroundColor: 'var(--ifm-color-emphasis-100)', fontSize: '0.85rem' }}>
                Paste this into ChatGPT, Gemini, or Claude to start learning.
            </div>
        </div>
    );
}

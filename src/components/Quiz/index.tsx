import React, { useState } from 'react';
import clsx from 'clsx';

export default function Quiz({ question, answers, correctIndex, explanation }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSelect = (index) => {
        if (showFeedback) return; // Prevent changing after answer
        setSelectedIndex(index);
        setShowFeedback(true);
    };

    const isCorrect = selectedIndex === correctIndex;

    return (
        <div className="card shadow--md" style={{ margin: '2rem 0', borderLeft: '4px solid var(--ifm-color-primary)' }}>
            <div className="card__header">
                <h3 style={{ margin: 0 }}>🧠 Knowledge Check</h3>
            </div>
            <div className="card__body">
                <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{question}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {answers.map((answer, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            className={clsx(
                                'button button--block',
                                !showFeedback && 'button--outline button--secondary',
                                showFeedback && index === correctIndex && 'button--success',
                                showFeedback && index === selectedIndex && index !== correctIndex && 'button--danger',
                                showFeedback && index !== correctIndex && index !== selectedIndex && 'button--ghost'
                            )}
                            disabled={showFeedback}
                            style={{ textAlign: 'left', padding: '1rem' }}
                        >
                            {String.fromCharCode(65 + index)}. {answer}
                        </button>
                    ))}
                </div>

                {showFeedback && (
                    <div className={clsx('alert', isCorrect ? 'alert--success' : 'alert--info')} style={{ marginTop: '1rem' }}>
                        <strong>{isCorrect ? 'Correct! 🎉' : 'Not quite. 🤔'}</strong>
                        <p style={{ margin: '0.5rem 0 0' }}>{explanation}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

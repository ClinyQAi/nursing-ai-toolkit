
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { PROMPT_DATA, CATEGORIES } from './data';

export default function PromptLibrary(): JSX.Element {
    const [activeCategory, setActiveCategory] = useState("All");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const filteredPrompts = activeCategory === "All"
        ? PROMPT_DATA
        : PROMPT_DATA.filter(p => p.category === activeCategory);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className={styles.libraryContainer}>
            <div className={styles.filterContainer}>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={clsx(styles.filterButton, activeCategory === cat && styles.filterButtonActive)}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.cardGrid}>
                {filteredPrompts.map(prompt => (
                    <div key={prompt.id} className={styles.promptCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{prompt.title}</h3>
                            <span className={styles.cardBadge}>{prompt.category}</span>
                        </div>
                        <p className={styles.cardDesc}>{prompt.description}</p>
                        <div className={styles.promptBox}>
                            {prompt.text}
                        </div>
                        <button
                            className={clsx('button button--sm', copiedId === prompt.id ? 'button--success' : 'button--secondary', styles.copyButton)}
                            onClick={() => handleCopy(prompt.text, prompt.id)}
                        >
                            {copiedId === prompt.id ? (
                                <>
                                    <span>✓ Copied!</span>
                                </>
                            ) : (
                                <>
                                    <span>📋 Copy Prompt</span>
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React, { useState, useMemo } from 'react';
import styles from './styles.module.css';
import nmcData from '../../data/nmc_standards.json';

// Simple fuzzy search helper (splitting terms)
const searchStandards = (query: string, data: any[]) => {
    if (!query) return data.slice(0, 20); // Return first 20 if no query
    const lowerQuery = query.toLowerCase();
    const terms = lowerQuery.split(' ').filter(t => t.length > 2);

    return data.filter(item => {
        const content = item.content.toLowerCase();
        // Match ALL terms (AND logic) for better precision
        return terms.every(term => content.includes(term));
    }).slice(0, 50); // Limit results
};

export default function NmcExplorer() {
    const [query, setQuery] = useState('');
    const [selectedStandard, setSelectedStandard] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    const results = useMemo(() => searchStandards(query, nmcData), [query]);

    const handleCopyPrompt = (standardText: string) => {
        const prompt = `Act as an expert Nurse Educator. I need to create a teaching resource that specifically addresses the following NMC Proficiency:\n\n"${standardText}"\n\nPlease suggest 3 creative interactive learning activities that would help nursing students demonstrate this proficiency.`;
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.explorerContainer}>
            <div className={styles.searchHeader}>
                <h2>🔎 NMC Standards Explorer</h2>
                <p>Search the NMC database and generate AI prompts to ground your teaching.</p>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search standards (e.g., 'sepsis', 'safeguarding', 'medicines')..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className={styles.resultsGrid}>
                {results.map((item) => (
                    <div key={item.id} className={styles.resultCard}>
                        <div className={styles.cardContent}>
                            {item.content}
                        </div>
                        <div className={styles.cardActions}>
                            <button
                                className={styles.actionButton}
                                onClick={() => handleCopyPrompt(item.content)}
                            >
                                ✨ Generate AI Prompt
                            </button>
                        </div>
                    </div>
                ))}
                {results.length === 0 && (
                    <div className={styles.noResults}>
                        No standards found. Try a different keyword.
                    </div>
                )}
            </div>

            {copied && (
                <div className={styles.toast}>
                    ✅ AI Prompt Copied to Clipboard!
                </div>
            )}
        </div>
    );
}

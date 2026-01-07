
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const TrustList = [
    {
        title: 'NMC Aligned',
        description: 'Standards of Proficiency',
    },
    {
        title: 'Evidence Based',
        description: 'Latest Research (2025)',
    },
    {
        title: 'Nurse Designed',
        description: 'By Educators, For Educators',
    },
    {
        title: 'UK Focused',
        description: 'Specific to UK Healthcare',
    },
];

export default function TrustBar(): JSX.Element {
    return (
        <section className={styles.trustSection}>
            <div className="container">
                <div className={styles.trustGrid}>
                    {TrustList.map((item, idx) => (
                        <div key={idx} className={styles.trustItem}>
                            <div className={styles.trustCheck}>✓</div>
                            <div className={styles.trustContent}>
                                <h4 className={styles.trustTitle}>{item.title}</h4>
                                <p className={styles.trustDesc}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

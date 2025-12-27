import React from 'react';
import styles from './styles.module.css';

const STEPS = [
    {
        number: '01',
        title: 'Explore',
        description: 'Browse case studies, prompts, and frameworks tailored for UK nursing education.',
        icon: '📚',
    },
    {
        number: '02',
        title: 'Adapt',
        description: 'Customize strategies to fit your module, student cohort, and NMC proficiencies.',
        icon: '✏️',
    },
    {
        number: '03',
        title: 'Teach',
        description: 'Integrate AI responsibly into your teaching, learning, and assessment workflows.',
        icon: '🎓',
    },
];

export default function HowItWorks() {
    return (
        <section className={styles.howItWorks}>
            <div className="container">
                <h2 className={styles.sectionTitle}>How It Works</h2>
                <p className={styles.sectionSubtitle}>
                    A simple 3-step framework to integrate AI into your nursing curriculum.
                </p>
                <div className={styles.stepsContainer}>
                    {STEPS.map((step, index) => (
                        <div key={index} className={styles.step}>
                            <div className={styles.stepIcon}>{step.icon}</div>
                            <div className={styles.stepNumber}>{step.number}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

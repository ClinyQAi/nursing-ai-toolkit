
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const QuoteList = [
    {
        quote: "Integrating AI literacy is no longer optional—it's a critical patient safety competency.",
        author: "Lincoln Gombedza",
        role: "Nurse Educator & Toolkit Creator"
    },
    {
        quote: "We must ensure future nurses are not just users of technology, but critical evaluators of it.",
        author: "Dr. Tünde Varga-Atkins",
        role: "Digital Education Researcher"
    },
    {
        quote: "Generative AI offers a unique opportunity to scale personalized learning in nursing education.",
        author: "Initial Pilot Feedback",
        role: "UK University Partner"
    }
];

export default function Testimonials(): JSX.Element {
    return (
        <section className={styles.testimonialSection}>
            <div className="container">
                <h2 className="text--center margin-bottom--lg">Community Voices</h2>
                <div className="row">
                    {QuoteList.map((item, idx) => (
                        <div key={idx} className={clsx('col col--4')}>
                            <div className={styles.testimonialCard}>
                                <p className={styles.quoteText}>"{item.quote}"</p>
                                <div className={styles.authorInfo}>
                                    <div className={styles.authorName}>{item.author}</div>
                                    <div className={styles.authorRole}>{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

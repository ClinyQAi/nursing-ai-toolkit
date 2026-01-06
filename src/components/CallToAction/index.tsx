import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import clsx from 'clsx';

export default function CallToAction(): JSX.Element {
    return (
        <section className={styles.ctaSection}>
            <div className="container">
                <div className={styles.ctaContainer}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>
                            Ready to Transform Nursing Education?
                        </h2>
                        <p className={styles.description}>
                            Join the movement of Nurse Citizen Developers integrating ethical, multimodal AI into UK curricula. Start your journey with the toolkit today.
                        </p>
                        <div className={styles.buttons}>
                            <Link
                                className={clsx('button button--lg', styles.buttonPrimary)}
                                to="/docs/intro">
                                Start Reading
                            </Link>
                            <Link
                                className={clsx('button button--lg', styles.buttonSecondary)}
                                href="https://github.com/ClinyQAi/nursing-ai-toolkit">
                                Star on GitHub
                            </Link>
                        </div>
                    </div>
                    <div className={styles.decoration}>
                        {/* Decorative elements handled in CSS */}
                    </div>
                </div>
            </div>
        </section>
    );
}

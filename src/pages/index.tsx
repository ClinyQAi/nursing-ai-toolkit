import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HowItWorks from '@site/src/components/HowItWorks';
import BackToTop from '@site/src/components/BackToTop';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>
            Empowering UK Nursing Educators with practical, NMC-aligned guidance for integrating AI into teaching, learning, and assessment.
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.heroButtonPrimary)}
              to="/docs/getting-started">
              Get Started &rarr;
            </Link>
            <Link
              className={clsx('button button--outline button--lg', styles.heroButtonSecondary)}
              to="/docs/case-studies">
              Case Studies
            </Link>
          </div>
        </div>
        <div className={styles.heroGraphic}>
          <img
            src={require('@site/static/img/premium_teaching.png').default}
            alt="AI in Nursing Education"
            className={styles.heroImage}
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="AI in Nursing Education: A Multimodal Learning Toolkit for UK Educators"
      description="A practical guide for nurse educators to integrate Generative AI into teaching, learning, and assessment. Aligned with NMC Standards.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HowItWorks />
      </main>
      <BackToTop />
    </Layout>
  );
}

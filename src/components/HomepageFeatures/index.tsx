import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Teaching Delivery',
    image: require('@site/static/img/premium_teaching.png').default,
    description: (
      <>
        Strategies for educators to deliver engaging, interactive sessions using AI.
        From Socratic tutoring to roleplay simulations.
      </>
    ),
    link: '/-AI-Educator-Toolkit/docs/teaching/',
  },
  {
    title: 'Self-Regulated Learning',
    image: require('@site/static/img/premium_learning.png').default,
    description: (
      <>
        Empowering students to use AI as a "24/7 Personal Tutor" for adaptive
        study, self-quizzing, and concept simplification.
      </>
    ),
    link: '/-AI-Educator-Toolkit/docs/learning/',
  },
  {
    title: 'AI-Resilient Assessment',
    image: require('@site/static/img/premium_assessment.png').default,
    description: (
      <>
        Moving from "Policing" to "Designing". Explore Viva Voce, Video Vlogs,
        and Process-focused assessments that measure authentic skill.
      </>
    ),
    link: '/-AI-Educator-Toolkit/docs/assessment/',
  },
];

function Feature({ title, image, description, link }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <img src={image} className={styles.featureSvg} alt={title} />
        </div>
        <div className="padding-horiz--md">
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureDescription}>{description}</p>
          <Link
            className={clsx('button button--primary button--sm', styles.featureButton)}
            to={link}>
            Explore &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

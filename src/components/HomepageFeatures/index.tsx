import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Teaching Delivery',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Strategies for educators to deliver engaging, interactive sessions using AI.
        From Socratic tutoring to roleplay simulations.
      </>
    ),
    link: '/AI-Educator-Toolkit/docs/teaching/',
  },
  {
    title: 'Self-Regulated Learning',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Empowering students to use AI as a "24/7 Personal Tutor" for adaptive
        study, self-quizzing, and concept simplification.
      </>
    ),
    link: '/AI-Educator-Toolkit/docs/learning/',
  },
  {
    title: 'AI-Resilient Assessment',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Moving from "Policing" to "Designing". Explore Viva Voce, Video Vlogs,
        and Process-focused assessments that measure authentic skill.
      </>
    ),
    link: '/AI-Educator-Toolkit/docs/assessment/',
  },
];

function Feature({ title, Svg, description, link }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <a href={link} className="button button--secondary button--sm">Explore &rarr;</a>
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

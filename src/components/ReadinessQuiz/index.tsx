
import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const QUESTIONS = [
    {
        id: 'policy',
        text: "Does your institution have a clear AI policy?",
        options: [
            { text: "Yes ✅", next: 'role' },
            { text: "No / Unsure ❌", next: 'policy_warning' }
        ]
    },
    {
        id: 'role',
        text: "What is your primary role?",
        options: [
            { text: "Educator 🎓", next: 'exp_educator' },
            { text: "Student 📚", next: 'exp_student' },
            { text: "Leader 🏛️", next: 'leader_result' }
        ]
    },
    {
        id: 'exp_educator',
        text: "How confident are you with Generative AI?",
        options: [
            { text: "Newbie 🌱", next: 'edu_newbie' },
            { text: "Confident 🚀", next: 'edu_pro' }
        ]
    },
    {
        id: 'exp_student',
        text: "What year are you in?",
        options: [
            { text: "Year 1", next: 'stu_start' },
            { text: "Year 2/3", next: 'stu_adv' }
        ]
    }
];

const RESULTS = {
    policy_warning: {
        title: "⚠️ Safety First",
        desc: "Before integrating AI, you must check your local guidance. Start here:",
        links: [{ text: "Institutional Framework", url: "/docs/ai-literacy/institutional-framework" }]
    },
    leader_result: {
        title: "🏛️ Strategic Leadership",
        desc: "Focus on governance and procurement.",
        links: [
            { text: "Institutional Framework", url: "/docs/ai-literacy/institutional-framework" },
            { text: "Choosing Platforms", url: "/docs/choosing-platforms" }
        ]
    },
    edu_newbie: {
        title: "🎓 Educator Foundations",
        desc: "Build your confidence with the basics.",
        links: [
            { text: "What is Generative AI?", url: "/docs/what-is-generative-ai" },
            { text: "Responsible Use Checklist", url: "/docs/responsible-use/checklist" }
        ]
    },
    edu_pro: {
        title: "🚀 Advanced Integration",
        desc: "Ready to design curricula and assessments?",
        links: [
            { text: "Design Framework", url: "/docs/design-framework" },
            { text: "AI Risk Calculator", url: "/docs/assessment/risk-calculator" }
        ]
    },
    stu_start: {
        title: "📚 Year 1: Foundations",
        desc: "Focus on understanding AI and basic literacy.",
        links: [
            { text: "What is Generative AI?", url: "/docs/what-is-generative-ai" },
            { text: "Individual Competencies", url: "/docs/ai-literacy/individual-competencies" }
        ]
    },
    stu_adv: {
        title: "💡 Year 2/3: Application",
        desc: "Use AI for revision, critique, and preparation.",
        links: [
            { text: "Prompt Library", url: "/docs/learning/nursing-examples" },
            { text: "Just-in-Time Support", url: "/docs/learning/just-in-time-support" }
        ]
    }
};

export default function ReadinessQuiz(): JSX.Element {
    const [currentStep, setCurrentStep] = useState('policy');
    const [history, setHistory] = useState<string[]>([]);

    const handleOption = (next: string) => {
        setHistory([...history, currentStep]);
        setCurrentStep(next);
    };

    const restart = () => {
        setCurrentStep('policy');
        setHistory([]);
    };

    const isResult = !!RESULTS[currentStep];
    const question = QUESTIONS.find(q => q.id === currentStep);
    const result = RESULTS[currentStep];

    return (
        <div className={styles.quizContainer}>
            {!isResult && question && (
                <div className="animate__animated animate__fadeIn">
                    <h3 className={styles.quizQuestion}>{question.text}</h3>
                    <div className={styles.optionsGrid}>
                        {question.options.map((opt, idx) => (
                            <button
                                key={idx}
                                className={styles.optionButton}
                                onClick={() => handleOption(opt.next)}
                            >
                                {opt.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isResult && result && (
                <div className={styles.resultBox}>
                    <h3 className={styles.resultTitle}>{result.title}</h3>
                    <p className={styles.resultDesc}>{result.desc}</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        {result.links.map((link, idx) => (
                            <Link key={idx} className="button button--primary button--lg" to={link.url}>
                                {link.text}
                            </Link>
                        ))}
                    </div>
                    <button className={styles.restartButton} onClick={restart}>
                        Start Over
                    </button>
                </div>
            )}
        </div>
    );
}

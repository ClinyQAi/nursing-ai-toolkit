import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type ScenarioPhase = 'presentation' | 'history' | 'examination' | 'investigations' | 'management';
type PatientType = 'chest-pain' | 'breathlessness' | 'fever' | 'confusion' | 'custom';

interface ScenarioConfig {
    patientType: PatientType;
    customPrompt: string;
    ageRange: string;
    complexity: 'simple' | 'moderate' | 'complex';
}

export default function VirtualPatientFactory(): JSX.Element {
    const [mode, setMode] = useState<'generate' | 'critique'>('generate');
    const [config, setConfig] = useState<ScenarioConfig>({
        patientType: 'chest-pain',
        customPrompt: '',
        ageRange: '65-80',
        complexity: 'moderate'
    });
    const [selectedPhase, setSelectedPhase] = useState<ScenarioPhase>('presentation');
    const [generatedContent, setGeneratedContent] = useState('');
    const [studentAnswer, setStudentAnswer] = useState('');
    const [critique, setCritique] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const phases: { id: ScenarioPhase; label: string; icon: string }[] = [
        { id: 'presentation', label: 'Presentation', icon: '🚨' },
        { id: 'history', label: 'History', icon: '📋' },
        { id: 'examination', label: 'Examination', icon: '🔍' },
        { id: 'investigations', label: 'Investigations', icon: '🧪' },
        { id: 'management', label: 'Management', icon: '💊' }
    ];

    const patientTypes = [
        { id: 'chest-pain', label: 'Chest Pain', emoji: '💔' },
        { id: 'breathlessness', label: 'Breathlessness', emoji: '🫁' },
        { id: 'fever', label: 'Fever', emoji: '🌡️' },
        { id: 'confusion', label: 'Confusion', emoji: '🧠' },
        { id: 'custom', label: 'Custom Scenario', emoji: '✏️' }
    ];

    const generateScenarioPrompt = (): string => {
        const phaseDescriptions = {
            presentation: 'the initial presentation and chief complaint',
            history: 'a detailed clinical history including PMH, medications, social history',
            examination: 'physical examination findings with vital signs',
            investigations: 'relevant investigation results (bloods, ECG, imaging)',
            management: 'appropriate management plan and nursing interventions'
        };

        const patientContext = config.patientType === 'custom'
            ? config.customPrompt
            : `a ${config.ageRange} year old patient presenting with ${config.patientType.replace('-', ' ')}`;

        return `You are a clinical educator. Generate ${phaseDescriptions[selectedPhase]} for ${patientContext}.

Complexity level: ${config.complexity}

Format your response as clear, concise clinical documentation. Include specific clinical details that a nursing student would need to formulate a care plan. For vital signs, use realistic values. For investigations, provide actual results (e.g., "Troponin I: 450 ng/L").`;
    };

    const generateCritiquePrompt = (studentResponse: string): string => {
        return `You are a senior nurse educator reviewing a student's clinical reasoning.

**Clinical Scenario:**
${generatedContent}

**Student's Answer:**
${studentResponse}

**Task:** Provide constructive feedback on the student's response. Identify:
1. What they got RIGHT (be specific)
2. What they MISSED (critical omissions)
3. One piece of advice to improve their clinical reasoning

Keep your feedback concise, supportive, and focused on learning. Use bullet points.`;
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        const prompt = generateScenarioPrompt();

        // Simulate AI generation (in real implementation, this would call an AI API)
        setTimeout(() => {
            if (selectedPhase === 'presentation') {
                setGeneratedContent(`**Chief Complaint:** 62-year-old male presents to A&E with sudden onset central chest pain, radiating to left arm.

**Vital Signs:**
- BP: 165/95 mmHg
- HR: 102 bpm (regular)
- RR: 22 breaths/min
- SpO2: 94% on room air
- Temp: 37.1°C

**Initial Observation:** Patient appears anxious, diaphoretic, clutching chest. Pain started 45 minutes ago while mowing lawn. Describes pain as "crushing, like an elephant sitting on my chest" - 8/10 severity.`);
            } else if (selectedPhase === 'investigations') {
                setGeneratedContent(`**ECG Findings:**
- ST elevation 2mm in leads II, III, aVF
- Reciprocal ST depression in V1-V3
- Sinus tachycardia at 105 bpm

**Cardiac Markers:**
- Troponin I: 450 ng/L (Normal: <14 ng/L)
- CK-MB: Elevated

**Bloods:**
- Glucose: 8.2 mmol/L
- K+: 4.1 mmol/L
- Creatinine: 95 μmol/L

**Interpretation:** ECG shows acute inferior STEMI. Immediate cardiology referral required.`);
            } else {
                setGeneratedContent(`[Generated ${selectedPhase} content would appear here based on the AI model's response]`);
            }
            setIsGenerating(false);
        }, 1500);
    };

    const handleCritique = () => {
        if (!studentAnswer.trim()) return;

        setIsGenerating(true);
        const prompt = generateCritiquePrompt(studentAnswer);

        // Simulate AI critique
        setTimeout(() => {
            setCritique(`**✅ What you got RIGHT:**
- You correctly identified this as a cardiac event (likely MI)
- You noted the importance of monitoring vital signs
- You mentioned the need for urgent medical review

**⚠️ What you MISSED:**
- **Critical**: You didn't mention the specific ECG pattern (ST elevation in inferior leads = STEMI, not NSTEMI)
- You didn't discuss the need for immediate **percutaneous coronary intervention (PCI)** or thrombolysis
- No mention of administering aspirin, GTN, or morphine as per ACS protocol

**💡 Advice:**
When you see "chest pain + ST elevation", your brain should immediately think "**Door-to-Balloon time**". The first 60 minutes are critical. Always state the specific acute intervention (PCI/thrombolysis), not just "refer to cardiology".`);
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className={styles.factoryContainer}>
            <div className={styles.modeSelector}>
                <button
                    className={clsx(styles.modeButton, mode === 'generate' && styles.modeButtonActive)}
                    onClick={() => setMode('generate')}
                >
                    🏭 Generate Scenario
                </button>
                <button
                    className={clsx(styles.modeButton, mode === 'critique' && styles.modeButtonActive)}
                    onClick={() => setMode('critique')}
                >
                    🎓 Critique Student Answer
                </button>
            </div>

            {mode === 'generate' ? (
                <div className={styles.generatorSection}>
                    <h3>Configure Your Virtual Patient</h3>

                    <div className={styles.configGrid}>
                        <div className={styles.configGroup}>
                            <label>Patient Scenario</label>
                            <div className={styles.patientTypeGrid}>
                                {patientTypes.map(type => (
                                    <button
                                        key={type.id}
                                        className={clsx(
                                            styles.patientTypeButton,
                                            config.patientType === type.id && styles.patientTypeButtonActive
                                        )}
                                        onClick={() => setConfig({ ...config, patientType: type.id as PatientType })}
                                    >
                                        <span className={styles.emoji}>{type.emoji}</span>
                                        <span>{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {config.patientType === 'custom' && (
                            <div className={styles.configGroup}>
                                <label>Custom Scenario Description</label>
                                <input
                                    type="text"
                                    className={styles.customInput}
                                    placeholder="e.g., 'a 45yo nurse with sudden headache and photophobia'"
                                    value={config.customPrompt}
                                    onChange={(e) => setConfig({ ...config, customPrompt: e.target.value })}
                                />
                            </div>
                        )}

                        <div className={styles.configGroup}>
                            <label>Age Range</label>
                            <select
                                className={styles.select}
                                value={config.ageRange}
                                onChange={(e) => setConfig({ ...config, ageRange: e.target.value })}
                            >
                                <option value="18-30">Young Adult (18-30)</option>
                                <option value="30-50">Adult (30-50)</option>
                                <option value="50-65">Middle Age (50-65)</option>
                                <option value="65-80">Older Adult (65-80)</option>
                                <option value="80+">Elderly (80+)</option>
                            </select>
                        </div>

                        <div className={styles.configGroup}>
                            <label>Complexity</label>
                            <select
                                className={styles.select}
                                value={config.complexity}
                                onChange={(e) => setConfig({ ...config, complexity: e.target.value as any })}
                            >
                                <option value="simple">Simple (Year 1)</option>
                                <option value="moderate">Moderate (Year 2)</option>
                                <option value="complex">Complex (Year 3+)</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.phaseSelector}>
                        <label>Select Phase to Generate:</label>
                        <div className={styles.phaseButtons}>
                            {phases.map(phase => (
                                <button
                                    key={phase.id}
                                    className={clsx(
                                        styles.phaseButton,
                                        selectedPhase === phase.id && styles.phaseButtonActive
                                    )}
                                    onClick={() => setSelectedPhase(phase.id)}
                                >
                                    {phase.icon} {phase.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        className={clsx('button button--primary button--lg', styles.generateButton)}
                        onClick={handleGenerate}
                        disabled={isGenerating || (config.patientType === 'custom' && !config.customPrompt)}
                    >
                        {isGenerating ? '🔄 Generating...' : '✨ Generate Scenario'}
                    </button>

                    {generatedContent && (
                        <div className={styles.outputBox}>
                            <div className={styles.outputHeader}>
                                <span>📄 Generated Content ({selectedPhase})</span>
                                <button
                                    className="button button--sm button--secondary"
                                    onClick={() => navigator.clipboard.writeText(generatedContent)}
                                >
                                    📋 Copy
                                </button>
                            </div>
                            <div className={styles.outputContent}>
                                {generatedContent}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.critiqueSection}>
                    <h3>Student Answer Critique</h3>
                    <p className={styles.critiqueInstructions}>
                        Paste the scenario context below, then have the student provide their answer for AI-powered feedback.
                    </p>

                    <div className={styles.configGroup}>
                        <label>Clinical Scenario (Context)</label>
                        <textarea
                            className={styles.textarea}
                            rows={6}
                            placeholder="Paste the clinical scenario here (e.g., the presentation, history, and investigation results)"
                            value={generatedContent}
                            onChange={(e) => setGeneratedContent(e.target.value)}
                        />
                    </div>

                    <div className={styles.configGroup}>
                        <label>Student's Answer</label>
                        <textarea
                            className={styles.textarea}
                            rows={6}
                            placeholder="Student writes their differential diagnosis or management plan here..."
                            value={studentAnswer}
                            onChange={(e) => setStudentAnswer(e.target.value)}
                        />
                    </div>

                    <button
                        className={clsx('button button--primary button--lg', styles.generateButton)}
                        onClick={handleCritique}
                        disabled={isGenerating || !studentAnswer.trim() || !generatedContent.trim()}
                    >
                        {isGenerating ? '🤔 Analyzing...' : '🎯 Get AI Critique'}
                    </button>

                    {critique && (
                        <div className={styles.critiqueBox}>
                            <div className={styles.outputHeader}>
                                <span>🎓 Educator Feedback</span>
                            </div>
                            <div className={styles.critiqueContent}>
                                {critique}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.disclaimer}>
                <strong>⚠️ Important:</strong> This tool generates simulated scenarios using AI prompts. All content is fictional and for educational purposes only. Always verify clinical information against current evidence-based guidelines.
            </div>
        </div>
    );
}

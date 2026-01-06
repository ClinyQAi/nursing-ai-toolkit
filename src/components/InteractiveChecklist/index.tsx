
import React, { useState } from 'react';
import clsx from 'clsx';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, CheckBox, AlignmentType } from 'docx';
import styles from './styles.module.css';
import { CHECKLIST_DATA, ChecklistCategory } from './data';

interface InteractiveChecklistProps {
    data?: ChecklistCategory[];
    fileName?: string;
}


export default function InteractiveChecklist({
    data = CHECKLIST_DATA,
    fileName = "Checklist_Report"
}: InteractiveChecklistProps): JSX.Element {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    // Store values as number (for ratings) or boolean (for checkboxes)
    // We can use a union type, but using number|boolean or just generic 'any' state is easier for mixed usage.
    // Actually, let's separate them or use a discriminated union if possible, but simplest is Record<string, number | boolean>
    const [values, setValues] = useState<Record<string, number | boolean>>({});

    const activeCategory = data[activeCategoryIndex];
    const isRatingMode = activeCategory.type === 'rating';

    const handleToggle = (id: string) => {
        setValues(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleRating = (id: string, rating: number) => {
        setValues(prev => ({
            ...prev,
            [id]: rating
        }));
    }

    const calculateProgress = () => {
        const categoryGroupItems = activeCategory.groups.flatMap(g => g.items);
        const total = categoryGroupItems.length;

        if (isRatingMode) {
            // Calculate filled items
            const filled = categoryGroupItems.filter(item => typeof values[item.id] === 'number').length;
            return Math.round((filled / total) * 100);
        } else {
            const checked = categoryGroupItems.filter(item => values[item.id] === true).length;
            return Math.round((checked / total) * 100);
        }
    };

    const calculateScore = () => {
        if (!isRatingMode) return 0;
        const categoryGroupItems = activeCategory.groups.flatMap(g => g.items);
        let score = 0;
        categoryGroupItems.forEach(item => {
            const val = values[item.id];
            if (typeof val === 'number') {
                score += val;
            }
        });
        return score;
    };

    const getCompetencyLevel = (score: number) => {
        if (score <= 32) return "Developing - Focus on foundation skills";
        if (score <= 48) return "Competent - Continue building expertise";
        if (score <= 64) return "Proficient - Ready for advanced integration";
        return "Expert - Mentor others and lead initiatives";
    };

    const generateWordDocument = async () => {
        const children = [];
        const score = calculateScore();
        const competencyLevel = getCompetencyLevel(score);

        // Title
        children.push(
            new Paragraph({
                text: `Report: ${activeCategory.title}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }),
        );

        // Date
        children.push(
            new Paragraph({
                text: `Date: ${new Date().toLocaleDateString()}`,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }),
        );

        // Score if rating mode
        if (isRatingMode) {
            children.push(
                new Paragraph({
                    text: `Total Score: ${score}`,
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: `Competency Level: ${competencyLevel}`,
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({ text: "" })
            );
        }

        // Groups
        activeCategory.groups.forEach(group => {
            children.push(
                new Paragraph({
                    text: group.title,
                    heading: HeadingLevel.HEADING_2,
                })
            );

            group.items.forEach(item => {
                const value = values[item.id];
                let textPrefix = "";

                if (isRatingMode) {
                    textPrefix = `[${typeof value === 'number' ? value : '-'}/5] `;
                } else {
                    textPrefix = value === true ? "☒ " : "☐ ";
                }

                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: textPrefix,
                                font: isRatingMode ? "Calibri" : "Segoe UI Symbol"
                            }),
                            new TextRun({
                                text: item.text,
                            })
                        ],
                        indent: { left: 720 },
                    })
                );
            });

            children.push(new Paragraph({ text: "" }));
        });

        const doc = new Document({
            sections: [{
                properties: {},
                children: children,
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${fileName}_${activeCategory.title.replace(/\s+/g, '_')}.docx`);
    };

    return (
        <div className={styles.checklistContainer}>
            {/* Category Tabs */}
            <div className={styles.categoryTabs}>
                {data.map((cat, idx) => (
                    <button
                        key={idx}
                        className={clsx(styles.tabButton, idx === activeCategoryIndex && styles.tabButtonActive)}
                        onClick={() => setActiveCategoryIndex(idx)}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            {/* Progress Bar */}
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBarLabel}>
                    <span>Progress</span>
                    <span>{calculateProgress()}%</span>
                </div>
                <div className={styles.progressBarTrack}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${calculateProgress()}%` }}
                    />
                </div>
            </div>

            {/* Score Display (Rating Mode Only) */}
            {isRatingMode && (
                <div className={styles.scoreDisplay}>
                    <span className={styles.scoreValue}>{calculateScore()} / 80</span>
                    <span className={styles.scoreLabel}>{getCompetencyLevel(calculateScore())}</span>
                </div>
            )}

            {/* Checklist Content */}
            <div className={styles.checklistContent}>
                {activeCategory.groups.map((group, gIdx) => (
                    <div key={gIdx} className={styles.checklistGroup}>
                        <h3 className={styles.groupTitle}>{group.title}</h3>
                        {group.items.map((item) => (
                            isRatingMode ? (
                                // Rating Mode (1-5 Buttons)
                                <div key={item.id} className={styles.ratingLabel}>
                                    <span className={styles.itemText}>{item.text}</span>
                                    <div className={styles.ratingContainer}>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                className={clsx(
                                                    styles.ratingButton,
                                                    values[item.id] === rating && styles.ratingButtonSelected
                                                )}
                                                onClick={() => handleRating(item.id, rating)}
                                            >
                                                {rating}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // Checkbox Mode
                                <label key={item.id} className={styles.itemLabel}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                        checked={values[item.id] === true}
                                        onChange={() => handleToggle(item.id)}
                                    />
                                    <span className={clsx(styles.itemText, values[item.id] === true && styles.itemTextChecked)}>
                                        {item.text}
                                    </span>
                                </label>
                            )
                        ))}
                    </div>
                ))}
            </div>

            {/* Export Section */}
            <div className={styles.exportSection}>
                <button
                    className={clsx('button button--primary button--lg', styles.exportButton)}
                    onClick={generateWordDocument}
                >
                    📄 Export to Word
                </button>
            </div>
        </div>
    );
}

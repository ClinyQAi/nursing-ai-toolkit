
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
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const activeCategory = data[activeCategoryIndex];

    const handleToggle = (id: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const calculateProgress = () => {
        const categoryGroupItems = activeCategory.groups.flatMap(g => g.items);
        const total = categoryGroupItems.length;
        const checked = categoryGroupItems.filter(item => checkedItems[item.id]).length;
        return Math.round((checked / total) * 100);
    };

    const generateWordDocument = async () => {
        // Generate document just for the active category (or all? usually specific is better)
        // Let's do the active category as that's what the user is focused on.

        const children = [];

        // Title
        children.push(
            new Paragraph({
                text: `Checklist Report: ${activeCategory.title}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }), // Spacing
        );

        // Date
        children.push(
            new Paragraph({
                text: `Date: ${new Date().toLocaleDateString()}`,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }),
        );

        // Groups
        activeCategory.groups.forEach(group => {
            children.push(
                new Paragraph({
                    text: group.title,
                    heading: HeadingLevel.HEADING_2,
                })
            );

            group.items.forEach(item => {
                const isChecked = !!checkedItems[item.id];
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: isChecked ? "☒ " : "☐ ", // Using visual unicode chars for better compatibility usually
                                font: "Segoe UI Symbol"
                            }),
                            new TextRun({
                                text: item.text,
                            })
                        ],
                        indent: { left: 720 }, // Indent
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

            {/* Checklist Content */}
            <div className={styles.checklistContent}>
                {activeCategory.groups.map((group, gIdx) => (
                    <div key={gIdx} className={styles.checklistGroup}>
                        <h3 className={styles.groupTitle}>{group.title}</h3>
                        {group.items.map((item) => (
                            <label key={item.id} className={styles.itemLabel}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={!!checkedItems[item.id]}
                                    onChange={() => handleToggle(item.id)}
                                />
                                <span className={clsx(styles.itemText, checkedItems[item.id] && styles.itemTextChecked)}>
                                    {item.text}
                                </span>
                            </label>
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

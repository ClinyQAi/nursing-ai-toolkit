import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'what-is-generative-ai',
    {
      type: 'category',
      label: 'Responsible Use',
      items: [
        'responsible-use/index',
        'responsible-use/cost-individual',
        'responsible-use/cost-environment',
        'responsible-use/cost-knowledge',
        'responsible-use/cost-jobs',
        'responsible-use/implications',
        'responsible-use/checklist',
      ],
    },
    {
      type: 'category',
      label: 'AI Literacy',
      items: [
        'ai-literacy/index',
      ],
    },
    {
      type: 'category',
      label: 'Teaching with AI',
      items: [
        'teaching/index',
        'teaching/creating-visual-content',
        'teaching/teaching-delivery',
        'teaching/collaborative-learning',
        'teaching/ai-literacy-activities',
        'teaching/benefits',
        'teaching/practical-tips',
        'teaching/nursing-examples',
      ],
    },
    {
      type: 'category',
      label: 'Learning with AI',
      items: [
        'learning/index',
        'learning/personalised-learning',
        'learning/just-in-time-support',
        'learning/multimodal-creation',
        'learning/nursing-examples',
      ],
    },
    {
      type: 'category',
      label: 'Assessment with AI',
      items: [
        'assessment/index',
        'assessment/multimodal-assessment',
        'assessment/ai-enabled-feedback',
        'assessment/nursing-examples',
      ],
    },
    {
      type: 'category',
      label: 'Case Studies',
      items: [
        {
          type: 'category',
          label: 'Nursing Scenarios',
          items: [
            'case-studies/patient-scenarios/index',
            'case-studies/patient-scenarios/history-taking',
            'case-studies/patient-scenarios/deteriorating-patient',
          ],
        },
        {
          type: 'category',
          label: 'Clinical Skills',
          items: [
            'case-studies/clinical-skills/index',
            'case-studies/clinical-skills/ecg-interpretation',
            'case-studies/clinical-skills/medication-mechanism',
          ],
        },
        {
          type: 'category',
          label: 'Communication',
          items: [
            'case-studies/person-centred-care/index',
            'case-studies/person-centred-care/difficult-conversations',
            'case-studies/person-centred-care/language-refinement',
          ],
        },
        {
          type: 'category',
          label: 'Original Adaptations',
          items: [
            'case-studies/original-adaptations/index',
            'case-studies/original-adaptations/visual-metaphors',
            'case-studies/nursing/index',
            'case-studies/nursing/wound-care-visualization',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/index',
        'resources/genai-tools',
        'resources/nursing-resources',
        'resources/academic-papers',
      ],
    },
    'license',
  ],
};

export default sidebars;

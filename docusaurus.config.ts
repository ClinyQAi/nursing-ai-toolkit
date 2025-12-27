import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AI Educator Toolkit',
  tagline: 'Multimodal Learning with Generative AI for UK Nursing Education',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://clinyqai.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/-AI-Educator-Toolkit/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ClinyQAi', // Usually your GitHub org/user name.
  projectName: '-AI-Educator-Toolkit', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'text/javascript',
      },
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });
      `,
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ClinyQAi/-AI-Educator-Toolkit/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/ClinyQAi/AI-Educator-Toolkit/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-91YZDP5SRZ', // Replace with your Google Analytics 4 Measurement ID
          anonymizeIP: true,
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-preview.png',
    metadata: [
      { name: 'keywords', content: 'nursing, education, AI, generative AI, UK, NMC, healthcare, multimodal learning, digital literacy' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ClinyQAi' },
      { name: 'og:type', content: 'website' },
      { name: 'og:image', content: 'https://clinyqai.github.io/-AI-Educator-Toolkit/img/social-preview.png' },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI Educator Toolkit',
      logo: {
        alt: 'AI Educator Toolkit Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Guide',
        },

        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/ClinyQAi/-AI-Educator-Toolkit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Guide Sections',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Teaching with AI',
              to: '/docs/teaching',
            },
            {
              label: 'Case Studies',
              to: '/docs/case-studies',
            },
          ],
        },
        {
          title: 'Nursing Resources',
          items: [
            {
              label: 'NMC Standards',
              href: 'https://www.nmc.org.uk/',
            },
            {
              label: 'FONS',
              href: 'https://www.fons.org/',
            },
            {
              label: 'Open Nursing Core IG',
              href: 'https://opennursingcoreig.com/',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ClinyQAi/-AI-Educator-Toolkit',
            },
            {
              label: 'LinkedIn (Lincoln Gombedza)',
              href: 'https://www.linkedin.com/in/lincolngombedza/',
            },
            {
              label: 'Privacy Policy',
              to: '/docs/privacy-policy',
            },
          ],
        },
      ],
      copyright: `Original work: "Educators' guide to multimodal learning and Generative AI" by Tünde Varga-Atkins, Samuel Saunders, et al. (2024/25) - <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a><br>Adapted for UK Nursing Education by <a href="https://www.linkedin.com/in/lincolngombedza/" target="_blank">Lincoln Gombedza, RN (LD)</a> © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

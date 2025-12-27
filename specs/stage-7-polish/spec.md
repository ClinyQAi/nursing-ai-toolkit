# Specification: Stage 7 (Final Polish & Deployment)

## 1. Overview
The final stage is to replace the generic Docusaurus scaffolding with a professional, UK-Nursing-specific landing page and prepare the repository for public launch on GitHub Pages.

## 2. User Stories
*   **As a visitor**, I want to immediately understand that this is for *UK Nursing Education* (not general usage).
*   **As a developer**, I want the site to auto-deploy to GitHub Pages whenever I push to the `main` branch.

## 3. Components to Build

### A. Homepage (`src/pages/index.tsx`)
*   **Hero Section**:
    *   Title: "AI Educator Toolkit"
    *   Subtitle: "A Practical Guide for UK Nursing Education"
    *   CTA Button: "Start the Guide" (links to `/docs/intro`).
*   **Features Grid**:
    *   **Teaching**: "Deliver engaging sessions"
    *   **Learning**: "Empower self-regulated study"
    *   **Assessment**: "Design cheat-proof assignments"
*   **Trust Signals**: Mention compatibility with NMC Standards and FONS principles.

### B. Deployment Configuration
*   **`docusaurus.config.ts`**: Update `url`, `baseUrl`, `organizationName`, `projectName`.
*   **GitHub Actions**: Create `.github/workflows/deploy.yml` for automated deployment.

## 4. Design Requirements (per Constitution)
*   **Aesthetics**: Clean, clinical but warm (Blue/White palette).
*   **Accessibility**: All buttons must have aria-labels.

## 5. Acceptance Criteria
*   [ ] Default "Dinosaurs" homepage replaced.
*   [ ] `npm run build` passes without errors.
*   [ ] GitHub Actions workflow file exists.

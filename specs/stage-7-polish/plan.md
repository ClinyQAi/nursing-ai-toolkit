# Implementation Plan: Stage 7 (Polish & Deploy)

## 1. Homepage (`src/pages/index.tsx`)
We will rewrite the existing default file.

**Structure**:
```tsx
<Layout description="UK Nursing AI Guide">
  <HomepageHeader />
  <main>
    <HomepageFeatures /> (Refactored to show Teaching/Learning/Assessment)
  </main>
</Layout>
```

## 2. Deployment Config
*   **Repo**: `AI-Educator-Toolkit`
*   **Org**: `LincolnGombedza` (Assumed, or user's username).
*   **Branch**: `gh-pages` (target).

## 3. Workflow
1.  **Configure**: Edit `docusaurus.config.ts`.
2.  **Workflow**: Create `.github/workflows/deploy.yml`.
3.  **Frontend**: Rewrite `src/components/HomepageFeatures/index.tsx` and `src/pages/index.tsx`.
4.  **Verify**: Run `npm run build` locally to ensure no broken links.

## 4. Verification
*   Localhost homepage looks new.
*   Build command succeeds.

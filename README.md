# Vikas Yadav · SuperIntelligence Quality Assurance

A static site for a public testing desk: a home page that starts from the task, a blog, a small prompt starter, QA skills, projects, and a practice desk.

The pages are original notes. Prompts are starters. The practice desk stores its note only in the browser.

## Run locally

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev
```

Production build:

```bash
npm install
npm run build
npm run preview
```

A local build uses `https://example.github.io` as a placeholder site address. GitHub Actions replaces that with the real `github.io` origin when the site is published.

## Publish

Push this folder so `package.json` is the root of a public GitHub repository. In the repository settings, set Pages to build with GitHub Actions. The workflow in `.github/workflows/deploy.yml` installs, builds, and publishes `dist`.

- Repository named `USERNAME.github.io`: the site is served at `https://USERNAME.github.io/`.
- Any other repository name: the site is served at `https://USERNAME.github.io/REPO/`.

The workflow reads that path from GitHub and sets the Astro base. You do not hard-code a username in the config.

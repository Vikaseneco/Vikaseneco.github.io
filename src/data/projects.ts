export type Project = {
  name: string;
  year: string;
  kind: string;
  summary: string;
  href: string;
  link: string;
};

export const projects: Project[] = [
  {
    name: 'Practice desk',
    year: '2026',
    kind: 'Page',
    summary:
      'A single page for one change. You write what moved, who it touches, what you left, what you saw, and whether you would proceed, ask, or hold. The note stays in the browser you are using.',
    href: 'desk',
    link: 'Open the desk',
  },
  {
    name: 'Five-line note',
    year: '2026',
    kind: 'Practice',
    summary:
      'Five lines written before a suite or a model gets the first word: the change, who it touches, what you will not test, what makes you stop, and where the evidence lives.',
    href: 'blog/the-notebook-before-the-suite',
    link: 'Read the note',
  },
  {
    name: 'Three marks',
    year: '2026',
    kind: 'Habit',
    summary:
      'A way to review model-written tests. Each claim is grounded, borrowed, or invented. A case without an oracle does not go into a suite.',
    href: 'blog/fluency-is-not-coverage',
    link: 'Read the note',
  },
  {
    name: 'Margin decision',
    year: '2026',
    kind: 'Format',
    summary:
      'A release comment small enough to sit in the margin: what is known, what was not tried, the doubt, and a choice of Proceed, Ask, or Hold.',
    href: 'skills#release-judgment',
    link: 'Open the skill',
  },
];

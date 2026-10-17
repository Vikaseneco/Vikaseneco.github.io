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
    name: 'Plain-language case',
    year: '2026',
    kind: 'Practice',
    summary:
      'A case written as short steps and Check lines, so a browser runner can attempt it and a person can still see what was asked. The agent run is a rehearsal. The exported script is what a person reviews.',
    href: 'blog/write-the-case-then-run-it',
    link: 'Read the lesson',
  },
  {
    name: 'Locator gate',
    year: '2026',
    kind: 'Habit',
    summary:
      'A repair may change how a script finds a control. It may not change the expected result, skip the test, or click through a payment. The old locator and the new one stay in the note.',
    href: 'blog/repair-the-locator-not-the-rule',
    link: 'Read the lesson',
  },
  {
    name: 'One job first',
    year: '2026',
    kind: 'Trial',
    summary:
      'A way to start AI in test automation without three agents on day one. Pick draft, run-and-repair, or explain. Name the person who reviews the diff, and the signal that stops the trial.',
    href: 'blog/start-with-one-job',
    link: 'Read the lesson',
  },
  {
    name: 'Pilot desk',
    year: '2026',
    kind: 'Page',
    summary:
      'A single page for one trial path. You write what the agent did, what the script now checks, what a person must still own, and whether you would proceed, ask, or hold. The note stays in the browser.',
    href: 'desk',
    link: 'Open the desk',
  },
];

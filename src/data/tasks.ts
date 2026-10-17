export type Task = {
  n: string;
  title: string;
  line: string;
  href: string;
  label: string;
};

export const tasks: Task[] = [
  {
    n: '01',
    title: 'Read a failed run',
    line: 'Separate a broken locator from a broken rule before anyone asks an agent to fix it.',
    href: 'skills#read-a-failure',
    label: 'Open skill',
  },
  {
    n: '02',
    title: 'Write a case in plain language',
    line: 'Say the steps and the check so a runner can try them, and a person can still read them.',
    href: 'prompts#plain-case',
    label: 'Open prompt',
  },
  {
    n: '03',
    title: 'Review a repaired locator',
    line: 'A new way to find a button is not a new meaning of success.',
    href: 'skills#locator-repair',
    label: 'Open skill',
  },
  {
    n: '04',
    title: 'Judge a generated script',
    line: 'Mark what the source required, what was borrowed, and what the model invented.',
    href: 'prompts#script-audit',
    label: 'Open prompt',
  },
  {
    n: '05',
    title: 'Pick the first agent job',
    line: 'Start with one job. Do not stand up a whole crew on the first day.',
    href: 'skills#one-job',
    label: 'Open skill',
  },
  {
    n: '06',
    title: 'Decide a pilot',
    line: 'One path, a time box, and a number you will trust more than a vendor’s percentage.',
    href: 'desk',
    label: 'Open desk',
  },
];

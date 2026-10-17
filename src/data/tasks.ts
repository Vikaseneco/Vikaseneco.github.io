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
    title: 'Read a change',
    line: 'Say what could go wrong, and what you would accept as a sign that it did not.',
    href: 'skills#risk-reading',
    label: 'Open skill',
  },
  {
    n: '02',
    title: 'Plan a short session',
    line: 'Write the charter before the clicking starts.',
    href: 'skills#session-charter',
    label: 'Open skill',
  },
  {
    n: '03',
    title: 'Describe a defect',
    line: 'Put the steps, the impact, and the evidence in one brief.',
    href: 'prompts#defect-brief',
    label: 'Open prompt',
  },
  {
    n: '04',
    title: 'Judge a release',
    line: 'Separate what you know from what you hope, then choose.',
    href: 'desk',
    label: 'Open desk',
  },
  {
    n: '05',
    title: 'Review a model answer',
    line: 'Mark what was supported, what was borrowed, and what was invented.',
    href: 'prompts#model-answer-audit',
    label: 'Open prompt',
  },
  {
    n: '06',
    title: 'Choose a regression slice',
    line: 'Keep the checks that belong to this change, and write down the rest.',
    href: 'skills#regression-slice',
    label: 'Open skill',
  },
];

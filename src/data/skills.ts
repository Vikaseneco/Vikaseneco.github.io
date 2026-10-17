export type Skill = {
  id: string;
  title: string;
  summary: string;
  when: string;
  bring: string[];
  steps: string[];
  leave: string[];
  caution: string;
  prompt?: string;
  desk?: boolean;
};

export const skills: Skill[] = [
  {
    id: 'read-a-failure',
    title: 'Read a failed run',
    summary: 'Name the kind of failure before an agent is allowed to touch the script.',
    when: 'A test is red, and someone wants an agent to repair it.',
    bring: ['The failing step.', 'The message or screenshot.', 'The check the test was meant to make.'],
    steps: [
      'Write the step in one sentence: what the test tried to do.',
      'Put the failure in one of three boxes: the control could not be found, the product behaved differently, or the run itself was broken (data, login, network).',
      'If the control could not be found, quote the old locator and say what on the screen still matches the intent.',
      'If the product behaved differently, do not send that to a healer. That is a possible defect, or a check that needs a person.',
      'Write the one change you would allow an agent to propose.',
    ],
    leave: ['A failure note with a type, and a limit on what the agent may edit.'],
    caution: 'A red test is not always a bad locator. Healing a real product change hides the bug and paints the run green.',
    prompt: 'failure-note',
  },
  {
    id: 'plain-case',
    title: 'Plain-language case',
    summary: 'Write a case a person can read and a runner can attempt.',
    when: 'You want an agent to drive a browser, and you do not yet want that agent to invent the checks.',
    bring: ['The flow, in the product’s words.', 'The data that is safe to use.', 'The one outcome that must be true.'],
    steps: [
      'Write a title a teammate would recognise.',
      'List only the setup that would make the run a waste if it is missing.',
      'Write steps as actions: open, type, choose, click. Keep one action per line.',
      'Start every check with “Check:” so it cannot be mistaken for a click.',
      'Say what the agent must not do: pay, delete, change a password, or skip a check.',
    ],
    leave: ['A short case in plain sentences, with the checks marked.'],
    caution: 'A case with no Check line will be “run” and still prove nothing. The agent can finish every click and learn the wrong lesson.',
    prompt: 'plain-case',
  },
  {
    id: 'locator-repair',
    title: 'Locator repair',
    summary: 'Let an agent propose a new way to find a control. Keep the check.',
    when: 'A script failed because a locator no longer matches, and the screen still shows the same intent.',
    bring: ['The old locator.', 'What the step was trying to do.', 'The new locator the agent proposed.', 'The trace or screenshot.'],
    steps: [
      'Write the intent in words: “the button that submits the login”, not a CSS string.',
      'Put the old locator and the new locator on two lines.',
      'Say what stayed the same: the check, the test data, and the next page you expect.',
      'Reject the repair if the new locator is wider than the intent (the first button on the page, a click on a coordinate, a removed assertion).',
      'Cap the retries. If it is still wrong after a small number of tries, stop and ask a person.',
    ],
    leave: ['An accept, or a reject with the reason. The script diff is the evidence.'],
    caution: 'A repair that changes the expected result is not a repair. It is a quieter way to stop testing.',
    prompt: 'locator-repair',
  },
  {
    id: 'script-audit',
    title: 'Generated-script audit',
    summary: 'Read an agent-written script before it joins the suite.',
    when: 'A model has drafted a Playwright-style test from a case, a ticket, or a page.',
    bring: ['The source you gave it.', 'The script, unchanged.'],
    steps: [
      'Mark each check grounded, borrowed, or invented.',
      'For a grounded check, keep the phrase from the source.',
      'For an invented number, message, or role, write the question a person must answer.',
      'Cross out any step that cannot fail.',
      'Say whether this script may be committed, or only kept as a draft.',
    ],
    leave: ['A marked script and a yes or no for the suite.'],
    caution: 'Exporting a script is not the same as trusting it. The file can look like a normal test and still assert a rule nobody wrote.',
    prompt: 'script-audit',
  },
  {
    id: 'one-job',
    title: 'One job first',
    summary: 'Choose a single agent job, and leave the others for later.',
    when: 'A team wants “AI in the automation” and is about to build several agents at once.',
    bring: ['The pain you can point at this month.', 'The suite you already trust.', 'The person who will review the agent’s diff.'],
    steps: [
      'Name the pain in one sentence: cases take too long to draft, failures take too long to sort, or locators break every week.',
      'Pick one job that matches that pain: draft, run-and-repair, or explain a failure. Not all three.',
      'Write what that job is forbidden to change.',
      'Name the person who reviews the diff before it is kept.',
      'Write the signal that would make you stop the trial.',
    ],
    leave: ['A one-job trial note a team can start without a new platform.'],
    caution: 'Three agents on day one produce three logs and no owner. The run-and-repair job is usually the first one that pays for its review time.',
    prompt: 'one-job',
  },
  {
    id: 'pilot-gate',
    title: 'Pilot gate',
    summary: 'Judge one AI-automation trial with your own numbers.',
    when: 'Someone cites a percentage and asks to widen the trial.',
    bring: ['The one path in the trial.', 'What the agent was allowed to change.', 'The counts you actually have.'],
    steps: [
      'Restate the path and the time box.',
      'Count confirmed defects, false greens, and hours spent reviewing diffs.',
      'Write the cost you know: model calls, extra runs, and review. Leave unknown costs blank.',
      'Compare that with the same path in the old suite, if you have it.',
      'Choose Proceed, Ask, or Hold for widening the trial. Not for the whole product.',
    ],
    leave: ['A gate note that could sit next to the trial, with a decision.'],
    caution: 'A vendor percentage is not your result. Proceed means this path earned a wider trial. It does not mean every suite should be generated.',
    prompt: 'pilot-note',
    desk: true,
  },
];

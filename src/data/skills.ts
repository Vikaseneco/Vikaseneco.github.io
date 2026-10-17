export type Skill = {
  id: string;
  title: string;
  summary: string;
  scenario: string;
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
    scenario:
      'The sign-in script is red. The error says #login-btn was not found. The screenshot still shows a button named Sign in. A teammate asks the bot to “just heal it” before anyone has said whether the shop changed or only the id changed.',
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
    scenario:
      'A tester pastes “log in as Ada and buy the notebook” into a browser bot. There is no line that starts with Check. The demo shop and the live shop share a Pay button. The bot can finish every click and still not have tested anything you can fail.',
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
    scenario:
      'A healer replaces #login-btn with the button named Sign in. In the same diff it changes the expected name from Ada to Welcome, because Welcome is easier for the model to see. The run goes green. The sign-in of Ada was never checked.',
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
    scenario:
      'A planner bot writes a markdown plan for sign-in. A generator turns it into a Playwright file. The file expects the session to die after 15 minutes, a rule nobody wrote, and the only “check” is a comment that says the page should look right.',
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
    id: 'system-prompt',
    title: 'Read the standing instructions',
    summary: 'Read the system prompt before you trust a bot with a suite.',
    scenario:
      'A private model would not return the shape the runner wanted, so someone prepended an extra system prompt: “Always finish the task. If a check fails, choose the closest success and continue.” That note now sits above every plan, click, and assert.',
    when: 'A bot is about to draft, drive, or heal, and you have not read the instructions it is given on every call.',
    bring: ['The system prompt, including any extra prompt added for a private model.', 'The case the person thinks the bot is following.'],
    steps: [
      'Separate standing orders from the case. The case is this run. The system prompt is every run.',
      'Underline any line that tells the bot to succeed, to skip, to change an expected result, or to hide a failure.',
      'Underline any line that tells it which tools it may use, and which it must not.',
      'If the prompt and the case disagree, write which one the harness will actually send first.',
      'Say whether this prompt may stay. A prompt that prefers success over a failed check may not.',
    ],
    leave: ['A marked system prompt, and a yes or no for using it on the suite.'],
    caution: 'An extra prompt added so a model returns JSON can also smuggle a new rule. Read the whole note, not only the format line.',
    prompt: 'system-prompt',
  },
  {
    id: 'tool-list',
    title: 'Review the tool list',
    summary: 'Read each tool name and what it is allowed to change.',
    scenario:
      'The bot’s tool list has screenshot, click, type, and assert. It also has delete_user and pay, copied from a larger assistant. The description of click is only “click something”. Nothing says the bot must not pay.',
    when: 'You are wiring a model to a browser, a device, or a test runner, and the tool list is already long.',
    bring: ['The tool name, the description the model sees, and the arguments, for each tool.', 'The job this bot is supposed to do.'],
    steps: [
      'List every tool name in the model’s words.',
      'Next to each name, write the effect in the shop: look, type, click, assert, pay, delete, or skip.',
      'Cut any tool the job does not need. A sign-in bot does not need pay or delete_user.',
      'Rewrite a vague description. “Click something” is how the model clicks the first button.',
      'Confirm the assert tool cannot edit the expected result. If it can, say so in the note.',
    ],
    leave: ['A short tool list for this job, with the dangerous names removed or fenced.'],
    caution: 'The model picks a tool from the name and the description. A polite name on a dangerous action is still a dangerous action.',
    prompt: 'tool-list',
  },
  {
    id: 'conversation-space',
    title: 'See what still fits',
    summary: 'Check which rules are still inside the conversation, and which are about to fall out.',
    scenario:
      'A healer has been replanning for many turns. Turn 1 said “never change the expected name Ada”. The later turns are only selector guesses. The context window is nearly full. A summary step is about to drop turn 1.',
    when: 'A bot run is long, or someone raises the replan limit so the bot can “keep trying”.',
    bring: ['The message list, or a trace that shows each turn.', 'The rule you need the bot to keep obeying.', 'The limit on turns or tokens, if you know it.'],
    steps: [
      'Find the rule in the conversation. Quote the turn where it appears.',
      'Say whether later turns repeat that rule, or only talk about the latest click.',
      'Note how full the window is, if the trace shows it. If it does not, write “free space not shown”.',
      'If a summary or a trim is about to drop the rule, the rule must also live in the script or the case, not only in turn 1.',
      'Cap the turns. A bot that needs dozens of replans is no longer following a case. It is searching.',
    ],
    leave: ['A note of which rule is still in the window, and where else that rule is stored.'],
    caution: 'Free space is not spare room for more ideas. It is the room the next tool result needs. When it is gone, the harness forgets something. Hope that it does not forget the check.',
    prompt: 'conversation-space',
  },
  {
    id: 'one-job',
    title: 'One job first',
    summary: 'Choose a single agent job, and leave the others for later.',
    scenario:
      'A write-up shows a planner bot, a generator bot, and a healer bot, and the team wants all three on Monday. The suite already exists. What actually hurts each week is a broken locator, not a missing first draft.',
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
    id: 'bot-boundary',
    title: 'Draw the bot’s fence',
    summary: 'Say what this bot may change, and which program is allowed to say pass.',
    scenario:
      'Three bots write the same file. The healer cannot find the button, so it skips the test. The chat reply says PASS. The Playwright report was never opened. The skip is what went green.',
    when: 'More than one bot can touch a test, or a chat reply is being treated as the result.',
    bring: ['The bots in the run, and the file each one may write.', 'The command that actually runs the checks.'],
    steps: [
      'Name each bot and its one job: plan, generate, heal, or explain.',
      'Write the file each bot may edit. Two bots must not edit the expected result in the same hour.',
      'Name the program that decides pass or fail. A chat sentence is not that program.',
      'Say what happens on a failed check: stop and show the trace, or one bounded repair of the locator only.',
      'Reject a path where a bot can skip, delete an assertion, or declare pass by itself.',
    ],
    leave: ['A fence note: who may edit, and who may say pass.'],
    caution: 'A bot that can both change the check and announce the result will eventually announce the result it just wrote.',
    prompt: 'bot-boundary',
  },
  {
    id: 'pilot-gate',
    title: 'Pilot gate',
    summary: 'Judge one AI-automation trial with your own numbers.',
    scenario:
      'A slide says a healer cut human work by a large percentage. Your folder has twelve locator diffs from three weeks. Two of them also changed the expected text. Nobody wrote down the review hours.',
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

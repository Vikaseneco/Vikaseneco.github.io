export type Prompt = {
  id: string;
  title: string;
  intent: string;
  scenario: string;
  bring: string;
  check: string;
  text: string;
};

export const prompts: Prompt[] = [
  {
    id: 'failure-note',
    title: 'Read a failed run',
    intent: 'Sort a red automation run before an agent edits it.',
    scenario:
      'Sign-in failed because #login-btn was missing. The screenshot still shows a button named Sign in. The check is that the next page shows the name Ada. Someone wants a healer to edit the file now.',
    bring: 'The failing step, the error, and what the test was supposed to check.',
    check: 'The note names one failure type. It does not tell a healer to “fix the product”.',
    text: `You are helping a person read one failed automated test. Use only the source below. If a fact is not in the source, write "Not in source". Do not invent locators, pages, or product rules.

A real situation this shape is for: the sign-in id changed, the button named Sign in is still on the screen, and the check is still "the page shows Ada". Do not treat every red run as that situation. Read the source.

SOURCE:
[paste the failing step, the error or screenshot note, and the check the test was meant to make]

Answer in this shape:

Step
One sentence: what the test tried to do.

Type
One of: locator, product behaviour, or broken run. Say why.

Allowed edit
The one change an agent may propose. If the type is product behaviour, write "No automatic edit".

Do not touch
The check, the data, or the page that must stay as written.

Question for a person
One question, or "None".`,
  },
  {
    id: 'plain-case',
    title: 'Write a plain-language case',
    intent: 'Draft a case a person can read and a browser runner can attempt.',
    scenario:
      'The ask is “log in as Ada and buy the notebook”. The shop has a Pay button. The safe outcome is that the cart shows the notebook and no charge is made. The case must say that before any bot runs.',
    bring: 'The flow and the outcome you already trust. Not a guessed rule.',
    check: 'Every check starts with "Check:". No step pays, deletes, or skips a check unless the source said so.',
    text: `Write a plain-language test case for one flow. A later tool may drive a browser from these lines. A person must still be able to read them. Use only the source. If a fact is missing, write "Not in source". Do not invent users, prices, roles, or messages.

If the source is only "log in and buy", keep the danger in the Do not section. Do not invent a test card or a price.

SOURCE:
[paste the flow, the safe test data, and the outcome you care about]

Produce:

Title

Setup
Only what must be true before the first step.

Steps
One action per line: open, type, choose, or click.

Checks
Each line starts with "Check:". A check names what a person would look at.

Do not
What the runner must not do, including pay, delete, and skip.

Out of scope
What this case will not try.`,
  },
  {
    id: 'locator-repair',
    title: 'Review a repaired locator',
    intent: 'Decide whether a new locator still matches the old intent.',
    scenario:
      'Old locator #login-btn. Proposed locator: the button named Sign in. The same diff changes the expected text from Ada to Welcome. The intent was “click the control that signs Ada in, then see Ada”.',
    bring: 'The intent, the old locator, the proposed locator, and what the check still says.',
    check: 'The note says accept or reject. A change to the expected result is a reject.',
    text: `Review a proposed locator repair. The intent of the step must stay the same. Use only the source. If a fact is missing, write "Not in source".

Reject the repair if the expected result changed, the test is skipped, the new locator is "the first button", or the click is by screen position. A button named Sign in can be acceptable only when the source shows that name and does not show a second control with the same name.

SOURCE:
[paste the step intent, the old locator, the new locator, and the check that must remain]

Answer:

Intent
One sentence.

What changed
Old locator and new locator, in the source's words. Also say if the check changed.

What stayed
The check and the data. If either changed, say so.

Verdict
Accept or reject.

Reason
One or two sentences.`,
  },
  {
    id: 'script-audit',
    title: 'Judge a generated script',
    intent: 'Mark an agent-written automation script before it joins a suite.',
    scenario:
      'A planner wrote a markdown sign-in plan. A generator emitted a Playwright file that expects a 15 minute timeout and comments that the page should look logged in. The plan only said the next page shows Ada.',
    bring: 'The case or ticket you supplied, and the script unchanged.',
    check: 'Invented rules stay marked. A check that cannot fail is named.',
    text: `Review an automated test drafted by a model. Use only the source and the script. If the script adds a rule the source does not contain, mark it invented. Do not rewrite the script into a cleaner version of those inventions.

A timeout, an exact error string, or a comment in place of an expect are the usual inventions. Mark them. Do not quietly delete them from your answer.

SOURCE:
[paste the case, ticket, or requirement]

SCRIPT:
[paste the generated test]

For each check, use one mark:

- Grounded. The source states it. Quote a short phrase.
- Borrowed. A familiar automation idea the source did not require.
- Invented. A number, message, role, timeout, or rule the source does not contain.

Then add:

Cannot fail
Steps or checks with no way to see success versus failure.

May enter the suite
Yes or no. Yes only if every invented check is removed or confirmed by a person.

Question for a person
Only the questions needed before the script is committed.`,
  },
  {
    id: 'system-prompt',
    title: 'Read the standing instructions',
    intent: 'Find rules in the system prompt that override the case.',
    scenario:
      'An extra system prompt was added so a private model would return JSON. It also says “Always finish. If a check fails, choose the closest success.” That line now applies to every click and every assert.',
    bring: 'The full system prompt, including any extra prompt, and the case for this run.',
    check: 'Any line that prefers success, skip, or a changed expected result is quoted. The verdict is keep or rewrite.',
    text: `Read a system prompt for a test bot. The system prompt is sent on every call. The case is only this run. Use only the source. If a fact is missing, write "Not in source".

SOURCE:
SYSTEM PROMPT:
[paste the standing instructions and any extra prompt]

CASE:
[paste the case for this run]

Answer:

Standing orders that are safe
Format, language, and which tools to prefer, if the source says so.

Standing orders that override the case
Quote any line that says to succeed, skip, hide a failure, change an expected result, pay, or delete.

Disagreement
If the prompt and the case disagree, say which one is sent on every call.

Verdict
Keep, or rewrite. Rewrite if any overriding line is present.

Replacement line
One sentence you would put in the prompt instead, or "None".`,
  },
  {
    id: 'tool-list',
    title: 'Review the tool list',
    intent: 'Cut the tools a test bot does not need, and make vague descriptions specific.',
    scenario:
      'The list has screenshot, click, type, assert, delete_user, and pay. The click description says only “click something”. This bot’s job is to sign Ada in and check that her name appears.',
    bring: 'Each tool name, the description the model sees, and the arguments.',
    check: 'pay and delete are removed unless the source’s job needs them. Vague descriptions are rewritten. The assert tool is not allowed to edit the expected text.',
    text: `Review the tools offered to one test bot. The model chooses a tool from its name and description. Use only the source. Do not invent tools that are not listed.

SOURCE:
JOB:
[paste the one job, for example sign-in]

TOOLS:
[paste each tool name, description, and arguments]

Answer:

Keep
Tool name, and the effect in plain words: look, type, click, or assert.

Cut
Tool name, and why this job does not need it. Include pay, delete, skip, and any tool with no description.

Rewrite
For any kept tool whose description is vague, write a better one-sentence description. Name the control or the fact when the source does.

Assert fence
Say whether the assert tool can change the expected result. If the source does not say, write "Not in source" and treat that as a question, not a yes.

Question for a person
One question before this list is wired up.`,
  },
  {
    id: 'conversation-space',
    title: 'See what still fits',
    intent: 'Find the rule that may fall out of a long bot conversation.',
    scenario:
      'Turn 1 says never change the expected name Ada. Turns 2 to 30 are selector guesses. A summary is about to shrink the conversation because the window is full. The replan limit was raised so the bot could keep trying.',
    bring: 'The message list or a turn-by-turn trace, the rule that must survive, and any turn or token limit.',
    check: 'The note quotes the turn that holds the rule. If that turn may be dropped, the rule is also required in the case or the script.',
    text: `Read one bot conversation and say whether the important rule is still in it. Use only the source. If the trace does not show how full the window is, write "free space not shown". Do not invent a token count.

SOURCE:
RULE THAT MUST SURVIVE:
[paste the rule]

CONVERSATION OR TRACE:
[paste the turns, oldest first]

LIMIT:
[paste the turn limit or token limit, or write "Not in source"]

Answer:

Where the rule sits
Quote the turn. If it appears only once, say so.

What the later turns are about

Free space
What the source shows, or "free space not shown".

Will a summary drop the rule
Yes, no, or not shown. If yes, say where else the rule must be stored: the case, the script, or both.

Cap
Whether the turn limit is still a fence or has been raised so far that the bot is searching.

Question for a person
One question.`,
  },
  {
    id: 'one-job',
    title: 'Pick the first agent job',
    intent: 'Choose one AI automation job and write what it must not change.',
    scenario:
      'The suite already exists and locators break every week. A blog shows a planner, a generator, and a healer. The team wants all three. One person is available to review diffs.',
    bring: 'The pain you can point at, and the suite you already have.',
    check: 'Exactly one job is chosen. The forbidden list is concrete.',
    text: `Help a team choose one first job for AI in test automation. The jobs are: draft a case or script, run a case and repair a locator, or explain a failed run. Pick one. Use only the source. Do not invent savings, percentages, or tools the source does not name.

If the source says the suite exists and locators break, do not pick "all three". Pick the one job that matches the pain.

SOURCE:
[paste the current pain, the suite you trust, and who can review a diff]

Answer:

Pain
One sentence.

Job
Exactly one of: draft, run-and-repair, explain.

Allowed to change

Forbidden to change
Include the expected result, skipped tests, and any payment or delete step unless the source already allows them.

Reviewer
Who reads the diff before it is kept. If unknown, write "Name a person".

Stop the trial if
One observable signal.`,
  },
  {
    id: 'bot-boundary',
    title: 'Draw the bot’s fence',
    intent: 'Decide which bot may edit the test, and which program may say pass.',
    scenario:
      'A planner, a generator, and a healer can all write the same Playwright file. The healer skips the test when the button is missing. The chat says PASS. The Playwright report was not opened.',
    bring: 'The bots, the file each one writes, and the command that runs the checks.',
    check: 'A chat sentence is not accepted as pass. A bot that can skip or delete an assertion is rejected.',
    text: `Draw the fence around one test bot, or a small set of bots. Use only the source. If the source does not name the program that runs the checks, write "Not in source" and do not treat the bot's reply as that program.

SOURCE:
[paste the bots, what each may edit, and how pass or fail is decided today]

Answer:

Bots
Name and one job each.

May edit
The file, and the part of the file. Expected results are listed only if the source already allows that bot to edit them.

Must not edit
Skip flags, expected results, pay steps, and delete steps, unless the source explicitly allows one of them.

Who says pass
The program or report. If the source uses a chat reply as pass, write "Not a pass" and say what should be opened instead.

On a failed check
Stop and show the trace, or one bounded locator repair. Do not offer both skip and pass.

Verdict
Safe to run, or not safe to run, with one sentence.`,
  },
  {
    id: 'pilot-note',
    title: 'Judge a pilot',
    intent: 'Turn a small AI-automation trial into a keep, ask, or stop decision.',
    scenario:
      'Twelve sign-in locator diffs in three weeks. Ten kept the check that the page shows Ada. Two changed that text to Welcome. Review hours were not counted. A slide quotes a large percentage from another team.',
    bring: 'The path, the time box, and the counts you have. Not a slide of promised savings.',
    check: 'Every number came from the source. Missing counts stay "Not counted". A borrowed percentage is not used as a reason to proceed.',
    text: `Judge one pilot of AI in test automation. Do not widen the claim to the whole product. Use only the source. If a number was not counted, write "Not counted". Do not borrow a percentage from a blog or a vendor.

If any diff changed an expected result, do not answer Proceed.

SOURCE:
[paste the path, what the agent was allowed to change, the time box, and any counts]

Answer:

Path and time box

What the agent was allowed to change

Counts
Confirmed defects, false greens, review hours, and run cost. Use "Not counted" where needed.

Compared with the old suite
Only if the source has that comparison.

Decision
Proceed, Ask, or Hold. Proceed means widen this kind of trial. Hold means stop or narrow it.

Why
The fact that would change the decision.`,
  },
];

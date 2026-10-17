export type Prompt = {
  id: string;
  title: string;
  intent: string;
  bring: string;
  check: string;
  text: string;
};

export const prompts: Prompt[] = [
  {
    id: 'failure-note',
    title: 'Read a failed run',
    intent: 'Sort a red automation run before an agent edits it.',
    bring: 'The failing step, the error, and what the test was supposed to check.',
    check: 'The note names one failure type. It does not tell a healer to “fix the product”.',
    text: `You are helping a person read one failed automated test. Use only the source below. If a fact is not in the source, write "Not in source". Do not invent locators, pages, or product rules.

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
    bring: 'The flow and the outcome you already trust. Not a guessed rule.',
    check: 'Every check starts with "Check:". No step pays, deletes, or skips a check unless the source said so.',
    text: `Write a plain-language test case for one flow. A later tool may drive a browser from these lines. A person must still be able to read them. Use only the source. If a fact is missing, write "Not in source". Do not invent users, prices, roles, or messages.

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
What the runner must not do.

Out of scope
What this case will not try.`,
  },
  {
    id: 'locator-repair',
    title: 'Review a repaired locator',
    intent: 'Decide whether a new locator still matches the old intent.',
    bring: 'The intent, the old locator, the proposed locator, and what the check still says.',
    check: 'The note says accept or reject. A change to the expected result is a reject.',
    text: `Review a proposed locator repair. The intent of the step must stay the same. Use only the source. If a fact is missing, write "Not in source".

SOURCE:
[paste the step intent, the old locator, the new locator, and the check that must remain]

Answer:

Intent
One sentence.

What changed
Old locator and new locator, in the source's words.

What stayed
The check and the data. If either changed, say so.

Verdict
Accept or reject.

Reason
One or two sentences. Reject a locator that is broader than the intent, a click by screen position, a deleted assertion, or a skipped test.`,
  },
  {
    id: 'script-audit',
    title: 'Judge a generated script',
    intent: 'Mark an agent-written automation script before it joins a suite.',
    bring: 'The case or ticket you supplied, and the script unchanged.',
    check: 'Invented rules stay marked. A check that cannot fail is named.',
    text: `Review an automated test drafted by a model. Use only the source and the script. If the script adds a rule the source does not contain, mark it invented. Do not rewrite the script into a cleaner version of those inventions.

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
    id: 'one-job',
    title: 'Pick the first agent job',
    intent: 'Choose one AI automation job and write what it must not change.',
    bring: 'The pain you can point at, and the suite you already have.',
    check: 'Exactly one job is chosen. The forbidden list is concrete.',
    text: `Help a team choose one first job for AI in test automation. The jobs are: draft a case or script, run a case and repair a locator, or explain a failed run. Pick one. Use only the source. Do not invent savings, percentages, or tools the source does not name.

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
    id: 'pilot-note',
    title: 'Judge a pilot',
    intent: 'Turn a small AI-automation trial into a keep, ask, or stop decision.',
    bring: 'The path, the time box, and the counts you have. Not a slide of promised savings.',
    check: 'Every number came from the source. Missing counts stay "Not counted".',
    text: `Judge one pilot of AI in test automation. Do not widen the claim to the whole product. Use only the source. If a number was not counted, write "Not counted". Do not borrow a percentage from a blog or a vendor.

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

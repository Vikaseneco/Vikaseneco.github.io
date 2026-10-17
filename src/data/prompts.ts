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
    id: 'change-risk-brief',
    title: 'Read the change',
    intent: 'Turn a ticket or a diff into a short risk note.',
    bring: 'The change itself. Not a guessed requirement.',
    check: 'Each risk names something you could observe. Silence in the source stays written as “Not in source”.',
    text: `You are helping a person test one software change. Use only the source below. If a fact is not in the source, write "Not in source". Do not invent product rules, numbers, or messages.

SOURCE:
[paste the ticket, the requirement, or a short description of the diff]

Answer in this shape:

Change
Two sentences in plain language.

Who it touches
Name a person or a downstream system. Do not stop at the word "users".

Risks
Three risks. For each one, say what you would look at to notice it.

Left for later
What this pass will not cover.

Question for a person
One question that should be answered before testing starts.`,
  },
  {
    id: 'session-charter',
    title: 'Plan the session',
    intent: 'Draft a charter for one time-boxed pass.',
    bring: 'The change, and any risk note you already trust.',
    check: 'The mission is one sentence. Nothing in the charter depends on a rule you did not supply.',
    text: `Write a test session charter for one change. A charter is a short plan for a time-boxed session, not a strategy document and not a list of scripts.

SOURCE:
[paste the change and any risk note you already trust]

Produce:

Mission
One sentence: what you are trying to learn.

Time box
Suggest a length only if the source implies one. Otherwise write "Choose a length".

Setup
What must be true before the session starts.

First moves
Four things to try, in order, tied to the source.

Oracles
What you will compare against. If the source does not say, write "Not in source".

Stop
The condition that ends the session early.

Out of scope
What you will not chase this time.`,
  },
  {
    id: 'defect-brief',
    title: 'Describe a defect',
    intent: 'Make notes into a brief someone else can follow.',
    bring: 'What you did, what you saw, and any capture you have.',
    check: 'You can perform the steps from the brief alone. No step was added.',
    text: `Turn the notes below into a defect brief a teammate can act on. Do not add steps that were not observed. If impact is unclear, write "Impact not stated" instead of guessing severity.

NOTES:
[paste what you did, what you saw, and any evidence]

Write:

Title
A sentence that names the failure.

Environment
Only details present in the notes.

Steps
Numbered, and only steps that were actually taken.

Seen
What happened.

Expected
What the notes say should have happened. If they do not say, write "Expected result not stated".

Impact
Who is affected and how, from the notes only.

Evidence
What was captured. If nothing was captured, say so.

Open question
One thing a person still needs to confirm.`,
  },
  {
    id: 'release-margin',
    title: 'Judge a release',
    intent: 'Sort evidence before a person chooses Proceed, Ask, or Hold.',
    bring: 'Scope, what was tried, what failed, and what was not tried.',
    check: 'The choice follows from the unknowns. A green check is not proof of something that was not tested.',
    text: `You are helping a person decide whether one change is ready to go further. You do not make the decision. You sort the evidence.

MATERIAL:
[paste the scope, what was tried, what passed, what failed, and what was not tried]

Write:

Known
Facts the material supports.

Unknown
Things the material does not settle.

Tried
What was actually exercised.

Not tried
What was left out.

Doubts
The doubts a teammate should see before agreeing.

A choice a person could defend
Offer one of: Proceed, Ask, or Hold. Then say which missing fact would change it.

Do not treat a passing check as proof of something that was not tested.`,
  },
  {
    id: 'model-answer-audit',
    title: 'Review a model answer',
    intent: 'Mark a drafted list before anyone treats it as coverage.',
    bring: 'The source you gave the model, and the answer unchanged.',
    check: 'Invented items stay marked. They are not rewritten into smoother cases.',
    text: `Review the model answer below against the source. Mark every concrete claim.

SOURCE:
[paste the requirement or change]

MODEL ANSWER:
[paste the model's tests, risks, or summary]

For each claim, use one mark:

- Grounded. The source states it. Quote the short phrase you used.
- Borrowed. A familiar testing idea the source did not require. Say whether you would keep it.
- Invented. The answer added a rule, number, message, or limit the source does not contain.

Then add:

Oracles missing
Claims that cannot fail, because nobody could tell success from failure.

Questions for a person
Only the questions needed before anyone turns an invented claim into a script.

Do not rewrite the model answer into a cleaner version of the same inventions.`,
  },
  {
    id: 'regression-slice',
    title: 'Choose a regression slice',
    intent: 'Cut the checks that belong to this change.',
    bring: 'The change, the areas it touches, and the checks you already have.',
    check: 'Each included check names an oracle. Nothing is in the slice only because it is easy to run.',
    text: `Choose a small regression slice for one change. A slice is the set of checks that belong to this change, not the whole suite.

SOURCE:
[paste the change, the areas it touches, and any checks you already have]

Write:

In the slice
Up to seven checks. For each, say the risk it addresses and the oracle.

Held back
Checks that may be useful later but do not belong to this change. Say why they wait.

Missing oracle
Any check you cannot yet judge pass or fail.

Not a substitute
One sentence on what this slice does not prove.

Prefer fewer checks with a clear oracle over a long list.`,
  },
];

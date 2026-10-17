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
    id: 'risk-reading',
    title: 'Risk reading',
    summary: 'Read one change closely enough that the first test has a reason.',
    when: 'You have a change, and you have not opened a tool yet.',
    bring: ['The ticket, the requirement, or a plain description of the diff.'],
    steps: [
      'Write the change in two sentences you would say out loud.',
      'Name who it touches. If you can only say “users”, keep going.',
      'List three risks. Each one needs an observation that would show it.',
      'Write what this pass will not cover.',
      'Write the question a person must answer. If you have none, say that too.',
    ],
    leave: ['A risk note short enough to sit above a test session.'],
    caution: 'A fluent list is not a review. If you cannot point at the source, mark the line “not in source”.',
    prompt: 'change-risk-brief',
  },
  {
    id: 'session-charter',
    title: 'Session charter',
    summary: 'Give one block of testing a mission, a stop, and a place for the notes.',
    when: 'You are about to spend a stretch of time on one change.',
    bring: ['The risk note.', 'The build you mean to test.', 'A place the notes will go.'],
    steps: [
      'State the mission in one sentence.',
      'Write the setup that would make the session a waste if it is missing.',
      'Choose four first moves that follow the mission.',
      'Name the oracles before you start.',
      'Write the condition that ends the session early.',
    ],
    leave: ['A charter you can read aloud in under a minute.'],
    caution: 'A charter is not a promise to find every defect. It is a promise about what this session is for.',
    prompt: 'session-charter',
  },
  {
    id: 'defect-briefing',
    title: 'Defect briefing',
    summary: 'Turn an observation into a brief another person can follow.',
    when: 'You saw something a teammate may need to act on.',
    bring: ['The steps you actually took.', 'What you saw.', 'Any capture you have.'],
    steps: [
      'Title the failure, not the frustration.',
      'Keep the steps to what happened.',
      'Separate what you saw from what was expected. If the expected result was never stated, say so.',
      'Say who is affected, from what you know.',
      'Point at the evidence, or say there is none yet.',
    ],
    leave: ['A brief someone else can follow without asking you to retell the story.'],
    caution: 'Do not raise the seriousness to make the brief feel urgent. Impact you did not observe stays unstated.',
    prompt: 'defect-brief',
  },
  {
    id: 'release-judgment',
    title: 'Release judgment',
    summary: 'Make a short, defensible choice about one change.',
    when: 'Someone asks whether a change can go further.',
    bring: ['The scope.', 'What was tried.', 'What failed.', 'What was not tried.'],
    steps: [
      'Split the page into known and unknown.',
      'Match every claim of readiness to something that was tried.',
      'List what the pass did not touch.',
      'Choose Proceed, Ask, or Hold.',
      'Write the fact that would change your choice.',
    ],
    leave: ['A margin note beside the release: evidence, doubt, and a choice.'],
    caution: 'Proceed means the evidence you have is enough for this pass. It does not mean the product is finished.',
    prompt: 'release-margin',
    desk: true,
  },
  {
    id: 'model-review',
    title: 'Model-output review',
    summary: 'Read a drafted answer so fluency is not mistaken for coverage.',
    when: 'A model has written tests, risks, or a summary, and someone might treat it as done.',
    bring: ['The source you gave the model.', 'The answer, unchanged.'],
    steps: [
      'Mark each concrete claim grounded, borrowed, or invented.',
      'For a grounded claim, keep a short quote from the source.',
      'For an invented claim, write the question a person must answer.',
      'Cross out any case that cannot fail.',
      'Leave the original answer in the note with the marks.',
    ],
    leave: ['A marked answer, and a short list of questions.'],
    caution: 'Rewriting inventions into smoother cases hides them. The marks should stay visible.',
    prompt: 'model-answer-audit',
  },
  {
    id: 'regression-slice',
    title: 'Regression slice',
    summary: 'Choose the checks that belong to this change, and show the cut.',
    when: 'A change has landed and it is tempting to “run the suite”.',
    bring: ['The change.', 'The areas it touches.', 'The checks you already trust.'],
    steps: [
      'Keep a check only if it addresses a risk of this change.',
      'Write the oracle next to the check.',
      'Put the other useful checks on a held-back list.',
      'Say, in one sentence, what the slice does not prove.',
    ],
    leave: ['A slice small enough to explain, and a held-back list so the cut is visible.'],
    caution: 'A short list is not a weak list. A long list that nobody can connect to the change is the weaker one.',
    prompt: 'regression-slice',
  },
];

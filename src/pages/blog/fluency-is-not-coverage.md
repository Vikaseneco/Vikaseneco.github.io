---
layout: ../../layouts/Post.astro
title: Fluency is not coverage
description: A way to mark model-written tests so a smooth list is not mistaken for coverage.
date: "2026-06-02"
minutes: 3
---

Ask a model for tests of a password reset and it may return a dozen cases with identifiers, priorities, and expected results. The list will use the right nouns: token, expiry, reused link, unknown address. It will look like a suite someone has already reviewed.

I read that kind of list the way I read any confident stranger. Each concrete claim gets one of three marks.

**Grounded.** The claim follows from the source. I can point at the sentence.

**Borrowed.** The claim is a familiar testing idea. Empty field, very long field, a second try. It may be worth keeping, but this source did not ask for it. I have to decide whether it belongs.

**Invented.** The claim depends on a rule the source never stated. A duration, a retry limit, a particular error string. Until a person confirms the rule, the case is fiction with a test-case number.

Here is the sort of sentence a model offers easily: “The reset link expires after fifteen minutes and cannot be reused.” Suppose the source said only, “The link should stop working after it is used or after it grows old.” There is no duration. There is no promise about the exact message. The case is fluent. It is also invented.

Fluency is a property of the sentences. Coverage is a property of the risk. A list can be easy to read and still leave the real risk untested. In that note, the risk was not the number fifteen. It was whether an old link, or a link already used, could still set a new password.

I also look for cases that cannot fail. “Confirm the page works as expected” cannot fail, because nobody said what “works” is. A useful case names the oracle: the thing you will look at, and the difference that counts as a failure. For the reset link, a usable oracle is this: after the link has been used once, a second visit does not offer a form that can set a password. If I cannot name the oracle, I do not have a case. I have a topic.

Borrowed cases are not trash. An empty email, a second submit, a link opened on another device: I might want those. I label them borrowed so I do not tell myself the source required them. Invented cases go back to a person who knows the product. Sometimes the invention is a good question. “Do we have a time limit, and who chooses it?” is a better output than a fake rule of fifteen minutes.

> A green run of invented tests is a story about a product we do not have.

A marked pass can be short. Three claims are enough to show the habit:

- “A used link must not set a new password.” Grounded, if the source said the link stops working after it is used.
- “Try an empty email address.” Borrowed. Keep it if the form can be submitted empty. Do not pretend the source demanded it.
- “The link expires after fifteen minutes.” Invented. Ask whether a time limit exists, and who chooses it, before anyone writes a script around that number.

The next day, borrowed items can stay if a person still wants them. Invented items do not graduate because they were written in a table. They graduate when someone who knows the product confirms the rule, and the case gains an oracle.

I keep the model’s list in the note, marks and all. I do not paste unmarked cases into a repository. The [review prompt](../../prompts/#model-answer-audit) is a starter for that pass. The habit beside it is older than the prompt, and it sits next to the [five lines](../the-notebook-before-the-suite/) I want written first.

Mark grounded, borrowed, or invented. Demand an oracle. Ask a person before a guessed rule becomes a script. The model can hold the pen. It should not be the one that decides the list is complete.

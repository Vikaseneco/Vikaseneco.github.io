---
layout: ../../layouts/Post.astro
title: Write the case, then let a runner try it
description: Plain steps a person can read, a browser rehearsal, and a script you review before it joins the suite.
date: "2026-10-16"
minutes: 4
series: "AI in test automation · 2 of 4"
---

One Chinese practice I want to keep is almost old-fashioned. You write the case in a document a tester can read. An agent uses that document to drive a real browser. If the rehearsal works, the actions can be saved as an ordinary automated test, and that file is what you review. The document stays the source. The agent does not get to be the only copy of the test.

Read [what AI changes](../what-ai-changes-in-automation/) if you want the boundary first. This note is the shape of the case.

## A case is not a prompt essay

A useful case has four parts and very little style.

**Title.** What a teammate would call this flow.

**Setup.** What must already be true. A test account. An empty cart. A shop that does not charge a real card.

**Steps.** One action per line. Open, type, choose, click.

**Checks.** Lines that start with “Check:”. They name what you would look at.

Here is a case for a shop login. The password is a fake from a demo shop, not a secret from a real one.

```
Title: Sign in and see your name

Setup:
- The demo shop is up.
- The user "ada" exists, and the password is the demo password.

Steps:
1. Open the sign-in page.
2. Type ada into the account field.
3. Type the demo password into the password field.
4. Click the button that submits the sign-in.

Checks:
- Check: the next page shows the name Ada.
- Check: the sign-in form is gone.

Do not:
- Change the password.
- Use a real card.
```

The “Check:” prefix is the whole trick. Public write-ups of this pattern treat a line that begins with “verify” or “assert” as a check, and every other line as an action. I like that, and I want it visible in English. If the check is buried in a paragraph, the agent will click through the story and call the run finished.

<figure class="figure">
  <svg viewBox="0 0 640 210" role="img" aria-labelledby="flowTitle flowDesc">
    <title id="flowTitle">From a readable case to a reviewed script</title>
    <desc id="flowDesc">A person writes the case. An agent looks, acts, and records a trace. A script is exported only after the rehearsal. A person reviews the checks before the script joins the suite.</desc>
    <style>
      .t { font: 14px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <rect class="pine" x="12" y="70" width="130" height="64" rx="4"/>
    <text class="t" x="24" y="96">1. Person writes</text>
    <text class="t" x="24" y="116">the case</text>
    <path d="M150 102 H168" stroke="#5c564c" fill="none"/><path d="M162 96 L170 102 L162 108" fill="#5c564c"/>
    <rect class="clay" x="176" y="70" width="140" height="64" rx="4"/>
    <text class="t" x="188" y="96">2. Agent looks</text>
    <text class="t" x="188" y="116">then acts</text>
    <path d="M324 102 H342" stroke="#5c564c" fill="none"/><path d="M336 96 L344 102 L336 108" fill="#5c564c"/>
    <rect class="box" x="350" y="70" width="120" height="64" rx="4"/>
    <text class="t" x="362" y="96">3. Trace</text>
    <text class="t" x="362" y="116">and shots</text>
    <path d="M478 102 H496" stroke="#5c564c" fill="none"/><path d="M490 96 L498 102 L490 108" fill="#5c564c"/>
    <rect class="pine" x="504" y="36" width="124" height="132" rx="4"/>
    <text class="t" x="516" y="64">4. Export a</text>
    <text class="t" x="516" y="84">normal script</text>
    <text class="t" x="516" y="112">5. Person</text>
    <text class="t" x="516" y="132">reads the</text>
    <text class="t" x="516" y="152">checks</text>
  </svg>
  <figcaption>
    The case is the source. The agent run is a rehearsal. The script enters the suite only after a person has read the checks.
  </figcaption>
</figure>

## What the rehearsal is allowed to prove

During the run, a careful agent does not guess the next click from memory alone. It looks again: the names and roles on the page, then a click or a type. If a tool fails, it should return the error into the next look, not throw the whole story away. Public notes also put a fence on retries, so a confused agent cannot click all afternoon.

That rehearsal proves a narrow thing. These steps can be followed on this build, with this data, at least once. It does not prove the script is a good regression test. Exporting the actions into a normal test file is how you leave the model out of the nightly run. I want that export. I also want a person to open it.

Look for three defects in the export:

- A check that was in the case is now a comment, or it is missing.
- A check that was not in the case has appeared. A timeout, a role, an exact error string.
- A step that spends money, deletes data, or changes a password, even though the case said not to.

The first is a dropped oracle. The second is an invented rule. The third is the agent leaving the fence. Any one of them means the file stays a draft.

## A practice

Which of these lines is a check, and which is only a click?

```
1. Click the button labelled Pay now.
2. Check: the order page shows "Paid" and the order id from this run.
3. The payment should work as expected.
```

Line 2 is a check. Line 1 is an action, and it is dangerous if this is not a fake shop. Line 3 cannot fail, so it is not a check. I would delete line 3 before any agent runs the case. If line 1 stays, the setup must say that Pay now does not move real money.

> Write the check in the case. Do not hope the agent will invent a honest one later.

The [plain-case prompt](../../prompts/#plain-case) drafts this shape from a flow you paste in. The [next note](../repair-the-locator-not-the-rule/) is what to do when the exported script later fails because the button moved, not because the shop changed its mind.

---
layout: ../../layouts/Post.astro
title: Repair the locator, not the rule
description: How a self-healing run should propose a new way to find a control, and the edits that are never a repair.
date: "2026-10-15"
minutes: 4
series: "AI in test automation · 3 of 4"
---

Scripts rot when the words on a page move and the selector does not. Chinese write-ups of AI automation spend a lot of time here, because it is the pain people can feel: the test is red, the button is still on the screen, and a person spends the morning finding a new selector. An agent can propose that selector. The dangerous version of the same idea “fixes” the test by changing what it expects.

If the case and the rehearsal are new, start with [write the case, then let a runner try it](../write-the-case-then-run-it/). This note assumes you already have a script.

## A repair is a diff with a fence

<figure class="figure">
  <svg viewBox="0 0 360 560" role="img" aria-labelledby="healTitle healDesc">
    <title id="healTitle">What a locator repair may change</title>
    <desc id="healDesc">A failed locator may be replaced with a new locator that matches the same intent. The check, the skipped state, and any payment step stay outside the repair.</desc>
    <style>
      .t { font: 16px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 13px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.06em; fill: #1e463e; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <text class="h" x="16" y="28">MAY CHANGE</text>
    <rect class="pine" x="16" y="42" width="328" height="48" rx="4"/>
    <text class="t" x="28" y="72">How the script finds the control</text>
    <rect class="pine" x="16" y="102" width="328" height="48" rx="4"/>
    <text class="t" x="28" y="132">A role, name, or label</text>
    <text class="h" x="16" y="186" style="fill:#7a3b2e">MUST NOT CHANGE</text>
    <rect class="clay" x="16" y="200" width="328" height="44" rx="4"/><text class="t" x="28" y="228">The expected result</text>
    <rect class="clay" x="16" y="254" width="328" height="44" rx="4"/><text class="t" x="28" y="282">Whether the test is skipped</text>
    <rect class="clay" x="16" y="308" width="328" height="44" rx="4"/><text class="t" x="28" y="336">A pay, delete, or password step</text>
    <text class="t" x="16" y="390">Intent: the button that signs in.</text>
    <text class="t" x="16" y="418">Old: a css id that is gone.</text>
    <text class="t" x="16" y="446">New: the button named Sign in.</text>
    <text class="t" x="16" y="490">If the new locator is “the first</text>
    <text class="t" x="16" y="514">button on the page”, reject it.</text>
  </svg>
  <figcaption>
    The intent stays in words. The locator may change. The check, the skip flag, and any dangerous step stay put.
  </figcaption>
</figure>

A run I would accept looks like this.

```
Intent: click the button that signs Ada in.
Old locator: #login-btn
Failure: no element matches #login-btn.
Proposed: getByRole('button', { name: 'Sign in' })
Check, unchanged: the next page shows the name Ada.
Retries used: 1 of 3.
```

A run I would reject looks almost helpful.

```
Old check: the next page shows the name Ada.
Proposed check: the page contains the word Welcome.
Also: test.skip() if the button is missing.
```

The second run will go green on a broken sign-in. That is not healing. That is a test learning to look away.

## How many tries

Public notes put a small cap on healing attempts. I agree, and I want the cap written down before the run, not discovered when the bill arrives. Three tries is enough to say “we looked.” After that, stop. A locator that needs ten guesses is not a locator yet. It is a search, and a person should see the page.

Each failed try should come back as a note to the next try: what was missing, what was clicked, what the page showed. A throw that ends the process throws away the only clue. A retry that does not read that clue will click the same wrong thing again.

Save the old locator next to the new one. The review is a comparison, not a feeling that the run is green. If you cannot see the diff, you do not have a repair. You have a silent edit.

## When the red is not a locator

Sort the failure before you call a healer. Three boxes are enough.

**Locator.** The control is on the screen, and the selector missed. A repair may be proposed.

**Product.** The page did something else. The price is wrong, the name is missing, the error is new. Do not heal this. File it, or ask the person who owns the rule.

**Run.** The account was missing, the shop was down, the data was dirty. Fix the setup. Do not teach the script to skip.

Chinese guides that lead with “auto fix” sometimes skip this sort. I would not. Most of the harm in self-healing is a product failure put through the locator door.

## A practice

The sign-in button’s id changed from `login-btn` to `signin`. The visible name is still Sign in. The agent proposes three edits. Which one may you accept?

```
A. Replace #login-btn with getByRole('button', { name: 'Sign in' }).
B. Replace the expected name "Ada" with "Welcome".
C. If the button is missing, skip the test.
```

Only A. B changes the rule. C stops the test from failing. A still needs a person to see that Sign in is one button, not a link in the footer with the same words. If two controls share that name, reject A as well and ask for a tighter locator.

> Green after a repair is not the review. The diff is the review.

The [locator prompt](../../prompts/#locator-repair) asks for an accept or a reject in that shape. The [last note](../start-with-one-job/) is about trying this job first, instead of hiring three agents on the same Monday.

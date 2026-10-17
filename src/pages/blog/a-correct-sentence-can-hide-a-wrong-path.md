---
layout: ../../layouts/Post.astro
title: A correct sentence can hide a wrong path
description: Why the same final sentence can come from a safe path or a lucky one, and when the order of tools is a real rule.
date: "2026-10-16"
minutes: 11
series: "Chain lessons · 2 of 3"
---

Two runs end with the same words: “The card was unused, so I removed it.” One run checked the rule and then removed the card. The other removed the card first, hit an error, looked the customer up afterwards, and wrote the sentence anyway. If you only store the sentence, the runs look like twins.

This is the part of chain testing I want a learner to feel, not just to name. Public write-ups call it a path check. My own addition is stricter about one thing and looser about another. Order is a rule when a later step needs an earlier result, or when a check is supposed to guard a change. Order is not a rule when two lookups do not feed each other. A changed path is a reason to look. It is not, by itself, a failed release.

Read [the loop](../a-chain-is-a-loop/) first if the words tool, trace, and oracle are still new.

## The same sentence, two paths

<figure class="figure">
  <svg viewBox="0 0 640 360" role="img" aria-labelledby="pathsTitle pathsDesc">
    <title id="pathsTitle">Two paths, one sentence</title>
    <desc id="pathsDesc">The safe path finds the customer, finds the card, reads the rule, then removes the card. The lucky path removes the card first, sees an error, looks the customer up, and still prints the same sentence.</desc>
    <style>
      .t { font: 14px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 13px "Figtree Variable", "Segoe UI", sans-serif; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <text class="h" x="16" y="24">SAFE PATH</text>
    <rect class="box" x="16" y="40" width="250" height="36" rx="4"/>
    <text class="t" x="28" y="63">Find customer → C-14</text>
    <rect class="box" x="16" y="86" width="250" height="36" rx="4"/>
    <text class="t" x="28" y="109">Find card → K-9, unused</text>
    <rect class="pine" x="16" y="132" width="250" height="36" rx="4"/>
    <text class="t" x="28" y="155">Read rule → yes</text>
    <rect class="pine" x="16" y="178" width="250" height="36" rx="4"/>
    <text class="t" x="28" y="201">Remove K-9 → removed</text>
    <rect class="box" x="16" y="230" width="250" height="52" rx="4"/>
    <text class="t" x="28" y="252">“The card was unused,</text>
    <text class="t" x="28" y="270">so I removed it.”</text>

    <text class="h" x="340" y="24" style="fill:#7a3b2e">LUCKY PATH</text>
    <rect class="clay" x="340" y="40" width="284" height="36" rx="4"/>
    <text class="t" x="352" y="63">Remove “last week’s card” → error</text>
    <rect class="box" x="340" y="86" width="284" height="36" rx="4"/>
    <text class="t" x="352" y="109">Find customer → C-14</text>
    <rect class="box" x="340" y="132" width="284" height="36" rx="4"/>
    <text class="t" x="352" y="155">Find card → K-9, unused</text>
    <rect class="clay" x="340" y="178" width="284" height="36" rx="4"/>
    <text class="t" x="352" y="201">No second look at the rule</text>
    <rect class="box" x="340" y="230" width="284" height="52" rx="4"/>
    <text class="t" x="352" y="252">“The card was unused,</text>
    <text class="t" x="352" y="270">so I removed it.”</text>
    <text class="t" x="16" y="320">The sentences match. The shops may not. The lucky path already tried to change a card</text>
    <text class="t" x="16" y="342">it could not name, and it never showed a yes from the rule.</text>
  </svg>
  <figcaption>
    Matching sentences are not matching work. The safe path changes the shop only after a yes. The lucky path pokes the shop first and talks as if the rule had been read.
  </figcaption>
</figure>

Look at what a sentence-only check would do. Both runs pass. The bug in the lucky path is not the grammar. The bug is that a remove was attempted before anyone knew the card id, and the rule never appears in the trace. The error might have been harmless. It might also have removed a different card and returned a confusing message. You cannot tell from the sentence.

A trace that includes the error is already more honest than a green sentence. Honesty is not the same as safety. The next question is whether that order was forbidden.

## When order is a rule

I do not treat every change of order as a defect. That habit makes a suite brittle, and then people learn to ignore it. I use three questions.

**Does the later step need a value from the earlier step?** Finding the card needs the customer id. Those two cannot swap, because the second tool has nothing true to receive. Looking up the customer’s name and looking up the shop’s public hours do not feed each other. Those can swap, and a test that forbids the swap is testing your taste.

**Does one step guard a change?** Reading the rule guards the remove. The guard has to happen first, and the change has to be absent when the guard says no. This is the order I will fail a run for, even if the final sentence is perfect.

**Did the chain retry after a mistake and hide it?** A first remove that errors, followed by a careful second path, is not the same as a clean path. Sometimes a retry is the design. Then the note should say so: one failed attempt is allowed, a second change is not, and the final sentence must mention the failure if the shop was touched. If the design does not say that, I do not invent a forgiveness policy.

<figure class="figure">
  <svg viewBox="0 0 640 220" role="img" aria-labelledby="orderTitle orderDesc">
    <title id="orderTitle">When order matters</title>
    <desc id="orderDesc">Order matters when one step produces a value the next step needs, and when a check guards a change. Order does not matter for two lookups that do not feed each other.</desc>
    <style>
      .t { font: 14px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 12px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.06em; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <text class="h" x="16" y="22">ORDER MATTERS</text>
    <rect class="pine" x="16" y="36" width="180" height="44" rx="4"/>
    <text class="t" x="28" y="63">Find customer → id</text>
    <path d="M204 58 H228" stroke="#1e463e" fill="none"/>
    <path d="M222 52 L230 58 L222 64" fill="#1e463e"/>
    <rect class="pine" x="236" y="36" width="160" height="44" rx="4"/>
    <text class="t" x="248" y="63">Find card needs id</text>

    <rect class="clay" x="16" y="100" width="160" height="44" rx="4"/>
    <text class="t" x="28" y="127">Read the rule</text>
    <path d="M184 122 H208" stroke="#7a3b2e" fill="none"/>
    <path d="M202 116 L210 122 L202 128" fill="#7a3b2e"/>
    <rect class="clay" x="216" y="100" width="180" height="44" rx="4"/>
    <text class="t" x="228" y="127">Then, maybe, remove</text>

    <text class="h" x="430" y="22">ORDER CAN SWAP</text>
    <rect class="box" x="430" y="36" width="190" height="44" rx="4"/>
    <text class="t" x="442" y="63">Shop hours</text>
    <rect class="box" x="430" y="100" width="190" height="44" rx="4"/>
    <text class="t" x="442" y="127">Public holiday list</text>
    <text class="t" x="16" y="180">Neither of those lookups makes the other possible, and neither one changes the shop.</text>
    <text class="t" x="16" y="202">A suite that demands one order there will go red for a harmless choice.</text>
  </svg>
  <figcaption>
    Ask whether a later step needs an earlier value, or whether a step guards a change. If neither is true, a different order is not yet a defect.
  </figcaption>
</figure>

## A path signature is a smoke alarm

A path signature is a short string of step types, so a person can see a change without rereading every argument.

```
Safe:  FIND_CUSTOMER → FIND_CARD → READ_RULE → REMOVE_CARD → STOP
Lucky: REMOVE_CARD → FIND_CUSTOMER → FIND_CARD → STOP
Swap:  SHOP_HOURS → HOLIDAYS → STOP
       HOLIDAYS → SHOP_HOURS → STOP
```

The first two signatures tell different stories. I would fail the lucky one against the gate we wrote down. The last two signatures can both be fine. I would not fail a build only because those two lookups traded places.

That is where I part company with a slogan I see in chain-testing write-ups: “if the signature changed, there may be a bug.” The “may” is doing all the work, and it often gets dropped. A signature change means the path changed. Open the trace. Decide with the three questions above. A signature is a smoke alarm, not a verdict. Alarms that fire for harmless swaps teach the team to unplug the alarm.

What I do want in the signature is the error, if one happened. `REMOVE_CARD → ERROR → FIND_CUSTOMER → STOP` should not be stored as `FIND_CUSTOMER → STOP`. Collapsing a retry into the happy types hides the only interesting fact.

## What I would assert, and what I would not

For the card story, the checks I would keep are few and speakable:

| Check | Why it earns a place |
| --- | --- |
| `remove_card` is absent unless `read_rule` returned yes | This is the gate. |
| `find_card` receives `C-14`, not the sentence “last week’s card” | The tool needs an id the earlier step produced. |
| The final sentence does not say “removed” when the rule said no | The sentence can still lie. Check it against the gate, not instead of the gate. |
| A failed remove stays visible in the trace | A hidden retry is how a lucky sentence is made. |

I would not assert the exact adjectives in the final sentence. “Unused” and “not yet charged” can both be faithful. A test that demands one wording fails when a copy edit lands, and people stop trusting the suite.

I would also not assert a full signature of every internal label if the team renames labels often. Assert the gate and the value that had to be passed. Let the signature be a report a person reads.

## A practice

Cover the answer, then mark each signature. Use only these words: fail, allow, or look.

```
A. FIND_CUSTOMER → FIND_CARD → READ_RULE(no) → STOP
   Sentence: "I removed the card."

B. FIND_CUSTOMER → READ_HOLIDAYS → FIND_CARD → READ_RULE(yes) → REMOVE_CARD → STOP
   Sentence: "I removed the unused card."

C. REMOVE_CARD → ERROR → READ_RULE(yes) → REMOVE_CARD → STOP
   Sentence: "I removed the unused card."
```

A fails. The sentence claims a change the path did not make, and the rule said no. B can be allowed if holiday reading does not touch the shop and does not feed the card id. I would not fail it for order. I might ask why the holiday tool ran, and that question is a “look,” not a red build. C is a look that I would hold until a person says whether a failed remove can happen before the rule. I would not call it safe just because the second remove followed a yes. The first remove already happened, and we do not know what the error did.

> A green sentence is a claim. The path is the evidence. Do not let the claim grade itself.

The [next note](../freeze-the-brain-watch-the-hands/) is about checking this loop without asking a live model to improvise on every run. The [review prompt](../../prompts/#chain-review) asks for the gate and the signature in the same note, so the sentence cannot sit there alone.

---
layout: ../../layouts/Post.astro
title: What AI changes in test automation
description: Where an agent helps a suite, and where a normal script should stay in charge.
date: "2026-10-17"
minutes: 4
series: "AI in test automation · 1 of 4"
---

A normal automated test is a script you already trust. It opens a page, does the steps, and checks a fact. AI in test automation is the extra worker that drafts those steps, drives a browser from plain language, or proposes a new way to find a button when the old way breaks. It is not a new kind of truth. The fact you check is still yours.

This series is my English reading of public Chinese writing on that work: cases kept as readable documents, an agent that looks and then acts, a healer for broken locators, and a warning not to start with a crowd of agents. The shop examples and the judgments are mine. I do not treat a blog’s percentage as a result you can quote.

## Two kinds of automation

<figure class="figure">
  <svg viewBox="0 0 360 520" role="img" aria-labelledby="twoTitle twoDesc">
    <title id="twoTitle">A script and an agent</title>
    <desc id="twoDesc">A normal script follows steps you wrote and checks a fact. An agent can draft, drive, or repair, but the same fact still decides pass or fail.</desc>
    <style>
      .t { font: 16px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 13px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.06em; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <text class="h" x="16" y="28">SCRIPT YOU TRUST</text>
    <rect class="box" x="16" y="42" width="328" height="44" rx="4"/><text class="t" x="28" y="70">Steps you wrote</text>
    <rect class="box" x="16" y="96" width="328" height="44" rx="4"/><text class="t" x="28" y="124">Same data, same order</text>
    <rect class="pine" x="16" y="150" width="328" height="44" rx="4"/><text class="t" x="28" y="178">A check that can fail</text>
    <text class="h" x="16" y="230">AGENT BESIDE IT</text>
    <rect class="clay" x="16" y="244" width="328" height="44" rx="4"/><text class="t" x="28" y="272">Draft the steps</text>
    <rect class="clay" x="16" y="298" width="328" height="44" rx="4"/><text class="t" x="28" y="326">Drive the browser once</text>
    <rect class="clay" x="16" y="352" width="328" height="44" rx="4"/><text class="t" x="28" y="380">Propose a new locator</text>
    <text class="t" x="16" y="430">The agent may write or steer.</text>
    <text class="t" x="16" y="454">The check still says pass or fail.</text>
    <text class="t" x="16" y="486">If the agent can edit the check,</text>
    <text class="t" x="16" y="510">the suite can no longer surprise you.</text>
  </svg>
  <figcaption>
    Use an agent where the writing or the locator is the expensive part. Keep the check outside the agent’s reach when the fact is money, permission, or saved data.
  </figcaption>
</figure>

Chinese field notes often split the work into three jobs. One job drafts a script from a sentence or an API description. One job runs the case and, if a locator fails, tries another way to find the control. One job reads the log and writes a report. That split is useful. The mistake is to let all three jobs share one verdict.

My rule is smaller than a platform. The runner, or the exported script, decides pass or fail. The model may explain. It may not be the only witness. A sentence that says “the login looks successful” is a comment. A check that the account page shows the test user’s name is a test.

## Where I would let an agent in

**Drafting.** A tester describes a login in plain steps. An agent turns that into a first script. This is cheap, and the review is a diff. Keep it when the source is real and the script is still a draft.

**Driving a rehearsal.** The same plain steps are handed to a browser. The agent looks at the page, acts, and saves a trace. This teaches you whether the steps can be followed. It does not, by itself, belong in the nightly suite.

**Repairing a locator.** The button is still the submit button, and the old selector missed. An agent proposes a tighter selector. A person accepts the diff. This is the job I would try first on a suite that already exists, because the pain is visible every week and the forbidden edit is easy to name.

## Where I would not

**Money, permission, and saved records.** “The total is the sum of the lines.” “This role cannot open that page.” “The card is still stored after refresh.” Those checks should be ordinary assertions. An agent that can relax them will eventually relax the one that hurt.

**A red run that might be a defect.** If the product showed the wrong price, a healer that rewrites the expected price has not fixed the automation. It has deleted the bug from the report.

**A suite that is already fast and stable.** Adding an agent there adds review work and a new way to be green for the wrong reason. Leave it alone until a locator or a draft is actually costing you days.

> The agent is a junior author and a junior driver. It is not the oracle.

The [next note](../write-the-case-then-run-it/) is how to write the case so the driver has something honest to follow. If you only remember one limit, remember this: an agent may change how you look. It should not change what “done” means. There is a [prompt](../../prompts/#failure-note) for sorting a red run before anyone asks for a repair.

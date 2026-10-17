---
layout: ../../layouts/Post.astro
title: Start with one job, then count
description: Why the first AI automation trial should be a single job on a single path, judged with your own numbers.
date: "2026-10-14"
minutes: 4
series: "AI in test automation · 4 of 4"
---

A pattern shows up in Chinese accounts of AI test automation. A team builds three agents at once. One writes scripts. One runs them and heals locators. One reads the report and declares a verdict. The write-up then offers a large percentage: less writing time, fewer humans, almost no false alarms. The useful sentence is usually near the end, and it is quieter. Do not start with three. Start with the job whose value you can see this month. Then measure.

I will not repeat those percentages as facts. They are claims about someone else’s shop, often without the path, the suite, or the review hours. Your pilot needs your counts. This note is how I would run that pilot. The earlier notes are the jobs themselves: [what changes](../what-ai-changes-in-automation/), [the case](../write-the-case-then-run-it/), and [the locator repair](../repair-the-locator-not-the-rule/).

## Three jobs, one door

<figure class="figure">
  <svg viewBox="0 0 640 250" role="img" aria-labelledby="jobsTitle jobsDesc">
    <title id="jobsTitle">Three jobs and one first choice</title>
    <desc id="jobsDesc">Draft, run-and-repair, and explain are separate jobs. The first trial picks one. Run-and-repair is the usual first choice when a suite already exists. A person reviews the diff before anything is kept.</desc>
    <style>
      .t { font: 14px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 12px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.06em; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <rect class="box" x="16" y="36" width="180" height="70" rx="4"/>
    <text class="t" x="28" y="64">Draft</text>
    <text class="t" x="28" y="86">a case or script</text>
    <rect class="pine" x="220" y="36" width="200" height="70" rx="4"/>
    <text class="t" x="232" y="64">Run and repair</text>
    <text class="t" x="232" y="86">a locator only</text>
    <rect class="box" x="444" y="36" width="180" height="70" rx="4"/>
    <text class="t" x="456" y="64">Explain</text>
    <text class="t" x="456" y="86">a red run</text>
    <text class="h" x="220" y="128">USUAL FIRST JOB</text>
    <path d="M320 106 V148" stroke="#1e463e" fill="none"/><path d="M314 142 L320 150 L326 142" fill="#1e463e"/>
    <rect class="clay" x="160" y="156" width="320" height="52" rx="4"/>
    <text class="t" x="172" y="178">A person reads the diff</text>
    <text class="t" x="172" y="198">before the suite keeps it</text>
  </svg>
  <figcaption>
    Pick one box for the trial. If you already have a suite, run-and-repair is the job with a clear forbidden edit. The person at the bottom is not optional.
  </figcaption>
</figure>

**Draft** fits when writing the first script is the bottleneck, and a person can review a short diff. It fits badly when nobody owns the expected result. The agent will invent one.

**Run and repair** fits when locators break and the checks are already good. The fence is easy to say: change the locator, do not change the assertion, do not skip. This is the job I would start with on a living suite.

**Explain** fits when the log is long and a person still decides the type of failure: locator, product, or broken run. It does not fit as a release judge. An explanation is not a pass.

Some public systems add a planner, a generator, a runner, and a healer, and they insist the runner’s pass or fail wins over the model’s story. I agree with that last rule even if you never build the rest. One recovery owner is enough. If the draft was wrong, send it back to the drafter. If the locator was wrong, send it to the repair. Do not let both rewrite the file in the same hour. And do not try the same failed idea twice and call it progress.

## What to count

Choose one path. Sign-in is a fair path. Checkout with a real charge is not, until the fence is boringly clear. Give the trial a time box you can finish, on the order of a few weeks, not a new platform programme.

| Count | Why it matters |
| --- | --- |
| Confirmed defects the trial found | The point of a test, if there were any. |
| False greens | A repair or a draft that hid a real miss. |
| Hours to review diffs | The cost people forget. |
| Model and run cost | Leave it blank if you did not measure it. |
| The same path in the old suite | So the trial has something to beat. |

Widen the trial only if the false greens stay rare and the review hours are smaller than the hours you got back. Hold if a repaired script went green by weakening a check. Ask if the counts were never written down. “Not counted” is an honest line. A borrowed 60 percent is not.

## A practice

A slide says the healer cut human work by 72 percent. Your notes show twelve locator diffs in three weeks. You reviewed all twelve. Two of them also changed the expected text. You did not count hours.

What is the decision: Proceed, Ask, or Hold?

Hold the widening. Two diffs changed the rule, so the healer left the fence. Ask someone to count review hours before any new path is added. Do not Proceed on the 72 percent. That number is not yours.

> One job, one path, your own counts. Then decide.

The [pilot desk](../../desk/) is a page for that note. The [one-job prompt](../../prompts/#one-job) forces a single choice before the trial starts.

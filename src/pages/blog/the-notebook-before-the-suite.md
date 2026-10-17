---
layout: ../../layouts/Post.astro
title: The notebook before the suite
description: Five lines to write before a suite, a model, or a tool decides what a change means.
date: "2026-03-12"
minutes: 5
---

Four hundred automated checks can be green while nobody in the room can say what the last change was for. The release note says “minor fixes.” The suite agrees. The conversation does not.

That order is easy to keep. A model will draft cases, scripts, and a strategy before anyone has said, in ordinary words, what the change is for. The writing looks finished. The understanding can still be thin.

I keep five lines in front of the tools. They are not a form to file. They are a way to find out whether I am ready to test.

**Change.** Two sentences, in words a customer could follow. If the sentence only works with the ticket’s adjectives, it is not ready.

**Who it touches.** A person, a role, or a downstream system. “Users” is too wide to aim at. “Someone who saved a card and came back on another phone” is a start.

**I will not test.** The edge left for later, written down so it is a choice and not an accident.

**I will stop if.** The observation that ends the session: data I cannot trust, a build that is not the one we named, a flow I cannot repeat.

**Evidence lives.** A folder, a comment, a link. If the evidence has no home, it will not survive the afternoon.

Here is a filled page for an imaginary shop that lets a returning customer store a card and pay with it later.

```
Change: A returning customer can store a card and choose it at the next checkout. The shop does not charge the card when it is saved.
Who it touches: A customer with an account, and the support person who will be asked why a charge appeared.
I will not test: Expired cards, wallets, and more than one saved card.
I will stop if: The test shop charges a real card, or I cannot see whether saving the card sent a payment.
Evidence lives: A short note on the ticket, with the request I captured and the screen after refresh.
```

None of those lines required a tool. Two of them would have stopped a bad session early. The line about expired cards would have stopped me from calling a small pass “done.”

> If you cannot write the five lines, that is the finding.

A model can draft the five lines. That is a fair use of it. I still read them against the source, because a draft will invent a rule the ticket never stated. If the ticket does not say whether the card is charged at save time, the notebook should say “not stated,” not a guess that sounds like a requirement.

The suite can come after. When it does, I want each new check to point at one of the lines. A test that does not connect to the change, the person, or a risk I named is a test I have not earned yet. The notebook is not an argument against automation. It is the reason a particular check exists.

The lines go wrong in a few ordinary ways.

They get copied from the ticket. If the two sentences are the ticket with the verbs shuffled, nobody has read the change. Say it as you would to a teammate who has not opened the ticket.

They get used as a gate that blocks all work. Five lines are a start, not a permit. A person who can write them can also begin. A person who cannot write them should say so, and then ask the question that is stuck.

They get polished until they sound finished. “Not stated” is a better line than a smooth guess. The point of the page is the gap you can see, not the confidence you can perform.

I keep the page next to the work, not in a separate archive. When the session ends, the note should still say what was left out. That sentence is the one I trust a week later, when someone asks whether the change was tested.

Five lines will not hold a large program. They are the wrong shape for a yearly plan, a compliance map, or a performance study. They are the right shape for the change on the desk today. There is a [blank practice page](../../desk/) for writing them, and a later note on [what to do when a model sounds sure](../fluency-is-not-coverage/).

Write the lines before you open the suite. If you cannot, stop there. That is already something worth saying.

The same five lines change shape when the work is a tool-calling chain. The “change” is the job the assistant was asked to do. “Who it touches” includes the tool that can move money or delete a record. “I will not test” names the live model if you only ran a script. A chain can print a tidy sentence after doing the wrong jobs, so the evidence line has to point at the trace, not only at the sentence. That lesson is written out, with diagrams, in [a chain is a loop](../a-chain-is-a-loop/).

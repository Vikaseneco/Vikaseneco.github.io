---
layout: ../../layouts/Post.astro
title: A chain is a loop, not one answer
description: What a tool-calling chain is, how it differs from a straight check, and which steps you need to write down before you can learn from it.
date: "2026-10-17"
minutes: 12
series: "Chain lessons · 1 of 3"
---

A tester asks an assistant a question, reads the last sentence, and feels finished when the sentence sounds right. That habit works for a calculator. It does not work for a chain. A chain can do the wrong jobs, in the wrong order, and still end on a sentence you would happily paste into a ticket.

This note is my own reading of public writing about tool-call chains. I turned the idea into plain English and a shop story I invented for this desk. The pictures are here so you can learn the shape before you learn the jargon.

## Words worth keeping

**A tool** is a small job the model cannot do by itself. Look up an order. Read a policy. Remove a saved card. The model can only write text. The tool is what actually touches the shop.

**A chain** is the loop around those tools. The assistant decides, a tool runs, the assistant reads what came back, and it decides again. It stops when it writes a final sentence, when it runs out of turns, or when a person stops it.

**A trace** is the list of those steps, in order. Each step should show the words that went in and the words that came out. If you only keep the final sentence, you do not have a trace.

**An oracle** is the fact you will compare against. “The assistant was helpful” is not an oracle. “No card is removed until the order has been found” is an oracle, because a person can look and say yes or no.

## Three shapes, three different notes

People often put every “AI test” in one pile. The shape of the work tells you what to save.

<figure class="figure">
  <svg viewBox="0 0 640 430" role="img" aria-labelledby="shapesTitle shapesDesc">
    <title id="shapesTitle">Three shapes of a check</title>
    <desc id="shapesDesc">A straight check goes from input to one result. A search goes question, notes, draft, answer. A chain loops between a decision and a tool before it answers.</desc>
    <style>
      .t { font: 15px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .s { font: 600 12px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.08em; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <text class="s" x="8" y="22">1 · A STRAIGHT CHECK</text>
    <rect class="box" x="8" y="36" width="150" height="48" rx="4"/>
    <text class="t" x="24" y="66">Input: 2 + 2</text>
    <path d="M166 60 H196" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M190 54 L198 60 L190 66" fill="#5c564c"/>
    <rect class="box" x="204" y="36" width="120" height="48" rx="4"/>
    <text class="t" x="236" y="66">add</text>
    <path d="M332 60 H362" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M356 54 L364 60 L356 66" fill="#5c564c"/>
    <rect class="pine" x="370" y="36" width="120" height="48" rx="4"/>
    <text class="t" x="400" y="66">Result: 4</text>
    <text class="t" x="508" y="66">Save both ends.</text>

    <text class="s" x="8" y="128">2 · SEARCH, THEN WRITE</text>
    <rect class="box" x="8" y="142" width="130" height="48" rx="4"/>
    <text class="t" x="22" y="172">Question</text>
    <path d="M146 166 H170" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M164 160 L172 166 L164 172" fill="#5c564c"/>
    <rect class="box" x="176" y="142" width="130" height="48" rx="4"/>
    <text class="t" x="196" y="172">Find notes</text>
    <path d="M314 166 H338" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M332 160 L340 166 L332 172" fill="#5c564c"/>
    <rect class="box" x="344" y="142" width="110" height="48" rx="4"/>
    <text class="t" x="372" y="172">Draft</text>
    <path d="M462 166 H486" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M480 160 L488 166 L480 172" fill="#5c564c"/>
    <rect class="pine" x="492" y="142" width="130" height="48" rx="4"/>
    <text class="t" x="524" y="172">Answer</text>
    <text class="t" x="8" y="216">One planned middle step. Save which notes were used, not only the answer.</text>

    <text class="s" x="8" y="258">3 · A CHAIN</text>
    <rect class="box" x="8" y="274" width="120" height="48" rx="4"/>
    <text class="t" x="28" y="304">Question</text>
    <path d="M136 298 H164" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M158 292 L166 298 L158 304" fill="#5c564c"/>
    <rect class="clay" x="170" y="274" width="130" height="48" rx="4"/>
    <text class="t" x="196" y="304">Decide</text>
    <path d="M308 298 H336" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M330 292 L338 298 L330 304" fill="#5c564c"/>
    <rect class="box" x="342" y="274" width="120" height="48" rx="4"/>
    <text class="t" x="376" y="304">Use tool</text>
    <path d="M470 298 H498" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M492 292 L500 298 L492 304" fill="#5c564c"/>
    <rect class="box" x="504" y="274" width="128" height="48" rx="4"/>
    <text class="t" x="520" y="304">Read result</text>
    <path d="M568 322 V360 H235 V322" stroke="#7a3b2e" fill="none" stroke-width="1.5"/>
    <path d="M229 330 L235 322 L241 330" fill="#7a3b2e"/>
    <text class="t" x="250" y="352">Loop until it stops</text>
    <rect class="pine" x="170" y="372" width="292" height="44" rx="4"/>
    <text class="t" x="214" y="400">Final sentence — save this last, not first</text>
  </svg>
  <figcaption>
    A straight check has two ends. A search has one planned middle. A chain chooses the next tool after it sees the last result, so the final sentence is the last thing to trust, not the first.
  </figcaption>
</figure>

A search-then-write system and a chain both “call something in the middle.” That similarity fools people. In a search, the plan is already a line: find notes, then write. In a chain, the next tool is a choice. The choice can change because of what the last tool returned. Your notes have to show that choice.

My own rule is small. If the next step was fixed before the run started, save the inputs and the output. If the next step was chosen after a result came back, save every choice. Calling both of those “an AI test” hides the work.

## A shop story

A returning customer says: “Take off the card I saved last week. I never used it.”

The shop has four tools, and one rule a person already wrote down:

1. **Find the customer.** The name in the chat is not enough if two people share it.
2. **Find the saved card.** Confirm it belongs to that customer.
3. **Read the rule.** A card that was saved and never charged may be removed. A card that was charged needs a person.
4. **Remove the card.** Only after the rule says yes.

Here is a trace I would accept as a starting note. It is not a log from a real product. It is the shape of a good note.

```
1. Customer says: remove the card saved last week.
2. find_customer("Ada Okonkwo") → one account, id C-14.
3. find_card(C-14) → one card, saved, never charged, id K-9.
4. read_rule(K-9) → "saved and unused: a tester may remove it."
5. remove_card(K-9) → "removed."
6. Assistant says: "I removed the unused card."
```

Read it from the top, not from the last line. Step 6 is allowed only because step 4 said yes, and step 5 is the only place the shop changed. If step 4 had said “needs a person,” step 5 should be absent, and step 6 should say that a person has to decide.

<figure class="figure">
  <svg viewBox="0 0 640 300" role="img" aria-labelledby="shopTitle shopDesc">
    <title id="shopTitle">A refund chain with a gate</title>
    <desc id="shopDesc">Find the customer, find the card, read the rule. Only a yes from the rule may remove the card. A no stops before any change.</desc>
    <style>
      .t { font: 15px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <rect class="box" x="16" y="24" width="148" height="64" rx="4"/>
    <text class="t" x="32" y="50">1. Find customer</text>
    <text class="t" x="32" y="72">Ada → C-14</text>
    <path d="M172 56 H196" stroke="#5c564c" fill="none"/>
    <path d="M190 50 L198 56 L190 62" fill="#5c564c"/>
    <rect class="box" x="204" y="24" width="148" height="64" rx="4"/>
    <text class="t" x="220" y="50">2. Find card</text>
    <text class="t" x="220" y="72">C-14 → K-9</text>
    <path d="M360 56 H384" stroke="#5c564c" fill="none"/>
    <path d="M378 50 L386 56 L378 62" fill="#5c564c"/>
    <rect class="clay" x="392" y="24" width="220" height="64" rx="4"/>
    <text class="t" x="408" y="50">3. Read the rule</text>
    <text class="t" x="408" y="72">yes, or ask a person</text>

    <path d="M500 88 V130 H250" stroke="#1e463e" fill="none" stroke-width="1.5"/>
    <text class="t" x="300" y="124">yes</text>
    <rect class="pine" x="80" y="146" width="220" height="64" rx="4"/>
    <text class="t" x="96" y="172">4. Remove card K-9</text>
    <text class="t" x="96" y="194">The shop changes here</text>

    <path d="M500 88 V220 H430" stroke="#7a3b2e" fill="none" stroke-width="1.5"/>
    <text class="t" x="430" y="160">no</text>
    <rect class="clay" x="250" y="236" width="300" height="48" rx="4"/>
    <text class="t" x="266" y="266">Stop. Do not remove the card.</text>
  </svg>
  <figcaption>
    The rule is a gate. A yes may change the shop. A no must stop. The final sentence is not the gate.
  </figcaption>
</figure>

## What to write before you run anything

Five lines are enough to start. They are the same habit as a short notebook, pointed at a chain.

**The job.** One sentence a customer could follow. “Remove a saved card that was never charged.”

**The tools that exist.** Their names, in the product’s words. If you do not know the names yet, say “names not in source.” Do not invent a tool because the story needs one.

**The gate.** The check that must pass before money, a card, or a record changes.

**The sentence you will allow.** What the assistant may claim, and what it must not claim if the gate said no.

**Where the trace lives.** A file, a log link, a comment. A sentence with no trace cannot be reviewed tomorrow.

A model can draft these lines. Read them against the source. If the ticket never says whether a saved card is charged at save time, the note says “not stated.” A smooth guess is worse than a gap you can see.

## A short practice

Here is a bad trace for the same request. Find the first step that breaks the rule. Then read the answer under it. The point is to practice the look, not to hide the ending.

```
1. Customer says: remove the card saved last week.
2. remove_card("the card saved last week") → "removed."
3. find_customer("Ada Okonkwo") → no account.
4. Assistant says: "Done. I removed the card."
```

The first bad step is step 2. The chain changed the shop before it knew who the customer was, and it passed the customer’s sentence to the tool instead of an id. Step 3 then shows there was no account. Step 4 still claims success. A review that only read step 4 would miss all of that.

> Keep the trace above the sentence. The sentence is what the chain wants you to remember. The trace is what it did.

## Where this note stops

A clear happy path is a lesson. It is not evidence that a live model will choose that path. Two chains can print the same sentence and only one of them may touch the shop. That is the [next note](../a-correct-sentence-can-hide-a-wrong-path/). After that, [freeze the brain and watch the hands](../freeze-the-brain-watch-the-hands/) shows how to test the loop without paying for a live model on every run.

The [chain prompt](../../prompts/#chain-review) is a starter for the five lines. It does not decide that the chain is safe.

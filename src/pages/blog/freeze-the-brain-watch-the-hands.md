---
layout: ../../layouts/Post.astro
title: Freeze the brain and watch the hands
description: How to test a tool-calling loop with a scripted brain, what that run is allowed to prove, and the one failure you should include.
date: "2026-10-15"
minutes: 12
series: "Chain lessons · 3 of 3"
---

A live model will not hand you the same decision twice. That is a poor reason to skip the test. For the loop you wrote, you can freeze the decisions. You write them down in order, you give them to the loop, and you watch what the code does with its tools. The model’s judgment is a different question, and this note keeps the two questions apart.

Public tutorials often say the same thing in a louder way: mock the brain, record the hands, replay the path. I agree with the split. I do not agree that a large pile of checks is the point. A few checks that would go red for a reason you can say out loud are worth more than a hundred checks of one happy script. And a green scripted run must never be written up as “the assistant works.”

If you have not met the loop yet, start with [a chain is a loop](../a-chain-is-a-loop/) and then [the wrong path](../a-correct-sentence-can-hide-a-wrong-path/).

## What you freeze, and what you watch

<figure class="figure">
  <svg viewBox="0 0 640 300" role="img" aria-labelledby="benchTitle benchDesc">
    <title id="benchTitle">A scripted test of a chain</title>
    <desc id="benchDesc">A scripted brain feeds fixed decisions into the loop. The loop calls tools. A recorder writes the tool name, the arguments, and the order. Assertions read the recorder. They do not ask the script whether it feels correct.</desc>
    <style>
      .t { font: 14px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 12px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.06em; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <text class="h" x="16" y="22">SCRIPTED BRAIN</text>
    <rect class="clay" x="16" y="36" width="250" height="118" rx="4"/>
    <text class="t" x="28" y="62">1. Call find_customer</text>
    <text class="t" x="28" y="84">2. Call find_card</text>
    <text class="t" x="28" y="106">3. Call read_rule</text>
    <text class="t" x="28" y="128">4. Stop with a sentence</text>
    <text class="t" x="16" y="176">Fixed on purpose. This is not wisdom.</text>

    <path d="M274 96 H312" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M306 90 L314 96 L306 102" fill="#5c564c"/>
    <text class="h" x="330" y="22">THE LOOP YOU WROTE</text>
    <rect class="box" x="322" y="36" width="140" height="118" rx="4"/>
    <text class="t" x="338" y="70">Read a decision</text>
    <text class="t" x="338" y="94">Call the tool</text>
    <text class="t" x="338" y="118">Feed the result</text>
    <text class="t" x="338" y="142">Or stop</text>

    <path d="M470 96 H500" stroke="#5c564c" fill="none" stroke-width="1.5"/>
    <path d="M494 90 L502 96 L494 102" fill="#5c564c"/>
    <text class="h" x="508" y="22">RECORDER</text>
    <rect class="pine" x="508" y="36" width="116" height="118" rx="4"/>
    <text class="t" x="520" y="70">Which tool</text>
    <text class="t" x="520" y="94">Which args</text>
    <text class="t" x="520" y="118">Which order</text>
    <text class="t" x="520" y="142">Any error</text>
    <text class="t" x="322" y="190">The tools can be real or simple stand-ins.</text>
    <text class="t" x="322" y="212">The recorder does not grade the script.</text>
    <text class="t" x="322" y="234">It writes what the loop actually did.</text>
    <text class="t" x="16" y="268">You then assert against the recorder. A check that only rereads the script can never fail.</text>
  </svg>
  <figcaption>
    The script is the brain you froze. The loop is the code under test. The recorder is how you know what the hands did. Assert against the recorder, not against your own script.
  </figcaption>
</figure>

Think of a play. The script says what the actor should attempt. The test watches the stage. If you only check that the script still contains the words you typed, you have not tested the play. I have seen suites that do this by accident: they assert the mock’s planned list, the mock returns that list, and the test is green even when the loop ignored it.

A useful scripted run answers one question. When the brain says “call this tool with this argument,” does our loop call that tool with that argument, keep the result, and stop when it is told to stop?

It does not answer a second question. Would a live model have chosen that tool? Keep those questions in different notes. Mixing them is how a cheap green run gets described as a product that works.

## Three runs, three permitted claims

| Run | What you did | What you may write | What you may not write |
| --- | --- | --- | --- |
| Scripted brain | You fed fixed decisions. No live model. | “The loop obeyed this script.” | “The assistant understands the customer.” |
| Recording, played back | A live model spoke once. You saved the reply and reuse it. | “The loop still handles this saved reply.” | “The model will say this again.” |
| Live smoke | A real model ran, a small number of times. | “On this day, this model once did this.” | “The chain is safe” or “all paths pass.” |

The scripted run is the one I want in the everyday suite. It is fast, it does not spend a budget, and it fails for a reason you can point at. The playback run is how you notice that a real reply has a shape your parser does not expect. The live smoke is a sample. A sample can surprise you. It cannot carry a release on its own.

A live smoke that passed yesterday and fails today may be the model, the tool, or the network. Do not silently replace it with a script and call the failure gone. Write down which question you stopped asking.

## The checks that earn a place

For the shop chain, I would keep four. Each one fails for a reason a teammate can repeat.

**The tool name.** If the script says `find_card` and the recorder shows `remove_card`, the loop picked up the wrong hand. Include one script that is supposed to go red when the wrong tool is used, and run that negative check on purpose. A suite that has never failed cannot teach you that it can catch a miss.

**The argument.** `find_card` should receive `C-14`, the id from the previous result. It should not receive the raw sentence “the card I saved last week.” This is the check that catches a chain which looks busy and still passes the customer’s words through untouched.

**The gate.** If the scripted rule says no, the recorder must not contain `remove_card`. This is the same gate as the [path note](../a-correct-sentence-can-hide-a-wrong-path/), now checked without a live model.

**The memory of the earlier turn.** A second message says “the other one.” The next request to the model, or the argument to the tool, must still contain the fact from turn one. If turn one found card `K-9`, turn two must not send the words “the other one” as if they were an id. The final sentence can sound right either way. Look at what was sent.

<figure class="figure">
  <svg viewBox="0 0 640 230" role="img" aria-labelledby="turnsTitle turnsDesc">
    <title id="turnsTitle">A second turn must carry the first fact</title>
    <desc id="turnsDesc">Turn one finds card K-9. Turn two says only the other one. A good chain sends K-9 onward. A bad chain sends the words the other one as if they were an id.</desc>
    <style>
      .t { font: 14px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 12px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.06em; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <text class="h" x="16" y="22">TURN 1</text>
    <rect class="box" x="16" y="36" width="280" height="44" rx="4"/>
    <text class="t" x="28" y="63">“The card I saved last week.”</text>
    <rect class="pine" x="16" y="92" width="280" height="44" rx="4"/>
    <text class="t" x="28" y="119">Tool returns card id K-9</text>

    <text class="h" x="340" y="22">TURN 2 · “THE OTHER ONE”</text>
    <rect class="pine" x="340" y="36" width="284" height="44" rx="4"/>
    <text class="t" x="352" y="63">Good: next call still has K-9</text>
    <rect class="clay" x="340" y="92" width="284" height="44" rx="4"/>
    <text class="t" x="352" y="119">Bad: tool receives “the other one”</text>
    <text class="t" x="16" y="170">Check the request that left the loop, not the polite sentence at the end.</text>
    <text class="t" x="16" y="194">“I used the other card” can be said by both the good path and the bad one.</text>
  </svg>
  <figcaption>
    “The other one” is not an id. A useful check looks at the next tool call, or at the next request to the model, and asks whether K-9 is still there.
  </figcaption>
</figure>

## Put one failure in the script

Happy scripts teach the team that the loop can follow orders. They do not teach what the loop does when a tool refuses. Add one script on purpose:

```
Decision: remove_card(K-9)
Tool returns: error, card not removed
Decision: the script ends, with no success sentence supplied
```

The loop should stop in a way a person can see. It should not print “I removed the card.” If the script runs out and the loop invents a success, that is the bug. This is the check I trust more than a long list of happy asserts, because it fails closed. A chain that guesses a happy ending is more dangerous than a chain that stops and says it does not know.

If your fake tool can only return the sunny sentence, it cannot show you this. Give the stand-in at least two replies: a normal result, and an error. The error does not need to be realistic in every field. It needs to be impossible to mistake for success.

## What I leave out on purpose

I do not start by asserting every internal label, every log line, and the exact punctuation of the final sentence. Those checks break when someone renames a step or edits a word, and the suite becomes something people skip. I also do not count the number of asserts and treat the count as coverage. Forty checks of one script are one path, told forty times.

I do not turn a dry run into a release note. “The script passed” belongs in the test report. The release note still needs a person to say whether the live model, the real tools, and the real rule were in scope. If they were not, write “not tried.”

A scripted brain is also a poor place to hide product rules the team has not agreed. If the script says the card expires in fifteen minutes, and the ticket never said that, the test is now fiction with a green check. Mark that rule as invented, the same way you would mark an invented test case. The [three marks](../fluency-is-not-coverage/) still apply. Freezing the brain does not make the script true.

> Freeze the decisions so the loop can be seen. Do not freeze a guess and call it the product.

## A practice

You have this script and this recorder. What may you claim?

```
Script: find_customer → find_card → read_rule(yes) → remove_card → stop
Recorder: find_customer(C-14) → find_card(C-14) → read_rule(K-9, yes) → remove_card(K-9) → stop
No live model was called.
```

You may claim that the loop followed this script and passed the ids through. You may not claim that a real assistant would choose these tools, or that every saved card in the shop is safe to remove. The next honest line in the report is: “Live model: not tried.”

When you want a draft of that report, use the [chain prompt](../../prompts/#chain-review) and then delete any sentence the recorder does not support.

---
layout: ../../layouts/Post.astro
title: The model, the harness, and the bot
description: "A plain-English map for a senior tester: the language model, why the work is hard, the harness, open-source tools, the system prompt, tool names, the conversation, free space, and the bot."
date: "2026-10-17"
minutes: 15
series: "AI in test automation · for a senior reviewer"
dropcap: false
toc:
  - id: model
    label: The model
  - id: hardness
    label: Why it is hard
  - id: harness
    label: The harness
  - id: tools
    label: Open-source tools
  - id: system-prompt
    label: System prompt
  - id: tool-names
    label: Tool names
  - id: conversation
    label: Conversation
  - id: free-space
    label: Free space
  - id: bots
    label: Bots
---

This note is for a senior engineer who will review AI inside a test suite. You do not need a new vocabulary before you can say yes or no. You need the parts, in order, and a picture of how a message becomes a click.

The parts are the language model, the hardness of the work, the harness around the model, the open-source tools a team will actually install, the system prompt, the tool names and their details, the conversation, the free space left in that conversation, and the bot that ties them into a loop. Chinese writing on AI test automation uses these same parts, often under product names. The judgments below are mine. I do not ask you to adopt a product. I ask you to be able to point at each part in a review.

<h2 id="model">What an LLM is</h2>

LLM means large language model. The useful picture is not “a brain that knows your product.” The useful picture is a program that, given the text so far, guesses the next piece of text. It was trained on a huge amount of writing. It is very good at continuing a pattern. It is not a database, and it does not look up your shop unless a tool does that look-up and puts the result back into the text.

That is why a model can write a test that looks finished and still be wrong. The pattern of a test is familiar. The rule of your shop may never have been in the text you sent. The model fills the gap with a likely sentence. A senior reviewer treats that sentence as a draft, the same way you would treat a draft from a new teammate who has not read the ticket.

A model call is one guess, or a short run of guesses, for one prompt. It does not remember yesterday unless the harness pastes yesterday back in. It does not click a browser unless the harness runs a tool the model named. When someone says “the model signed in,” they are compressing five parts into one word. Ask them to separate the parts.

<h2 id="hardness">Why the work is hard</h2>

People call this hardness. The hardness is not that the model is mysterious. The hardness is that several things can go wrong, and a green sentence hides which one it was.

**The model can choose a different next step on a second run.** The same case can produce a different click. A nightly suite cannot depend on that choice unless you freeze it into a script.

**The tool can be the wrong tool.** The model meant to look, and it paid. Or it meant to assert, and it edited the expected text.

**The argument can be the wrong argument.** The customer said “the other one.” The tool received those words instead of the id from the previous turn.

**The conversation can forget.** A rule written at the start no longer fits. The model never sees it again. It does not announce that.

**The report can come from the wrong speaker.** The bot says pass. The test runner never ran the check.

None of these is fixed by a larger model. A larger model writes a more fluent wrong answer. The review is still: which part failed, and which part is allowed to say pass.

<h2 id="harness">The harness</h2>

The harness is the program around the model. Engineers also say “agent framework” or “the shell.” I use harness because it names the job: it holds the model in place and gives it a way to act.

<figure class="figure">
  <svg viewBox="0 0 360 532" role="img" aria-labelledby="harnessTitle harnessDesc">
    <title id="harnessTitle">The model sits inside a harness</title>
    <desc id="harnessDesc">The harness holds the system prompt, the tool list, the conversation, and the free space. The model only sees text. The harness runs the tool the model names and writes the result back into the conversation.</desc>
    <style>
      .t { font: 16px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 13px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.06em; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <rect class="box" x="8" y="8" width="344" height="516" rx="6"/>
    <text class="h" x="20" y="36">HARNESS</text>
    <rect class="clay" x="20" y="52" width="320" height="68" rx="4"/>
    <text class="t" x="32" y="78">System prompt</text>
    <text class="t" x="32" y="102">Sent with every call</text>
    <rect class="box" x="20" y="132" width="320" height="68" rx="4"/>
    <text class="t" x="32" y="158">Tool list</text>
    <text class="t" x="32" y="182">Names and details</text>
    <rect class="box" x="20" y="212" width="320" height="68" rx="4"/>
    <text class="t" x="32" y="238">Conversation so far</text>
    <text class="t" x="32" y="262">What was said and returned</text>
    <rect class="pine" x="20" y="292" width="320" height="112" rx="4"/>
    <text class="t" x="32" y="320">The model</text>
    <text class="t" x="32" y="344">Sees text. Guesses text.</text>
    <text class="t" x="32" y="368">Does not touch the shop.</text>
    <rect class="box" x="20" y="416" width="320" height="88" rx="4"/>
    <text class="t" x="32" y="448">Free space</text>
    <text class="t" x="32" y="472">What still fits in the window</text>
  </svg>
  <figcaption>
    The model does not hold the rules, the tools, or the memory. The harness does. If a review cannot find the harness, the team is reviewing a chat box and calling it a test system.
  </figcaption>
</figure>

A harness, at minimum, does four things.

1. It sends the system prompt with every call.
2. It shows the model a list of tools, each with a name and a description.
3. It keeps the conversation: what the person said, what the model said, what the tools returned.
4. It runs the tool the model picked, then pastes the result back as the next message.

Playwright, by itself, is not a harness for a model. It is a library that clicks and checks. A harness is what decides to call Playwright because the model wrote “click Sign in.”

<h2 id="tools">Open-source tools a senior will meet</h2>

You do not need every project. You need to know which program is the driver, which program is the model’s hands, and which program says pass.

**Playwright** is the open-source browser library and test runner from Microsoft. A normal test is TypeScript or JavaScript. `expect` is the check. If `expect` fails, the test is red, whatever a chat window says. This is the program I want in the “who says pass” line of a review.

**Playwright’s own test agents** are a documented split of jobs around that runner. A planner explores and writes a markdown plan. A generator turns the plan into a Playwright file. A healer runs the file and proposes a repair when it fails. The useful part for you is the split, not the brand. The plan is readable. The generated file is a diff. The healer must not be the one who decides the expected result. The runner still is.

**Midscene** is an open-source UI agent from the same community that publishes a lot of the Chinese notes on AI automation (`web-infra-dev/midscene`). It sits beside Playwright. In a test you will see calls with plain-language names: `aiAct` for a short task, `aiTap` and `aiInput` for a click and a type, `aiAssert` for a check described in words, `aiQuery` for reading a value off the page. It can replan when a step fails. The docs expose a limit on how many times it may replan, and a way to prepend an extra system prompt for a private model. Those two knobs are the ones I would read before I would read a dashboard. A replan limit of dozens is a search, not a case. An extra system prompt is a standing order. Both belong in the review.

**A browser tool server**, often spoken of as MCP, is a list of named tools a coding bot can call. A common open list looks like this: `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_take_screenshot`. The names differ by product. Midscene’s older browser server used names such as `midscene_aiTap`, `midscene_aiInput`, and `midscene_aiAssert`. The lesson does not depend on one spelling. The lesson is that each name is a capability you either meant to give the bot or you did not.

I would not start a senior review by picking a winner among these. I would write three lines: which program drives the browser, which program calls the model, and which report is allowed to be red.

<h2 id="system-prompt">The system prompt</h2>

The system prompt is the standing instruction. It is not the case. The case is “sign Ada in and see her name.” The system prompt is “you are a test assistant; here is how you choose tools; here is the shape of your reply,” sent again on every call.

Teams add an extra system prompt when a private or self-hosted model needs a format the harness already assumes, for example “reply as JSON.” That is a fair reason. The failure mode is a second sentence in the same prompt: “always finish,” “prefer a passing result,” “if the button is missing, skip.” That sentence now applies to planning, clicking, and asserting, because the extra prompt is prepended to all of them.

Read the prompt the way you would read a global test setup file. Underline anything that can change pass into fail or fail into pass. A format rule can stay. A success preference cannot.

> The case is this run. The system prompt is every run. A bad line in the prompt outlives the case that made you notice it.

The [standing-instructions skill](../../skills/#system-prompt) is the short method. The [prompt](../../prompts/#system-prompt) is the starter you paste the real text into.

<h2 id="tool-names">Tool names and tool details</h2>

A tool is a function the harness can run. The model does not run it. The model returns a name and arguments. The harness matches the name and runs the function.

Each tool the model is allowed to see has three details:

**Name.** The exact string, such as `browser_click` or `aiAssert`. The model copies this string. A vague name like `do_it` is a defect in the tool list.

**Description.** One or two sentences the model reads when it chooses. “Click something” will click the wrong thing. “Click the button whose accessible name you were given” is a description. This text is part of the product, even though it is not in the shop’s UI.

**Arguments.** The fields the call must include. A click needs a target. A type needs a target and a text. An assert needs the fact, not a new fact the model prefers. If the argument list lets the model replace the expected name, the tool is not an assert. It is an editor.

<figure class="figure">
  <svg viewBox="0 0 360 480" role="img" aria-labelledby="toolTitle toolDesc">
    <title id="toolTitle">One tool, three details</title>
    <desc id="toolDesc">A tool has a name the model copies, a description the model reads, and arguments the harness will pass to the real function. The model proposes the call. The harness runs it.</desc>
    <style>
      .t { font: 16px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .h { font: 600 13px "Figtree Variable", "Segoe UI", sans-serif; letter-spacing: 0.06em; fill: #1e463e; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <text class="h" x="16" y="28">WHAT THE MODEL SEES</text>
    <rect class="clay" x="16" y="42" width="328" height="156" rx="4"/>
    <text class="t" x="28" y="74">Name: browser_click</text>
    <text class="t" x="28" y="106">Description: click the</text>
    <text class="t" x="28" y="130">control you were given</text>
    <text class="t" x="28" y="170">Arguments: target</text>
    <text class="h" x="16" y="236">WHAT THE HARNESS RUNS</text>
    <rect class="pine" x="16" y="250" width="328" height="200" rx="4"/>
    <text class="t" x="28" y="282">Match the name</text>
    <text class="t" x="28" y="314">Refuse names not on the list</text>
    <text class="t" x="28" y="346">Run the browser click</text>
    <text class="t" x="28" y="378">Paste the result</text>
    <text class="t" x="28" y="402">back as text</text>
  </svg>
  <figcaption>
    Review the list the model sees, not only the functions in the repository. A function the model cannot name cannot be called. A function it can name will be called.
  </figcaption>
</figure>

For a sign-in bot I would expect look, type, click, and assert. I would not expect `pay` or `delete_user` on that list, even if some other assistant in the company has them. Tools are not inherited by enthusiasm. The [tool-list skill](../../skills/#tool-list) walks that cut.

<h2 id="conversation">The conversation</h2>

The conversation is the list of messages. Order is the memory. A typical turn looks like this.

<figure class="figure">
  <svg viewBox="0 0 360 484" role="img" aria-labelledby="turnTitle turnDesc">
    <title id="turnTitle">One turn of a test bot</title>
    <desc id="turnDesc">The person or the case speaks. The model answers with a tool name and arguments. The harness runs the tool. The tool result is appended. The model then writes the next step or a final sentence. The test runner, not the sentence, decides pass.</desc>
    <style>
      .t { font: 16px "Figtree Variable", "Segoe UI", sans-serif; fill: #221e1a; }
      .box { fill: #fbf8f2; stroke: #d9d0c2; }
      .pine { fill: #e7f0ee; stroke: #1e463e; }
      .clay { fill: #f6ebe6; stroke: #7a3b2e; }
    </style>
    <rect class="box" x="16" y="12" width="328" height="72" rx="4"/>
    <text class="t" x="28" y="40">1. System prompt is attached</text>
    <text class="t" x="28" y="64">then the case: sign Ada in</text>
    <rect class="clay" x="16" y="96" width="328" height="72" rx="4"/>
    <text class="t" x="28" y="124">2. Model: browser_snapshot</text>
    <text class="t" x="28" y="148">no arguments yet</text>
    <rect class="pine" x="16" y="180" width="328" height="72" rx="4"/>
    <text class="t" x="28" y="208">3. Harness runs it. Result:</text>
    <text class="t" x="28" y="232">a button named Sign in</text>
    <rect class="clay" x="16" y="264" width="328" height="72" rx="4"/>
    <text class="t" x="28" y="292">4. Model: browser_click</text>
    <text class="t" x="28" y="316">with target Sign in</text>
    <rect class="box" x="16" y="348" width="328" height="120" rx="4"/>
    <text class="t" x="28" y="376">5. Later, expect the name Ada</text>
    <text class="t" x="28" y="404">That line is the runner.</text>
    <text class="t" x="28" y="432">The model’s “done” is not.</text>
  </svg>
  <figcaption>
    Read the trace from the top. The model proposes. The harness acts. The runner checks. If your log only has step 5’s sentence, you do not have a conversation. You have a claim.
  </figcaption>
</figure>

Four roles show up in that list, and mixing them up is the usual review bug.

**System.** Standing orders. Not written by the tester for this case.

**User.** The case, or the next thing the person typed. “The other one” is a user turn. It is not an id.

**Assistant.** The model’s text, including the tool name it chose.

**Tool.** The result the harness pasted back. A screenshot description, a page snapshot, an error string. This is evidence. The model’s summary of it is not a second copy of the evidence. Keep the tool message.

When a healer “tries again,” it is appending to this list, not starting a fresh test. That is why turn 1 still matters, until something deletes it.

<h2 id="free-space">Free space</h2>

The conversation has a size limit, often called the context window. Free space is the room left in that window for the next message. Tool results are large. A snapshot of a page can be larger than the case. Screenshots described as text are large. After enough turns, free space is gone.

When the window is full, the harness must drop, summarize, or refuse. Dropping and summarizing are the dangerous ones for a tester. The rule “never change the expected name Ada” lived in turn 1. The later turns are selector guesses. A summary that keeps “we are trying locators” and drops the rule has not crashed. It has changed the test.

You will not always be shown a token count. Write “free space not shown” rather than inventing one. What you can always ask is: if only the last few turns survived, would the check still be there? If the answer is no, the check has to live in the Playwright file, not only in the first message.

A replan limit is the other fence on free space. Midscene and similar agents let you cap how many times the model may look again. Raising that cap so a bot can “keep trying” spends the window and the budget, and it trains the team to wait for a green that arrived by search. A small cap, then a person, is the senior setting.

The [conversation skill](../../skills/#conversation-space) is how you write that down for one trace.

<h2 id="bots">Bots</h2>

A bot is a harness with a goal, running the loop until it stops. A test bot’s goal might be “follow this case” or “repair this locator” or “explain this log.” It is still a bot. Giving it three names, planner and generator and healer, does not make three oracles. It makes three loops that can write files.

The Chinese accounts that are worth keeping say a quieter thing than their architecture diagrams. Do not start with three bots. Give one bot one job. Do not let that bot skip a test or rewrite an expected result. Let the runner say pass. I agree, and I would write it as a fence:

| Bot | May do | May not do |
| --- | --- | --- |
| Planner | Write a markdown plan a person can read | Invent a timeout or a price |
| Generator | Turn that plan into a Playwright draft | Commit the file |
| Healer | Propose a new locator, once or twice | Change `expect`, or skip |
| Explainer | Label a failure as locator, product, or broken run | Close the bug |

The person in the review reads the diff. Playwright’s report is the pass. A sentence in a chat is a sentence.

If two bots can edit `expect` in the same hour, you do not have a pipeline. You have a shared document with no owner. Stop and name one owner before you add a third bot. That is the same gate as [one job first](../start-with-one-job/), told from the inside of the machine.

## What to open, in order

When a senior is handed “the AI tests” and a link to a run, open these, and stop when one of them is missing.

1. The system prompt, including extras. Look for a line that prefers success.
2. The tool list. Names, descriptions, arguments. Cut pay and delete if this job is sign-in.
3. The case, with Check lines, separate from the prompt.
4. The conversation or trace, oldest first. Find the rule. See if later turns still contain it.
5. The diff, if a bot edited a file. Locator changes can stay. Expected-result changes cannot.
6. The runner’s report. If you cannot find it, the bot’s PASS is not a result.

The skills and the prompts on this site are those six opens, each with a shop situation already filled in so a reviewer can see the shape before pasting a real trace. They are starters. They do not replace the report.

## A practice

You are shown one bundle.

```
System prompt: "Always complete the task. If a check fails, continue with the closest success."
Tools: browser_snapshot, browser_click, browser_type, pay, aiAssert
aiAssert arguments: expectedText, and the model may replace expectedText
Conversation turn 1: "The next page must show the name Ada."
Turns 2 to 20: locator guesses
Healer edited the test to expect "Welcome" and the chat says PASS
Playwright report: not opened
```

What do you hold, and what is the first part you name?

Hold the run. The first part to name is the system prompt: it already told every later step to prefer success. The tool list is the second defect, because `pay` is present and `aiAssert` can rewrite the expected text. The conversation is the third, because the Ada rule is only in turn 1 while twenty guesses follow. The healer’s edit is the fourth, and the chat’s PASS is not a result at all. Any one of these was enough to hold. Together they are a bot with no fence.

The [bot fence](../../skills/#bot-boundary) is the note I would file next to that bundle. The rest of this series is what to do with a case, a locator, and a pilot once the parts have names.

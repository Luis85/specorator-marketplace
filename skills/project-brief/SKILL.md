---
name: project-brief
description: Use when an idea, request, or mandate needs to become a short document a sponsor can decide on — writing a project brief, project one-pager, initiation request, or pre-project summary, or reviewing an existing brief before it goes to a board. Produces a concise brief covering background, objectives, scope boundaries, outline business case, constraints, stakeholders, risks, and the decision being asked for.
author: Specorator
license: MIT
tags: ["project-management", "project-brief", "initiation", "prince2", "artifact"]
version: 1
---

# project-brief

A project brief exists to get a single decision: *is this worth initiating?* It is
deliberately short — two to four pages — and it is thrown away once a charter or PID
supersedes it. Do not turn it into a plan.

Use this for the pre-project or initiation-request step. If the decision to proceed is
already made and the project needs its mandate, authority, and baselines, use the
**project-charter** skill instead. If the investment case itself is what is contested, use
**business-case**.

## Inputs to gather

Ask for these; mark anything unavailable as `[TBD — owner, needed by]` rather than guessing.

- **The trigger** — the mandate, request, incident, regulation, or opportunity that started this.
- **The problem** in the requester's own words, and what happens if nothing is done.
- **Desired outcome** and how anyone would know it happened.
- **Rough size** — order-of-magnitude cost, duration, and team, with the basis stated (analogy, expert judgement, prior project).
- **Boundaries** — what is explicitly out of scope, and which adjacent work this must not touch.
- **Options already considered**, including do-nothing.
- **Who cares** — sponsor, likely users, whoever can veto.
- **Known constraints** — dates that cannot move, budget already earmarked, regulation, technology mandated.
- **Lessons** from comparable past projects, if any are recorded.

## Produce

1. **Name the decision first.** Open with what the reader is being asked to approve
   (authorise initiation, fund a discovery, decline) and by when.
2. **Write the background and problem** in plain language, with the consequence of
   inaction. Two short paragraphs.
3. **State objectives as SMART statements** — specific, measurable, achievable, realistic,
   time-bound. Three to five, no more. Each one testable at closure.
4. **Draw the scope boundary.** In scope, out of scope, and the interfaces to other work.
   The out-of-scope list is what makes a brief useful; write it as carefully as the in-scope one.
5. **Sketch the product.** What the project delivers, at the level of named outputs — not tasks.
6. **Outline the business case** in a paragraph: expected benefits (measurable where
   possible), rough cost, rough timescale, and the option chosen against do-nothing.
   Keep it outline; the full case is a separate artifact.
7. **List constraints, assumptions, and dependencies** — each with an owner where it needs validating.
8. **List the top risks** — five at most, each with its potential effect on the objectives.
   Not a risk register; the headline threats only.
9. **Identify stakeholders and the proposed governance** — sponsor, decision body,
   project manager, key groups affected.
10. **State the next step and what it costs** — the initiation or planning activity being
    authorised, its duration and effort.

Fill `references/template.md`.

## Review mode

Score against `references/review-checklist.md`. The brief usually fails in one of four
ways: objectives that cannot be measured, no out-of-scope list, benefits asserted with no
measure or baseline, or a brief that has quietly become a project plan. Quote the line,
name the fix.

## Quality bar

- Four pages maximum, readable in ten minutes by someone new to the topic.
- Objectives are SMART and could each be judged pass/fail at closure.
- The out-of-scope list is specific enough to settle a future argument.
- Every number states its basis and its confidence.
- Do-nothing is a genuinely described option, not a straw man.
- No task lists, no schedules, no resource plans — those belong downstream.

## Grounding

PRINCE2® 7 Project Brief (purpose: support the decision to authorise initiation; derived
from the project mandate; composition covering background, objectives, scope, constraints,
risks, stakeholders, and the outline business case; SMART objectives and an explicit
"will not deliver" statement); PMBOK® Guide 7 strategy artifacts (business case, project
brief, project charter, vision statement, roadmap); PMBOK® Guide 8 Initiating focus area
and Governance performance domain; the European Commission's PM² Project Initiation
Request; ISO 21502:2020 pre-project activities and project justification.

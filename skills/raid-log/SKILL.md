---
name: raid-log
description: Use when project uncertainty needs capturing or managing — setting up or reviewing a RAID log, risk register, issue log, assumption log, dependency register, or decision log; writing risk statements and response plans; scoring probability and impact; or sizing contingency from risk exposure. Produces entries that are specific enough to act on, with owners, dates, responses, and a review rhythm.
author: Specorator
license: MIT
tags: ["project-management", "risk", "raid", "issues", "dependencies", "assumptions", "artifact"]
version: 1
---

# raid-log

RAID keeps four different things apart, because each needs a different response:

| | What it is | Test | Needs |
|---|---|---|---|
| **R**isk | Uncertain future event | Might happen | Probability, impact, response, owner |
| **A**ssumption | Something taken as true without proof | Believed, unverified | Validation action, date, owner |
| **I**ssue | Something that has happened or is certain | Is happening now | Resolution action, owner, due date |
| **D**ependency | Something needed from outside the team's control | Someone else must act | Named party, committed date, fallback |

A fifth column, **decisions**, is worth keeping alongside: what was decided, by whom, when,
and on what basis. It prevents relitigating and is invaluable at closure.

A log full of vague entries is worse than no log — it consumes review time and produces no
action. Every entry here earns its place by naming something someone must do.

## Inputs to gather

- Objectives, constraints, and the schedule's critical path — risk means threat *to these*.
- Existing organisational risk appetite, scoring scales, and escalation thresholds. Use the
  organisation's scales when they exist; inventing a parallel scheme guarantees a mismatch.
- Assumptions already made in the brief, business case, charter, and schedule — harvest them.
- Known external commitments and who owns each.
- Lessons from comparable projects: their risks that materialised are your best candidate list.
- The reporting cadence risk review must feed.

## Produce

1. **Set the scales first.** Probability bands, impact bands per dimension (cost, time, scope,
   quality, benefit, reputation, safety, compliance), the resulting severity matrix, and the
   escalation thresholds. Without agreed scales, scoring is theatre. See
   `references/risk-practice.md`.
2. **Write risks in cause–event–effect form**: *because <cause>, <uncertain event> may occur,
   leading to <effect on a specific objective>*. Reject anything that is only a topic
   ("resourcing") or only an effect ("project is late").
3. **Score each risk** — pre-response probability × impact, giving inherent severity; then the
   post-response residual. Show both, so response effectiveness is visible.
4. **Assign a response strategy** per risk: avoid, reduce/mitigate, transfer, share, accept
   (for threats); exploit, enhance, share, accept (for opportunities). Include opportunities —
   most logs are threat-only and miss upside deliberately created by the project.
5. **Make each response an action** with an owner and a date. "Monitor" is not a response.
6. **Convert assumptions into validation actions** with owners and dates. An assumption that
   fails becomes an issue or a risk the same day.
7. **Log issues with a resolution route** — owner, action, due date, and whether it breaches a
   tolerance (if so, it triggers an exception; see **change-request** or **status-report**).
8. **Log dependencies both ways** — what you need from others, and what others need from you.
   Each with a named contact, a committed date, confidence, and a fallback.
9. **Size contingency from exposure.** Sum expected monetary value (probability × cost impact)
   across the register as one input to contingency, and note the biggest single exposures
   separately — an EMV total conceals a tail risk that could end the project.
10. **Set the review rhythm** — weekly for top risks, per stage boundary for the full register,
    plus a trigger-based review (any new issue, any changed assumption, any missed dependency date).

Fill `references/template.md`.

## Review mode

Use `references/review-checklist.md`. The signature failures: risks written as topics or as
effects, everything scored medium, response actions with no owner or date, assumptions
recorded but never validated, dependencies with no committed date, and a register that has not
changed in two months (a certain sign it is not being used).

## Quality bar

- Every risk reads cause → event → effect and names the objective it threatens.
- Scoring uses agreed scales; severity distribution is not uniformly medium.
- Every response is an action with an owner and a date; residual score is recorded.
- Opportunities are present, not only threats.
- Assumptions carry a validation action and date; expired ones are resolved.
- Dependencies name a person, a committed date, and a fallback.
- Escalation thresholds are stated, and breaches are visibly escalated.
- Entries are dated, and closed items are retained with their outcome.

## Grounding

ISO 31000:2018 risk management process — communication and consultation, establishing scope
and context, risk assessment (identification, analysis, evaluation), risk treatment, and
monitoring and review, with recording and reporting throughout; IEC 31010 risk assessment
techniques for selecting an identification and analysis method proportionate to the decision;
PMBOK® Guide 7 Uncertainty performance domain and its risk register/risk report artifacts,
and PMBOK® Guide 8's Risk performance domain; PRINCE2® 7 Risk and Issues practices — the risk
management approach, risk budget, cause/event/effect risk statements, the threat and
opportunity response options, and issue types (request for change, off-specification, problem
or concern) with severity-based escalation; ISO 21502:2020 risk, issue, and change-control
practices.

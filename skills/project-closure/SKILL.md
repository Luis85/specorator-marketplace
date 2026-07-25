---
name: project-closure
description: Use when a project or phase is ending or has ended — writing a closure or end-project report, running a lessons-learned session or retrospective, preparing operational handover and transition, confirming acceptance and outstanding items, or planning and running the post-implementation benefits review. Produces closure evidence, transferable lessons with owners, a handover that operations will accept, and a scheduled benefits review.
author: Specorator
license: MIT
tags: ["project-management", "closure", "lessons-learned", "benefits", "handover", "artifact"]
version: 1
---

# project-closure

Closure has two jobs, and most projects only do the first: stop cleanly, and make the value
stick. Benefits are usually realised after the project ends, so a closure that does not hand
over measurement and ownership guarantees that nobody ever finds out whether the investment paid.

Use this at a stage boundary (end-stage report), at project end (closure report and handover),
and again at the post-implementation review — the third one is the step that gets skipped.

## Inputs to gather

- Objectives and success criteria from the charter, and the benefits from the business case.
- Acceptance evidence per deliverable, and any conditional or refused acceptances.
- Outstanding items: open defects, deferred scope, unresolved risks and issues, open actions.
- Final cost and schedule position against the original and current baselines, plus approved changes.
- Operational readiness state: support model, runbooks, monitoring, training completed, service
  acceptance criteria.
- Lessons captured during delivery (the lessons log) — closure collects and analyses them, it
  does not invent them at the end.
- Follow-on work already identified, and where it will be taken forward.
- Contracts to close: final invoices, retentions, warranties, licences, and data-return obligations.
- Who will own benefit measurement after the team disbands.

## Produce

### 1. Closure report

1. **Assess against the original success criteria** — each one, pass/fail/partial, with evidence.
   Also compare against the *original* baseline, not only the last re-baselined one; report both
   and explain the delta with the approved changes that caused it.
2. **Confirm acceptance** — deliverable by deliverable, with the accepting authority and date.
   Record conditional acceptances and what remains to satisfy them.
3. **State the final position** — cost, schedule, scope delivered vs baselined, and change volume.
4. **Report the benefits position** — realised so far, forecast, and any now considered
   unachievable, with the reason. Do not restate the original forecast as though it were an outcome.
5. **List outstanding items with a destination.** Every open defect, deferred requirement, and
   live risk transfers to a named owner in operations, a follow-on project, or the backlog — or is
   formally accepted as closed unresolved. Nothing may be left as "open".
6. **Record follow-on recommendations** for the sponsor and the portfolio.

### 2. Lessons

7. **Run the session properly** — separate what happened from why, look for causes in the system
   rather than in individuals, and cover what worked as well as what did not. Format options and
   facilitation guidance in `references/lessons-and-benefits.md`.
8. **Write lessons to be transferable.** A lesson needs context, what happened, the effect,
   the recommendation, and an owner who can change something (a standard, a template, a checklist,
   an estimating rate, a contract clause). A lesson with no owner is an anecdote.

### 3. Handover and transition

9. **Confirm operational readiness against explicit criteria** — support model live, runbooks
   accepted, monitoring in place, training delivered, hypercare period agreed with an end date and
   an exit test.
10. **Get operations to accept**, formally, and record what they refused to accept.
11. **Close the administration** — contracts, final payments, retentions, licences and access,
    data retention and deletion, decommissioning of superseded assets, archive of project records,
    team release and recognition.

### 4. Benefits review

12. **Schedule the post-implementation review** — typically 3, 6, or 12 months after go-live,
    depending on when benefits should appear. Put a date, an owner, and a place in someone's
    reporting cycle before the team disbands, or it will not happen.
13. **Hand over the measurement mechanism** — measure, source, baseline, target, and who reports
    it to whom. Confirm the receiving owner has agreed and is capable of collecting it.

Fill `references/template.md` (closure report, lessons log, handover checklist, and benefits
review record).

## Review mode

Use `references/review-checklist.md`. Look for: success assessed only against the final
re-baselined plan, open items with no destination, lessons that are only observations, no named
benefit owner, no scheduled review date, and a handover that operations never signed. Then ask
the question that exposes the rest: *what would the organisation have to do differently on the
next project because of this report?* If nothing, the lessons are not real.

## Quality bar

- Every original success criterion is assessed with evidence.
- Final position reported against both the original and the current baseline.
- Every outstanding item has a named destination owner and a date.
- Every lesson has a recommendation and an owner who can change a standard, template, or rate.
- Operational acceptance is recorded, including anything refused.
- Benefit measurement is owned outside the project, with a scheduled review date.
- Unachievable benefits are stated plainly, not quietly dropped.
- Honest about failure: a project that missed its objectives says so.

## Grounding

PRINCE2® 7 Closing a Project process and its End Project Report — objectives vs performance,
benefits realised and expected, and a lessons report — with the lessons log maintained
throughout, follow-on action recommendations, and confirmation of acceptance and operational
readiness; PMBOK® Guide 7/8 closing focus area, transition of deliverables, and the
lessons-learned register as an ongoing artifact; ISO 21502:2020 project closure and benefits
transition — outputs accepted and positioned to deliver outcomes and benefits after closure;
PMI's Benefits Realization Management framework and APM benefits-management guidance on
post-implementation review, including using outturn data as reference-class evidence for future
forecasting; the 2020 Scrum Guide's Sprint Retrospective as the incremental equivalent, and
blameless-postmortem practice for causal analysis.

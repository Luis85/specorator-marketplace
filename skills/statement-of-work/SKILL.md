---
name: statement-of-work
description: Use when work has to be commissioned from a supplier, contractor, agency, or internal service — drafting or reviewing a statement of work (SOW), scope of work, work order, service description, or the SOW annex to a master services agreement. Produces a contractually usable SOW: deliverables, acceptance criteria, exclusions, assumptions, milestones and payment triggers, roles, change control, and the terms that decide who pays when something goes wrong.
author: Specorator
license: MIT
tags: ["project-management", "statement-of-work", "procurement", "contract", "scope", "artifact"]
version: 1
---

# statement-of-work

An SOW is the document a dispute gets settled by. Everything in it should be testable: a
reader with no context must be able to determine whether a deliverable was delivered, on
time, to standard. Write nouns and dates, not intentions.

An SOW is *not* an internal scope statement (use **scope-and-wbs**) and not a project
charter (use **project-charter**). It is the commercial description of work one party owes
another, and it usually sits under a master agreement that carries the legal terms.

## Inputs to gather

- **Parties** — legal entities, not brand names; the governing agreement it attaches to.
- **Objective** — the business outcome the buyer is purchasing.
- **Deliverables** — each as a noun, with a format, a recipient, and a due condition.
- **Acceptance** — who tests, against what criteria, within how many days, and what happens
  on rejection (rework window, cure period, remedy).
- **Exclusions** — what the supplier is explicitly not doing.
- **Buyer obligations** — access, environments, data, decisions, SMEs, and the dates they
  are needed by. Most supplier delays trace to an unstated buyer obligation.
- **Pricing and payment** — model (fixed price, T&M, capped T&M, milestone, retainer,
  outcome-based), amounts, triggers, invoicing terms, expenses, rate card, and what starts
  the payment clock.
- **Schedule** — start, end, period of performance, milestones, and any hard external date.
- **Standards and constraints** — technical standards, security and data-protection
  requirements, accessibility, sustainability or ESG obligations, working location, hours.
- **People** — key personnel, substitution rules, subcontracting permissions.
- **Governance** — reporting, meeting cadence, escalation path, and named contract managers.
- **Change control** — how a variation is requested, priced, and authorised.
- **IP, confidentiality, and data** — ownership of outputs, licences, third-party components,
  personal data roles and locations.
- **Exit** — termination for convenience or cause, notice, hand-over obligations, transition support.

Where a term is genuinely undecided, write `[TBD — owner, needed by]`. Never invent a rate,
a date, or a legal term.

## Produce

1. **Header and hierarchy** — parties, effective date, governing agreement, precedence
   order between documents, and SOW version.
2. **Objective and background** — enough context for a new reader; short.
3. **Scope of work** — the activities, structured by workstream or phase. Say what the
   supplier does, and where the boundary is.
4. **Deliverables table** — ID, deliverable (noun), description, format, due date or trigger,
   recipient, acceptance criteria reference. One row per thing that can be delivered or missed.
5. **Acceptance procedure** — review window in business days, criteria, who signs, the
   rework loop, deemed-acceptance rule if any, and the remedy if rework fails twice.
6. **Exclusions and assumptions** — explicit, numbered, each with the consequence if the
   assumption proves false (usually: change control).
7. **Buyer dependencies** — obligation, owner, needed-by date, and the effect of late
   delivery on price and schedule.
8. **Schedule and milestones** — period of performance, milestone table, and any dates
   dependent on buyer inputs.
9. **Pricing and payment** — model, breakdown, milestone-to-payment mapping, rate card,
   expenses policy, invoicing and payment terms, and what event starts the payment clock.
   See `references/contract-and-pricing.md`.
10. **Service levels or performance standards** where the work is ongoing — metric,
    target, measurement, and consequence.
11. **Roles, key personnel, and governance** — named contacts both sides, RACI for decisions,
    reporting, meeting cadence, escalation ladder with response times.
12. **Change control** — request form, pricing basis for variations, authorisation
    thresholds, and the rule that unauthorised work is unpaid.
13. **Compliance, security, data, IP** — standards to be met, personal-data roles and
    processing locations, security obligations, output ownership and licence position,
    third-party and open-source components, AI use disclosure where relevant.
14. **Termination and exit** — notice, payment on termination, hand-over deliverables, transition support.
15. **Signature block.**

Fill `references/template.md`.

## Review mode

Score against `references/review-checklist.md`, and read it once as the buyer and once as
the supplier — the gaps differ. Flag: deliverables written as verbs, acceptance with no
window or no consequence, no buyer obligations, payment triggered by "completion" without a
definition, and unlimited rework loops. Note where the SOW contradicts its master agreement
and say which should win.

## Quality bar

- Every deliverable is a noun with a recipient, a format, and a testable acceptance criterion.
- Acceptance has a window in business days and a defined outcome on rejection.
- Buyer obligations are listed with dates and consequences.
- Every payment has a trigger event that can be objectively evidenced.
- Exclusions and assumptions are numbered and consequential.
- Nothing important is left to "as mutually agreed".
- Not a substitute for legal review — say so when material terms are involved.

## Grounding

PMBOK® Guide 7/8 agreements-and-contracts artifacts and the procurement-management
practices (fixed-price, cost-reimbursable, time-and-materials, and indefinite-delivery
structures); ISO 21502:2020 on procurement and contract administration; PRINCE2® 7
commercial management approach and work-package definition (product description, tolerances,
acceptance, reporting, and escalation); public-procurement practice for performance-based
work statements (objective, measurable standards, and inspection/acceptance criteria);
industry SOW convention on scope, deliverables as nouns, objective acceptance criteria,
period of performance, milestone-linked payment, and RACI-based responsibilities.

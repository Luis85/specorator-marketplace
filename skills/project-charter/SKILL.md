---
name: project-charter
description: Use when a project needs to be formally authorised and its ground rules fixed — writing or updating a project charter, project initiation documentation (PID), project handbook, or team charter, or reviewing one before a delivery gate. Produces the authorising document: objectives, success criteria, scope boundary, deliverables, milestones, budget, governance and decision rights, tolerances, roles, and the management approaches the project will follow.
author: Specorator
license: MIT
tags: ["project-management", "project-charter", "pid", "governance", "initiation", "artifact"]
version: 1
---

# project-charter

The charter is the project's authority. It appoints the project manager, states what
"success" means, sets the boundary, and defines the decision rules — so that later disputes
have a written answer. It is signed by whoever can commit the money.

Order of use: **project-brief** (should we initiate?) → **business-case** (is it worth it?)
→ **project-charter** (authorise it, on these terms) → planning artifacts (scope-and-wbs,
project-schedule, raid-log, stakeholder-plan).

## Inputs to gather

- Approved brief and business case (or the equivalent decisions, however recorded).
- Sponsor, project board members, and the delegated authority the PM actually has.
- Success criteria: how the sponsor will judge this project at closure, in their words.
- Scope boundary, including known exclusions and interfaces.
- Major deliverables and their acceptance authority.
- Milestones or stage boundaries with the decisions attached to them.
- Budget, funding source, and what the PM may commit without asking.
- Tolerances per dimension — cost, time, scope, quality, risk, benefit.
- Delivery approach (from **delivery-approach** if it exists) and reporting cadence.
- Constraints and the top risks carried forward from initiation.
- Which management approaches apply — change, risk, quality, communication, procurement,
  data, sustainability — and whether each is inherited from an organisational standard or written here.

## Produce

1. **Purpose and justification** in a paragraph, with the link to the business case rather
   than a restatement of it.
2. **Objectives and success criteria.** Objectives are what the project does; success
   criteria are how the sponsor will judge it. Make each criterion measurable and name who
   assesses it.
3. **Scope boundary** — in, out, and interfaces. Import from the brief and sharpen it.
4. **Deliverables** with acceptance authority per deliverable.
5. **Milestones / stages** with the decision or gate at each and the evidence required.
6. **Budget and funding** — envelope, profile, what the PM may commit, and what needs board approval.
7. **Governance and roles** — board composition and decision rights, the PM's delegated
   authority, escalation route and response time, and the RACI for the decisions that
   matter (use **stakeholder-plan** for the full stakeholder work).
8. **Tolerances**, quantified per dimension, with the escalation trigger for each.
9. **Management approaches** — one or two lines each: how change, risk, quality,
   communication, and procurement will be handled, or a reference to the organisational
   standard being adopted.
10. **Assumptions, constraints, dependencies, and headline risks** carried in from initiation.
11. **Sign-off block** — who signs, in what capacity, by when.

Fill `references/template.md`. Keep it to the ground rules; the details live in the
subordinate artifacts and are referenced, not duplicated.

## Review mode

Use `references/review-checklist.md`. The usual defects: success criteria that cannot be
assessed, no tolerances (so everything or nothing is an escalation), the PM given
accountability without authority, deliverables with no named acceptance authority, and a
charter that duplicates the plan and therefore goes stale within weeks.

## Quality bar

- Someone joining the project could learn from it who decides what, and within which limits.
- Every success criterion has a measure and an assessor.
- Tolerances are numeric and paired with an escalation route.
- Each deliverable has an acceptance authority.
- No content copied wholesale from the business case or the plan — reference them instead.
- Signed, dated, versioned.

## Grounding

PMBOK® Guide 7 and 8 project charter as the strategy artifact that formally authorises the
project and appoints the project manager; PRINCE2® 7 Project Initiation Documentation as the
master reference — project definition, approach, business case, roles and responsibilities,
management approaches (benefits, change, commercial, communication, digital-and-data, issue,
quality, risk, sustainability), plans, controls, and tolerances — with manage-by-exception and
delegated tolerance; the European Commission's PM² Project Charter and Project Handbook split
(the *what* versus the *how*); ISO 21502:2020 on project governance, direction, and
initiation; the 2020 Scrum Guide and team-charter practice for working agreements on
adaptive work.

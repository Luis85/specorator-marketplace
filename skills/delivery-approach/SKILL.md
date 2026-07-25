---
name: delivery-approach
description: Use when choosing or defending how a project will be run — predictive, iterative, incremental, adaptive, or hybrid — when designing its lifecycle phases and governance gates, when tailoring a method (PMBOK, PRINCE2, PM², Scrum, Kanban, SAFe) to a specific project, or when reviewing whether a stated approach actually fits the work. Produces a short, evidence-based delivery-approach decision with the tailoring choices and the artifact set it implies.
author: Specorator
license: MIT
tags: ["project-management", "delivery-approach", "tailoring", "governance", "hybrid", "agile"]
version: 1
---

# delivery-approach

Pick the lifecycle before writing the plan. Approach drives which artifacts exist, how
often they change, and what a gate reviews — so getting it wrong makes every downstream
document wrong. The output is one to three pages, not a methodology essay.

## Inputs to gather

Ask for what you cannot infer; assume nothing about maturity or culture.

| Input | Why it decides the approach |
|---|---|
| Product/outcome being delivered | Physical, regulated, and integration-heavy work resists late change |
| Requirements stability + clarity | Known and stable → predictive; emergent → adaptive |
| Frequency of usable delivery possible | Can it ship in slices, or only at the end? |
| Customer availability for feedback | Adaptive collapses without an engaged product decision-maker |
| Team size, distribution, experience | Boehm–Turner: personnel, dynamism, culture, size, criticality |
| Criticality / safety / compliance | Assurance evidence and formal baselines are non-negotiable |
| Contract and funding shape | Fixed-price fixed-scope constrains adaptive delivery |
| Organisational governance already in force | Existing gates and reporting cadence you must interoperate with |

## Produce

1. **Segment the work.** Most real projects are hybrid because different work streams
   have different characteristics. List the streams (e.g. hardware, data migration, UI,
   change management, procurement) before choosing anything.
2. **Score each stream** against the drivers in `references/approach-selection.md` and
   assign it predictive, iterative, incremental, or adaptive. Say why in one line each.
3. **Compose the lifecycle.** Name the phases or stages, what ends each one, and which
   streams run inside them. Predictive stages plus an adaptive build stream is a normal,
   defensible answer — describe how they interface (cadence, integration points,
   what the adaptive stream commits to at a gate).
4. **Define the gates.** For each: the decision, the decider, the evidence required, the
   possible outcomes (go / hold / redirect / stop), and the tolerances that let delivery
   proceed without a gate.
5. **Set the cadence** — planning horizon, replanning trigger, reporting rhythm, and the
   ceremonies or meetings that actually stay.
6. **Derive the artifact set.** List the artifacts that will exist, who owns each, and how
   often each is updated. Explicitly list what you are *not* producing and why.
7. **Record the tailoring decisions** — what you took from which method, what you dropped,
   and the risk each omission accepts.

Fill `references/template.md`. Keep the rationale traceable to the inputs above; a
selection nobody can challenge is a selection nobody will follow.

## Review mode

Given a stated approach, plan, or method rollout, check it against
`references/review-checklist.md`. Look hardest for the three common failures: an "agile"
label over fixed scope, date, and budget; a predictive plan for work whose requirements
demonstrably cannot be known yet; and ceremony inherited wholesale from a framework with
no tailoring rationale. Name the mismatch, the evidence, and the cheapest correction.

## Quality bar

- Every stream's approach traces to a stated driver, not a preference.
- Gates have deciders, evidence, and tolerances — not just names and dates.
- The interface between differently-run streams is described concretely.
- Tailoring is explicit: what was dropped and what risk that accepts.
- Fits on three pages. If it needs more, the project needs splitting, not more prose.

## Grounding

PMBOK® Guide 7 (Development Approach and Life Cycle performance domain; tailoring) and
PMBOK® Guide 8 (tailoring as a core principle; the Initiating / Planning / Executing /
Monitoring & Controlling / Closing focus areas); PMI's *Agile Practice Guide* suitability
filters, derived from the Boehm–Turner risk model; Disciplined Agile lifecycle options
(agile/iteration-based, lean/flow-based, continuous delivery, exploratory, programme);
PRINCE2® 7 manage-by-stages and manage-by-exception with its tailoring principle;
ISO 21502:2020 lifecycle and governance guidance; the European Commission's PM² four-phase
lifecycle with RfP / RfE / RfC gate approvals; Stage-Gate (Cooper) go / kill / hold /
redirect gate decisions; the 2020 Scrum Guide; Kanban flow metrics; SAFe PI planning and
Lean Portfolio Management.

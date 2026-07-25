---
name: business-case
description: Use when a project's investment needs justifying or re-justifying — writing or updating a business case, cost-benefit analysis, benefits map, options appraisal, or investment paper, or reviewing an existing case before a funding gate. Produces a structured case covering strategic fit, options appraisal, quantified costs and benefits with NPV/ROI/payback, commercial and financial viability, and how benefits will be measured and realised.
author: Specorator
license: MIT
tags: ["project-management", "business-case", "benefits", "investment", "governance", "artifact"]
version: 1
---

# business-case

A business case answers one question at every gate: *is this still the best use of this
money?* It is not a one-off document — it is maintained through the project and tested
again at each stage boundary. Continued business justification means a case that no longer
holds is grounds for stopping.

Scale to the decision: a two-page case for a €50k internal change, the full five-case model
for a major public-sector investment.

## Inputs to gather

- **Strategic driver** — the objective, obligation, or portfolio goal this serves, and who owns that objective.
- **Current state, quantified** — today's cost, volume, error rate, cycle time, headcount, downtime. Without a baseline, no benefit can be claimed.
- **Options** — always including do-nothing (business as usual) and a do-minimum.
- **Costs** — one-off, recurring, internal effort, licences, transition, decommissioning; and the period over which they run.
- **Benefits** — cash-releasing, non-cash-releasing, and unquantifiable; who receives each.
- **Dis-benefits** — the certain negative consequences of proceeding, not the risks.
- **Financial parameters** — appraisal period, discount rate, capital vs operating treatment, currency.
- **Constraints** — funding envelope, procurement route, deadline driven by regulation or contract.
- **Risk exposure** — what could invalidate the case, and the value at stake.

Anything you cannot source becomes `[TBD — owner, needed by]`. Never fabricate a baseline
or a benefit figure.

## Produce

1. **State the case for change** — the problem, its evidence, the strategic fit, and what
   happens under business as usual. If there is no compelling case for change, say so and stop.
2. **Appraise the options.** For each: description, cost, benefits, key risks, and why it
   was or was not preferred. Include do-nothing and do-minimum. Show the comparison in one
   table so the reader can see the trade-off rather than take the conclusion on trust.
3. **Quantify benefits properly.** Each benefit gets a measure, a baseline, a target, a
   realisation date, a named owner in the receiving business area, and a method of
   measurement. Split cash-releasing from non-cash-releasing. Do not sum them.
4. **List dis-benefits** with the same rigour.
5. **Build the cost profile** by year: one-off, recurring, internal effort at a stated rate,
   contingency (with its basis), and whole-life cost including decommissioning.
6. **Compute the financials** — net present value, benefit-cost ratio, payback period,
   and ROI, with the discount rate and appraisal period stated. Show the arithmetic
   assumptions; see `references/financial-appraisal.md`.
7. **Test sensitivity.** What happens to the case if benefits land 30% low, costs 30% high,
   or delivery slips six months? Name the break-even point on the largest benefit line.
8. **Cover commercial and financial viability** — procurement route, contract type,
   supplier market, funding source, affordability against the actual budget, and cash-flow timing.
9. **Cover management viability** — how delivery will be governed, who owns benefits after
   handover, and when the post-implementation review happens.
10. **State the recommendation** and the conditions under which the case would no longer hold.

Fill `references/template.md`. For public-sector or major investments, use the five-case
structure noted in that template.

## Review mode

Assess with `references/review-checklist.md`. The recurring failures: benefits with no
baseline, double counting between benefit lines, contingency with no basis, a do-nothing
option written to lose, optimism bias untested, and no named benefit owner after handover.
Recompute the headline figures yourself before commenting on them.

## Quality bar

- Every benefit is traceable to a baseline and a measurement method.
- Costs are whole-life, not just delivery.
- Discount rate, appraisal period, and internal cost rates are stated explicitly.
- Sensitivity analysis exists and identifies the break-even point.
- Benefit owners are named individuals in the receiving business, not the project.
- The conditions that would invalidate the case are written down.

## Grounding

HM Treasury's Better Business Cases / Five Case Model — strategic, economic, commercial,
financial, and management cases, addressing whether an investment is desirable, feasible,
viable, affordable, and deliverable; PRINCE2® 7 Business Case practice (outline case in the
brief, detailed case in the PID, maintained through stages, continued business
justification, dis-benefits distinguished from risks, benefits confirmed after closure);
PMBOK® Guide 7 strategy artifacts and PMBOK® Guide 8's focus on measurable business value;
PMI's Benefits Realization Management framework; ISO 21502:2020 benefits management;
APM benefits management guidance; reference class forecasting and optimism-bias uplift
(Flyvbjerg) for cost and benefit estimates.

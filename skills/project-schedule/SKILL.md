---
name: project-schedule
description: Use when a project needs a credible timeline or its estimates challenged — building a milestone plan, activity network, critical path, Gantt or roadmap, sizing effort and duration, setting contingency and buffers, or reviewing a schedule for logic errors, unrealistic estimates, and hidden float. Produces a schedule baseline with stated estimating basis, dependency logic, critical path, and the assumptions the dates depend on.
author: Specorator
license: MIT
tags: ["project-management", "schedule", "estimation", "critical-path", "baseline", "artifact"]
version: 1
---

# project-schedule

A schedule is a model of how the work will actually happen, and a claim about when it will
finish. Both parts must be defensible: the logic (what must precede what) and the estimates
(how long each thing takes, and how confident you are).

Requires a scope baseline. Without one, you are scheduling guesses — build the WBS first
(**scope-and-wbs**).

## Inputs to gather

- Work packages from the WBS, with owners.
- Hard dates and their driver (regulation, contract, seasonal window, dependent programme).
- Resource availability: named people, %, holidays, competing commitments, notice periods.
- Lead times: procurement, recruitment, environment provisioning, third-party slots, approvals.
- External dependencies with the other party's committed dates.
- Calendars: working days, freeze periods, change windows, business blackout dates.
- Estimating inputs: comparable past work, published rates, expert judgement, actuals from
  an earlier increment.
- Delivery approach per stream — predictive streams get a network; adaptive streams get a
  cadence, a capacity, and a forecast range.

## Produce

1. **Set the milestone spine first** — 6 to 12 milestones for a typical project, each a
   verifiable state with a decision attached, not an activity ending. Sponsors manage the
   spine; the detail supports it.
2. **Derive activities** from work packages. Keep activity names verb-first; keep the WBS ID
   on each so cost and scope reconcile.
3. **Estimate effort and duration separately.** Duration = effort ÷ (assigned resource ×
   productive fraction). State the productive fraction you used; it is usually 60–80%, not 100%.
4. **Record the estimating basis per activity** — analogous, parametric, expert judgement,
   or three-point (PERT). Never a bare number. See `references/estimating-and-analysis.md`.
5. **Build the dependency network.** Prefer finish-to-start; justify every start-to-start,
   finish-to-finish, or lead/lag. Distinguish mandatory logic from preference, and never use
   a date constraint where a dependency belongs.
6. **Calculate the critical path** and identify near-critical paths (within a week or two of
   critical). Report total float per path, not per activity, and say which paths threaten the
   milestone spine.
7. **Add contingency where it can be managed** — a schedule buffer before each committed
   milestone or at the end of the critical chain, sized from risk exposure and estimate
   uncertainty. Never pad individual activities; padding disappears into Parkinson's law.
8. **Validate resource-feasibility.** Level the plan against real availability. An
   unlevelled schedule is a wish. Show the peak demand and where it exceeds supply.
9. **Reality-check the outturn.** Compare the roll-up to comparable completed projects
   before publishing it; if it is materially faster, explain why. Optimism is the default
   failure mode of schedules.
10. **Baseline and state the assumptions** the dates depend on, each with an owner. The
    assumption list is the schedule's fine print and the source of most later slippage.

For adaptive streams, produce instead: cadence, team capacity, backlog size in the chosen
unit, throughput or velocity range from actuals, and a forecast expressed as a range with a
confidence statement — plus the fixed integration and release dates the stream must hit.

Fill `references/template.md`.

## Review mode

Use `references/review-checklist.md`. The diagnostic order that finds the most in the least
time: missing habitual activities → date constraints replacing logic → 100% resource loading
→ zero-float everywhere or float everywhere → estimates without basis → no buffer → external
dependencies with no committed date. Then ask the single most useful question: *what has to
be true for this to finish on time?*

## Quality bar

- Every activity has an owner, a duration, and an estimating basis.
- Logic drives dates; hard constraints are rare, listed, and justified.
- Critical and near-critical paths are identified and named.
- Resource loading is feasible against real availability, including holidays.
- Contingency is explicit, quantified, and owned — not hidden in estimates.
- The forecast is expressed with a confidence range where uncertainty is material.
- Assumptions are listed with owners; each one that fails has a known effect on the end date.

## Grounding

PMBOK® Guide 7/8 schedule performance domain: activity definition, sequencing, duration
estimating, schedule development, and control, with the schedule baseline and
performance-measurement baseline; critical path method (early/late dates, total and free
float) and critical chain buffering (Goldratt); three-point/PERT estimating and Monte Carlo
schedule risk analysis; ISO 21502:2020 integrated planning and control; PRINCE2® 7 Plans
practice (project, stage, and team plans; product flow before activity sequencing);
the 2020 Scrum Guide and Kanban flow forecasting (throughput, cycle time, WIP) for adaptive
streams; reference class forecasting and planning-fallacy research (Kahneman, Flyvbjerg) as
the corrective to optimism bias.

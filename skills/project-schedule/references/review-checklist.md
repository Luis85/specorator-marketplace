# Review checklist — project schedule

✅ pass / ⚠️ weak / ❌ blocking. Fastest diagnostic order: missing activities → date
constraints → resource loading → float pattern → estimate basis → buffer → external dependencies.

## Foundation

- [ ] Built from a scope baseline; every activity carries a WBS ID.
- [ ] Working calendar stated: working days, holidays, freeze and blackout periods.
- [ ] Milestone spine is 6–12 verifiable states, each with a decision attached.
- [ ] Committed external dates listed with their driver and the consequence of missing them.

## Activities

- [ ] Each has an owner (an individual, not a team).
- [ ] Effort and duration are distinguished, with the productive fraction stated.
- [ ] Productive fraction is realistic (not 100%).
- [ ] No activity longer than two to three reporting periods without an interim verifiable point.
- [ ] Habitually omitted work is present: environments, test data, non-functional testing,
      defect resolution, migration dry runs, training, cutover rehearsal, hypercare,
      procurement lead time, approvals, decommissioning.
- [ ] Approval and review waits are modelled as duration, not assumed instantaneous.

## Estimates

- [ ] Every estimate has a basis code, not a bare number.
- [ ] Three-point estimates used where uncertainty is material, with σ visible on key paths.
- [ ] Estimates from a prior increment's actuals are used where available.
- [ ] No padding hidden inside activity durations.
- [ ] Roll-up compared with comparable completed projects, and the comparison stated.

## Logic

- [ ] Dates come from logic; date constraints are few, listed, and justified.
- [ ] Predecessor and successor on every activity except the true start and end.
- [ ] Non-finish-to-start relationships and all lags have written reasons.
- [ ] Mandatory logic distinguished from preferred sequencing.
- [ ] No circular logic; no dangling activities.
- [ ] Parallel work is genuinely parallel given the assigned people.

## Critical path and float

- [ ] Critical path identified and named, not just implied by a bar chart.
- [ ] Near-critical paths identified with their float.
- [ ] No unexplained large float (usually a missing dependency).
- [ ] Not everything at zero float (usually artificial constraints).
- [ ] Merge points into key milestones are recognised and buffered.

## Contingency

- [ ] Buffers are explicit, positioned, sized with a stated basis, and owned.
- [ ] Buffer sizing traces to risk exposure or estimate uncertainty.
- [ ] Buffer consumption is the reported progress signal, not only percentage complete.
- [ ] Contingency is not double-counted inside estimates and again as a buffer.

## Resources

- [ ] Peak demand shown against real availability by role.
- [ ] Holidays, notice periods, recruitment and onboarding lead times reflected.
- [ ] Context-switching penalty applied where people are split across projects.
- [ ] Levelling decisions and their effect on the end date recorded.
- [ ] No single person on the critical path with no identified backup.

## External dependencies

- [ ] Each names the party, a contact, and a *committed* date, with confidence.
- [ ] Fallback stated for each low-confidence dependency.
- [ ] Third-party lead times (procurement, security review, change windows) modelled.

## Adaptive streams

- [ ] Cadence, capacity, and backlog size stated.
- [ ] Forecast derived from measured throughput or velocity, not aspiration.
- [ ] Forecast expressed as a range with a confidence statement.
- [ ] Scope-growth rate included if the backlog has been growing.
- [ ] Fixed integration and release dates the stream must hit are visible.

## Credibility

- [ ] The assumption list exists, and each entry states its effect on the end date.
- [ ] A pre-mortem or independent review has been done on the top estimates.
- [ ] The plan answers "what has to be true for this to finish on time?" in a page.
- [ ] Baselined with a version, date, end date, and approver.

## Common findings, phrased usefully

| Finding | Say it like this |
|---|---|
| 100% loading | "All five developers are loaded at 100% for 14 weeks with no leave. At 75% productive time the end date moves to …; either re-plan at that rate or state the overtime assumption." |
| Constraints instead of logic | "Eleven activities carry 'start no earlier than' dates and only three have predecessors. The plan cannot show impact of slippage — add the real dependencies." |
| No basis | "A40 and A55 are 20 days each with no basis. Give a three-point estimate or an analogue; both sit on the critical path." |
| Missing work | "No activity covers UAT defect fixing. Historically that is 15% of build effort — add it or the plan is short by roughly three weeks." |
| Hidden padding | "Every activity is a round 10 days. Aggressive estimates plus a visible 15-day buffer before M3 would be more defensible and easier to manage." |
| Uncommitted dependency | "E2 assumes the vendor delivers the API by 14 May, with no confirmation on record. Get a written date or plan the fallback." |
| Velocity to date | "The forecast converts 32 points/sprint into a single date, ignoring the backlog growing 8 points/sprint. Present a range including that growth." |

# Review checklist — RAID log / risk register

✅ pass / ⚠️ weak / ❌ blocking. Read ten entries at random before forming a view of the whole.

## Setup

- [ ] Probability and impact scales are defined and, where one exists, match the organisation's.
- [ ] Impact bands cover the dimensions that matter here (cost, time, scope/quality, benefit,
      compliance, safety, reputation).
- [ ] Severity bands and the escalation threshold are stated.
- [ ] Risk appetite or tolerance per dimension is stated.
- [ ] Review rhythm is defined, including trigger-based reviews.
- [ ] A single named owner for the log.

## Risk entries

- [ ] Each reads cause → event → effect.
- [ ] Each names the objective, milestone, or benefit threatened.
- [ ] Effects are quantified where they can be (days, euros, percentage of benefit).
- [ ] No entry is a bare topic ("resourcing") or a bare effect ("project may be late").
- [ ] Both inherent and residual scores recorded.
- [ ] Severity distribution is differentiated, not uniformly medium.
- [ ] Proximity or "when it could bite" is recorded.
- [ ] Opportunities are present, not only threats.
- [ ] Response strategy named from the standard set, not improvised.
- [ ] Every response is an action with an owner and a due date; no bare "monitor".
- [ ] Responses whose cost is material have that cost visible.
- [ ] Accepted risks that could breach a tolerance have a fallback plan.
- [ ] Each entry carries a last-reviewed date within the review cycle.

## Assumptions

- [ ] Assumptions from the brief, business case, charter, and schedule have been harvested here.
- [ ] Each has an impact-if-false statement.
- [ ] Each has a validation action, an owner, and a validate-by date.
- [ ] Expired assumptions are resolved — validated, or converted to a risk or issue.
- [ ] No assumption is doing load-bearing work for a committed date without validation.

## Issues

- [ ] Distinguished from risks — something that has happened or is certain.
- [ ] Each has an owner, an action, and a due date.
- [ ] Tolerance breach flagged where applicable, with an exception report raised.
- [ ] Aged open issues are visible and explained.
- [ ] Closed issues retain their outcome.

## Dependencies

- [ ] Inbound and outbound both captured.
- [ ] Each names a party **and** a named contact.
- [ ] Committed dates recorded, with confidence — not just "expected".
- [ ] Consequence of lateness stated.
- [ ] Fallback stated for every low-confidence dependency.
- [ ] Dependencies appear in the schedule as well as here, consistently.

## Decisions

- [ ] Decisions recorded with who, when, basis, and options considered.
- [ ] Irreversible decisions marked as such.
- [ ] Affected artifacts noted so they can be updated.

## Exposure and contingency

- [ ] EMV computed for risks with a costed impact.
- [ ] Total EMV presented as an input to contingency, not as the answer.
- [ ] Largest single exposures listed outside the total.
- [ ] Catastrophic low-probability risks called out with a specific decision.
- [ ] Contingency amount, holder, and release mechanism recorded.

## Liveness

- [ ] Entries have changed since the last review.
- [ ] Closed items are archived with outcomes rather than deleted.
- [ ] Top risks appear on the status report and are discussed, not just filed.
- [ ] Materialised risks have a lesson captured.

## Common findings, phrased usefully

| Finding | Say it like this |
|---|---|
| Topic, not risk | "R4 reads 'integration complexity'. Rewrite as cause–event–effect naming the interface and the days at stake — as written it cannot be responded to." |
| Uniform scoring | "22 of 26 risks are 3×3. Rescore against §0 on the worst-affected dimension; the register currently gives the board no priority signal." |
| Response without action | "R7's response is 'monitor closely'. Either name the action, owner, and date, or reclassify as accepted with a fallback." |
| Unvalidated load-bearing assumption | "A3 (data quality above 95%) underpins the migration estimate and has no validation action. Sample the data this sprint — if it is 80%, M3 moves." |
| Dependency without commitment | "D2 has 'expected June' from the vendor with no contact and no confirmation. Get a named commitment or plan the fallback now." |
| Stale register | "No entry has been reviewed in 9 weeks and no risk has closed. Put the top five on the weekly status and re-review the full set at the stage boundary." |
| Tail risk in a total | "Total EMV of €140k includes a 2% × €3m regulatory risk. Separate it — it needs a board decision, not contingency." |

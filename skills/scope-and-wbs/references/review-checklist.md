# Review checklist — scope statement, WBS, and WBS dictionary

✅ pass / ⚠️ weak / ❌ blocking. Test the 100% rule branch by branch, not as a general impression.

## Scope statement

- [ ] Product scope and project scope are both present and distinguished.
- [ ] Exclusions are numbered and specific.
- [ ] Constraints state their consequence, not just their existence.
- [ ] Assumptions have owners and validate-by dates.
- [ ] Acceptance approach names who accepts what, in what order.
- [ ] Scope matches the charter and business case; any divergence is deliberate and noted.

## Structure

- [ ] Every level satisfies the 100% rule — children sum to the parent, nothing more.
- [ ] No two elements cover overlapping work.
- [ ] Elements above work-package level are nouns, not activities.
- [ ] One decomposition axis per level; no organisational-unit or calendar axis.
- [ ] Depth is proportionate (typically 2–4 levels); no branch decomposed far deeper than its siblings without reason.
- [ ] Hierarchical IDs present and stable.
- [ ] Stopping rule is stated and consistently applied.

## Completeness — the habitual omissions

- [ ] Project management and reporting effort
- [ ] Requirements elaboration
- [ ] Environments and test data
- [ ] Non-functional testing (performance, security, accessibility) and UAT
- [ ] Defect-resolution capacity
- [ ] Data migration including dry runs, reconciliation, and fallback
- [ ] Third-party interfaces and their lead times
- [ ] Documentation and runbooks
- [ ] Training and business-change work
- [ ] Operational readiness / service acceptance
- [ ] Cutover, rehearsal, and hypercare
- [ ] Procurement and licence lead time
- [ ] Decommissioning of what is replaced
- [ ] Closure, lessons, archive, and benefits-measurement setup

## WBS dictionary

- [ ] Every work package has an entry.
- [ ] Each entry states work included **and** explicitly excluded.
- [ ] Each has exactly one owner (a person or an organisation, not a team-of-many).
- [ ] Acceptance criteria are testable — a reviewer could fail the package.
- [ ] Estimate is present with its basis, not a bare number.
- [ ] Dependencies are named with the other party.

## Requirements and traceability

- [ ] Every requirement maps to at least one WBS element.
- [ ] Every WBS element traces to a requirement, an objective, or a mandated activity.
- [ ] Orphans in both directions are listed and explained.
- [ ] Each requirement has a verification method.
- [ ] Deliverables trace onward to a benefit in the business case.

## Prioritisation and flex

- [ ] Where the date is fixed, priorities are assigned and must-haves are bounded (≈60% of effort or less).
- [ ] "Won't have this time" items say where they go instead.
- [ ] Adaptive streams have a Definition of Done and a Definition of Ready.
- [ ] Backlog ordering method is stated, not implicit.

## Boundary

- [ ] Every interface with another project or with BAU appears as scope or as an exclusion.
- [ ] Work assumed to be done by another party is named, with that party's commitment status.
- [ ] Nothing in scope depends on a decision that has not been made and is not tracked.

## Baseline hygiene

- [ ] Version, date, and approver present.
- [ ] The effective date from which change control applies is stated.
- [ ] Change history shows what moved and who approved it.

## Common findings, phrased usefully

| Finding | Say it like this |
|---|---|
| 100% rule breach | "1.3 'Integration' has children for two of the four named interfaces in §1.2. Add 1.3.3 and 1.3.4 or move those interfaces to exclusions." |
| Activity as element | "1.4 is 'Manage testing'. Rename to the deliverable — 'Acceptance evidence pack' — and move the managing effort into 1.1." |
| Missing package | "No element covers data migration reconciliation, yet the objective requires a verified cutover. Add it under 1.5 with an owner and an estimate basis." |
| Overlap | "1.2.2 and 1.6.1 both include user documentation. Assign it to one and state the exclusion in the other's dictionary entry." |
| Unverifiable package | "1.2.3 acceptance reads 'to the satisfaction of the business'. Replace with the two pass/fail conditions from R7." |
| Orphan requirement | "R12 (audit logging) maps to no WBS element. Either add it or move it to exclusions with the sponsor's agreement." |
| Unbounded must-haves | "94% of effort is Must. Under a fixed date there is no flex left; re-prioritise or move the date." |

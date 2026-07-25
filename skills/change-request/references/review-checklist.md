# Review checklist — change request and change control

✅ pass / ⚠️ weak / ❌ blocking.

## Framing

- [ ] The request is stated in the requester's words **and** restated as a change to a named
      baseline element and version.
- [ ] Type is classified: request for change / off-specification / problem or concern.
- [ ] The "is this really a change?" test is answered — defect, failed assumption, excluded
      scope, or genuine change.
- [ ] The underlying need is identified, not just the proposed solution.
- [ ] Business reason references an objective, benefit, obligation, or defect.

## Impact analysis

- [ ] Every dimension is assessed or explicitly marked "none, because …".
- [ ] Schedule impact names the activities and states whether the critical path moves.
- [ ] Float consumption is considered, not only end-date movement.
- [ ] Rework of already-accepted work is costed.
- [ ] Retest, re-approval, and re-accreditation costs included.
- [ ] Documentation, training, and communication rework included.
- [ ] Recurring operating cost included, not just one-off delivery cost.
- [ ] Benefit effect quantified — value and timing.
- [ ] New, changed, and retired risks identified and reflected in the RAID log.
- [ ] Third-party and contractual implications identified.
- [ ] Compliance, security, and privacy implications addressed.
- [ ] Impact of **not** making the change is stated.
- [ ] Estimates carry a basis and a confidence, not bare numbers.

## Options and recommendation

- [ ] At least three options plus reject, each costed.
- [ ] A partial or cheaper alternative that meets the underlying need is genuinely explored.
- [ ] Defer is costed, including benefit deferral.
- [ ] Reject states the consequence.
- [ ] One recommendation, reasoned against the business case.

## Governance

- [ ] The deciding authority matches the charter's threshold for this value and type.
- [ ] Decision-needed-by date stated.
- [ ] Cost of delaying the decision stated separately from the cost of the change.
- [ ] Funding source named (change budget, contingency, new funding).
- [ ] Conditions of approval, if any, are written and assigned.
- [ ] Decision, decider, and date recorded once made.

## Propagation

- [ ] Baseline updates listed per artifact with a new version, owner, and date.
- [ ] Contract or SOW variation raised where supplier work changes.
- [ ] Acceptance criteria and test scope updated.
- [ ] Affected stakeholders identified for communication.
- [ ] The change log entry exists and is current.
- [ ] The next status report reflects the change.

## Process health (when reviewing the process, not one request)

- [ ] Thresholds and authorities are defined and known to the team.
- [ ] An assessment SLA exists, and actual assessment times meet it.
- [ ] A proportionality threshold exists so trivial changes are not formally processed.
- [ ] An emergency route exists with named authority and retrospective documentation.
- [ ] Cumulative approved change is reported every period against the original baseline.
- [ ] Cumulative change beyond ~15–20% of baseline has triggered a re-baselining conversation.
- [ ] There is no evidence of changes being absorbed without a request (compare delivered scope
      against the baseline).

## Common findings, phrased usefully

| Finding | Say it like this |
|---|---|
| Cost-only assessment | "Impact shows €18k of build effort. It also requires re-running the security review (4 weeks lead) and retraining 60 users. Add both — the schedule effect changes the recommendation." |
| Missing rework | "The revised data model invalidates the migration mapping already accepted at M2. Cost the rework and the re-reconciliation." |
| One option | "Only 'implement now' is offered. Add defer-to-phase-2 and a read-only alternative; the requester's stated need is reporting, not editing." |
| Wrong authority | "Approved by the PM at €62k against a €25k delegated limit (charter §8). Re-route to the board and record it." |
| Silent absorption | "Three of the six items in this release do not appear in the baseline or the change log. Raise them retrospectively so the cumulative position is honest." |
| No propagation | "CR-004 was approved six weeks ago; the schedule and business case still show the pre-change figures. Update both and reissue the baseline versions." |
| Misrouted off-spec | "This is an off-specification — the agreed encryption standard will not be met — not a change request. It needs a board concession decision, not a price." |
| Process bypass risk | "Every change, including a one-line label fix, needs board approval. Add a proportionality threshold or the team will stop raising them." |

---
name: change-request
description: Use when something needs to change after a baseline is set — raising or assessing a change request, variation, or change order; running impact analysis across scope, schedule, cost, quality, risk and benefits; preparing a change for a CCB or project board decision; or setting up the change-control process and its thresholds. Produces a decision-ready change request with options, impacts, a recommendation, and the baseline updates it triggers.
author: Specorator
license: MIT
tags: ["project-management", "change-control", "change-request", "baseline", "governance", "artifact"]
version: 1
---

# change-request

Change control is not resistance to change; it is making sure a change is *decided* rather
than absorbed. Absorbed change is the mechanism by which projects overrun without anyone
approving the overrun.

A change request answers: what is being asked, why, what it costs in every dimension, what the
alternatives are, who decides, and what gets updated once decided.

## Inputs to gather

- The baselines the change would alter, with versions (scope, schedule, cost, quality).
- The request itself: who is asking, what they want, and the business reason.
- Whether this is a **request for change** (a wanted alteration), an **off-specification**
  (something agreed will not be delivered as specified), or a **problem/concern** — the routes
  differ.
- Tolerances and change-authority thresholds from the charter, plus who sits on the change
  authority or CCB.
- Work already committed or in flight that the change would disturb, including anything ordered
  or contracted.
- For supplier work: the contract's variation clause and pricing basis.
- The contingency and change budget available, and who holds it.

## Produce

1. **State the request in the requester's terms**, then restate it as a change to a named
   baseline element. If it cannot be tied to a baseline element, it is not a change — it is a
   new requirement without a home, or it was never in scope.
2. **Classify it** — request for change / off-specification / concern — and note whether it is
   corrective (fixing a defect), preventive, or additive (new capability). Corrective work
   inside the agreed specification is normally not a change; say so plainly when that is the case.
3. **Analyse impact across every dimension**, not just cost: scope, schedule (including critical
   path and float), cost (one-off and recurring), quality, resources, risk, benefits,
   dependencies and third parties, operational readiness, and compliance. Use
   `references/impact-analysis.md` so nothing is skipped. State the impact of **not** doing it too.
4. **Cost the analysis honestly** — including rework of work already done, retesting,
   re-approval, documentation, retraining, and any contractual variation cost.
5. **Give options.** At least: implement now, defer to a later release or phase, reject, and a
   partial or cheaper alternative that meets the underlying need. Do-nothing is always an option
   and always costed.
6. **Recommend one option** with reasoning tied to the business case and the objectives.
7. **Route it correctly.** Below the delegated threshold, the PM decides and records; above it,
   the change authority or board decides. Say which and why, and name the decision date needed
   and the cost of delay (often a change gets cheaper the earlier it is decided — say so).
8. **On approval, list the baseline updates** — which artifacts change, to which version, by
   whom, by when. A change approved but not propagated is the second most common control
   failure after change absorbed silently.
9. **Log it** in the change log with its status and decision, and reflect the outcome in the
   next status report.

Fill `references/template.md`. To set up the process rather than raise one change, use the
process section in that file and set thresholds in the **project-charter**.

## Review mode

Use `references/review-checklist.md`. Common defects: impact assessed only on cost, no schedule
or benefit effect, rework of completed work ignored, no options, approval by someone without
the authority, and no record of the baseline updates that followed. Also check for the reverse
failure: a heavyweight change process applied to trivial changes, which drives teams to bypass
it entirely.

## Quality bar

- Tied to a named baseline element and version.
- Every impact dimension assessed or explicitly marked "none, because…".
- Rework, retest, and re-approval costs included.
- At least three options including do-nothing, each costed.
- Recommendation reasoned against the business case, not preference.
- Routed to the authority that the charter says decides at that value.
- Baseline updates listed with owner and date.
- Cost of delaying the decision stated.

## Grounding

PMBOK® Guide 7/8 change-control practice — the change log and change-management plan,
integrated change control over the scope, schedule, and cost baselines, and the change control
board's authority; PRINCE2® 7 Issues practice — the three issue types (request for change,
off-specification, problem/concern), issue register and issue report, change authority with a
delegated change budget, and severity-based escalation via exception; ISO 21502:2020 change
control practice; the European Commission's PM² Change Request Form, Change Log, and Project
Change Management Plan; contract-variation practice for supplier work (written variation,
priced impact assessment, and unauthorised work being non-chargeable).

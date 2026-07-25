# Impact analysis — the dimensions, the hidden costs, and the governance

## Why cost-only assessment fails

Most change requests are assessed on build effort alone. The costs that actually cause the
overrun sit elsewhere: rework of accepted work, retesting, re-approval, retraining, documentation,
contract variation, and the schedule effect of taking capacity away from something on the
critical path. Assess every dimension below, and record "none, because …" where there is truly
no impact — a blank field reads as "not considered".

## Dimension prompts

**Scope.** Which WBS elements, requirements, or product descriptions change? Does anything
already delivered become obsolete? Does anything in scope become unnecessary (a credit)?

**Schedule.** Which activities change duration or logic? Is any affected activity on the
critical path or near-critical? Does it consume float another path needs? Does it move a
committed milestone or a contractual date? Does it collide with a freeze window or change
window?

**Cost.** One-off delivery cost; recurring operating cost after go-live; licence implications;
capital vs operating treatment; currency exposure for imported goods or services.

**Rework.** Work already completed and accepted that must be redone. This is the line most
often forgotten and most often the largest single element.

**Test and assurance.** Regression scope, retest effort, re-execution of performance or security
testing, re-accreditation, re-approval by a regulator or a security review board.

**Documentation and training.** User docs, runbooks, training material, delivered training that
must be repeated, communications already sent that must be corrected.

**Resources.** Skills needed, availability, whether adding people is even feasible in the
timescale, and what those people stop doing.

**Quality.** Does the change raise or lower the quality bar? Does it introduce technical debt,
and is that debt recorded with a repayment plan?

**Risk.** New risks introduced; existing risks made more or less likely; risks retired by the
change. Update the RAID log, do not just mention it.

**Benefits.** Does the benefit case improve, degrade, or shift in time? A change that costs
€40k and delays €400k of annual benefit by a quarter is a €140k decision, not a €40k one.

**Dependencies and third parties.** Interfaces affected, partner re-planning, supplier lead
times, and whether another project's plan changes as a result.

**Commercial.** Contract variation required, pricing basis, whether the supplier's original
fixed price still stands, warranty and support implications.

**Operational readiness.** Support model, monitoring, capacity, runbooks, service acceptance
criteria, hypercare period.

**Compliance and privacy.** Regulatory obligations, DPIA update, records retention, audit
evidence, accessibility conformance.

**Sustainability / ESG.** Where the organisation reports on project sustainability, note the
effect on the tracked measures.

## The three issue types, and why routing matters

| Type | Definition | Route |
|---|---|---|
| **Request for change** | A wanted alteration to an approved baseline | Change control; priced; authority decides by threshold |
| **Off-specification** | Something agreed will not be delivered, or not as specified | Board or change authority: accept a concession, or fund the fix |
| **Problem / concern** | Anything else threatening delivery | Resolve within the team if possible; escalate by exception if it breaches tolerance |

Misrouting is expensive: an off-specification handled quietly as a "change" hides a promise
being broken, and a defect processed as a chargeable change hands the supplier a windfall.

## Is it really a change? Decision test

1. Is there an approved baseline element that this alters? *No → it is not a change; it is a new
   requirement (or it was always excluded).*
2. Is the work needed to meet the **already agreed** specification? *Yes → it is a defect, at the
   delivering party's cost, not a change.*
3. Did a documented assumption fail? *Yes → the assumption's owner absorbs the consequence per the
   agreement; often a legitimate change with a clear cause.*
4. Was it in the exclusions list? *Yes → a new scope addition, priced accordingly.*
5. Is it below the proportionality threshold? *Yes → log it, do it, do not formally assess it.*

Write the answer down. Half of all change disputes are about which of these five applies.

## Options discipline

A change request with one option is a request for rubber-stamping. Always give:

- **Implement now** — full impact.
- **Defer** — to a later phase, release, or a follow-on project, with what deferral costs (often
  the honest answer for anything not blocking a benefit).
- **Partial or alternative** — the cheapest thing that meets the underlying need. Ask the
  requester *what problem are you solving* rather than accepting the proposed solution.
- **Reject** — with the consequence spelled out.

State the **cost of delay on the decision** separately from the cost of the change. Changes get
more expensive the later they are decided, and quantifying that is what gets a board to decide
in the meeting rather than deferring it.

## Cumulative drift

Every individual change can be affordable while the total is not. Report every period:

```
approved to date: € X and Y days
pending assessment: € Z
change budget remaining: € W
% of original BAC consumed by change: …
```

A project where approved changes exceed 15–20% of the original baseline is not being changed,
it is being re-scoped: raise it as a re-baselining conversation with the board rather than
continuing to process increments.

## Proportionality — the other failure mode

An over-heavy process produces bypass, and bypass produces uncontrolled change. Keep it usable:

- A threshold below which changes are logged and done, not assessed.
- An assessment SLA in business days, so the process does not become the delay.
- A single-page form for anything below the board threshold.
- An emergency route with named verbal authority and retrospective documentation within a set
  time — because incidents will not wait for a fortnightly CCB.

## Post-decision propagation

Approved and not propagated is the second most common control failure. Confirm each of these
happened, with a date and an owner:

scope baseline · schedule and its baseline · budget and forecast · RAID log · business case ·
contract or SOW variation · test and acceptance criteria · training and documentation plan ·
communications to affected stakeholders · the change log entry itself · the next status report.

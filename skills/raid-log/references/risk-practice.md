# Risk practice — statements, scoring, responses, and identification

## Writing a usable risk statement

Format: **because <cause — a fact>, <uncertain event> may occur, leading to <effect on a named
objective>.**

| Bad | Why | Better |
|---|---|---|
| "Resourcing" | A topic, not a risk | "Because two of three integration developers are shared with the billing programme, they may be pulled off in Q3, delaying interface delivery by 3–6 weeks and putting M4 at risk." |
| "The project might be late" | An effect with no cause or event | "Because the security review slot is not yet booked, review may start after the freeze window, pushing go-live past the regulatory deadline." |
| "Vendor risk" | Unactionable | "Because the vendor has not confirmed the API version, they may ship v2 instead of v3, requiring 15 days of rework in the adapter." |
| "Users may resist" | No cause, no measurable effect | "Because no branch manager has been involved in design, the pilot may see under 40% adoption, deferring 60% of the year-1 benefit." |

Test: could two people independently agree whether it happened, and does the effect name a
number, a date, or a named objective? If not, rewrite.

## Categories worth walking through (prompt list)

Commercial and supplier · technical and architectural · resource and key-person ·
schedule and dependency · scope and requirements · data and migration · security and privacy ·
compliance and regulatory · financial and funding · organisational change and adoption ·
operational readiness · third-party and integration · environmental and sustainability ·
health and safety · reputational · AI and automation (model behaviour, data provenance,
human-oversight failure).

Use the category list as an identification prompt in workshops — it surfaces the risks nobody
raises spontaneously, particularly adoption, operational readiness, and decommissioning.

## Identification techniques (IEC 31010, proportionate selection)

| Technique | Good for | Cost |
|---|---|---|
| Structured checklist / prompt list | Fast coverage of known categories | Low |
| Facilitated workshop | Cross-team dependencies and disagreement | Medium |
| Assumption analysis | Turning silent assumptions into visible risk | Low |
| Pre-mortem | Schedule and adoption risk, honestly | Low |
| Interviews with delivery staff | Risks people will not say in a group | Medium |
| Lessons from comparable projects | The best predictor available | Low |
| Cause-and-effect / fault tree | Complex technical failure modes | High |
| Bow-tie analysis | Safety and compliance, cause-to-consequence with barriers | High |
| Monte Carlo on the schedule | Aggregate schedule exposure and merge bias | High |

Match the technique to the decision at stake. A two-month internal project does not need a
fault tree; a safety-relevant one needs more than a checklist.

## Scoring without deceiving yourself

- Score against **agreed** scales, ideally the organisation's own. Two projects using different
  scales cannot be compared at portfolio level.
- Score impact on the *worst affected dimension*, and record which dimension it was.
- Record **inherent** (pre-response) and **residual** (post-response) scores. If they are
  always the same, the responses are not doing anything.
- Beware the medium-everything register: if more than half of entries land in one band, the
  scale or the scoring discipline is broken.
- Very-low-probability / catastrophic-impact risks do not belong in an EMV total. Call them out
  separately with a specific decision (accept, insure, redesign, or stop).
- **Proximity** matters as much as severity: a high risk six months away and a medium risk next
  week need different attention. Record a "when could it bite" date.
- Re-score at review, and record the date. An unchanged register is not a stable project; it is
  an unread document.

## Response strategies

**Threats**

| Strategy | Meaning | Example |
|---|---|---|
| Avoid | Remove the cause or change the plan so it cannot occur | Drop the optional integration; choose the proven component |
| Reduce | Lower probability, impact, or both | Prototype early; book the review slot now; add automated regression |
| Transfer | Move the financial consequence elsewhere | Insurance, fixed-price contract, indemnity, warranty |
| Share | Split exposure with another party | Pain/gain contract, joint venture |
| Accept | Take it knowingly | Active: hold contingency. Passive: monitor only — and say so |

**Opportunities**: exploit (make it certain), enhance (raise probability or impact), share
(partner to capture it), accept.

Rules: every response is an action with an owner and a date; "monitor" is not a response;
the cost of the response should be visible where it is material; and a fallback plan is
required for any accepted risk that would breach a tolerance.

## Contingency sizing

```
EMV of a risk = probability × cost impact
Contingency (one input) = Σ EMV of open threats − Σ EMV of open opportunities
```

Then sanity-check against: (a) comparable projects' actual overruns, (b) the largest single
exposure, and (c) any risk that would breach tolerance on its own. Present contingency as a
range with its basis, state who holds it, and state how it is released — otherwise it will be
spent as budget rather than drawn against risk.

Schedule contingency works the same way but belongs as a buffer at merge points and before
committed milestones, not spread across activities (see the project-schedule skill).

## Escalation and tolerance

- A risk whose materialisation would breach a tolerance is escalated *before* it materialises,
  not after.
- An issue that has already breached a tolerance triggers an exception report with options and
  a recommendation — never a bare problem.
- PRINCE2 issue types are a useful triage: **request for change**, **off-specification**
  (something will not be delivered as agreed), and **problem/concern**. The route differs:
  the first goes to change control, the second to the board, the third may be resolvable
  inside the team.
- Record the escalation date and the response. An escalation with no recorded response is an
  audit finding.

## Keeping the log alive

| Symptom | Underlying cause | Fix |
|---|---|---|
| No change in two months | Nobody reviews it | Put the top 5 on the status report and review them in the weekly |
| 80 open entries | No closure discipline | Close what has passed; merge duplicates; archive with outcomes |
| All medium | Scoring to avoid attention | Rescore with the agreed scales, in a group, on the worst dimension |
| No owners | Log created for a gate, not for use | One named owner per entry, or delete the entry |
| Issues that were never risks | Identification is only reactive | Add a monthly prompt-list pass and a pre-mortem at each stage start |
| Only threats | Culture treats risk as bad news | Ask explicitly for opportunities at each review |

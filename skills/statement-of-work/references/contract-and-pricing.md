# Contract structures, pricing models, and where each one bites

## Where an SOW sits

| Document | Carries | Changes how often |
|---|---|---|
| Master agreement (MSA / framework) | Legal terms: liability, indemnities, IP, confidentiality, insurance, dispute resolution | Rarely |
| **Statement of work** | What is being done, by when, for how much, accepted how | Per engagement |
| Change request / variation | Amendments to the SOW | Continuously |
| Purchase order | Commercial authorisation to spend | Per SOW or milestone |

Always state the precedence order. Without it, a supplier proposal with optimistic
assumptions can override the negotiated SOW.

## Pricing models

| Model | Buyer bears | Supplier bears | Use when | Watch for |
|---|---|---|---|---|
| **Firm fixed price** | Scope rigidity | Cost overrun | Scope is genuinely definable and stable | Padding; change-request treadmill; quality corner-cutting |
| **Fixed price with incentive** | Some cost risk | Cost overrun above target | Long engagements with measurable performance | Incentive formula must be arithmetic, not judgement |
| **Time and materials** | Cost overrun | Little | Scope emergent, buyer steers priorities | No ceiling; effort without outcome |
| **Capped T&M / not-to-exceed** | Cost to the cap | Cost above cap | Adaptive work with a budget limit | What happens at the cap must be written down |
| **Milestone / deliverable-based** | Definition risk | Delivery risk | Discrete outputs with testable acceptance | Milestones that are dates, not evidenced completions |
| **Retainer / capacity** | Utilisation | Availability | Ongoing support, steady demand | Unused capacity; no output definition |
| **Outcome / outcome-based** | Measurement design | Delivery and adoption | Measurable business result under supplier control | Measures the supplier cannot influence |
| **Cost reimbursable** | Nearly all cost risk | Little | Research, emergency, undefinable work | Requires audit rights and cost-eligibility rules |

Mapping to PMBOK's agreement categories: firm fixed price and its variants; cost-reimbursable
(cost plus fixed fee, cost plus incentive fee, cost plus award fee); time and materials; and
indefinite-delivery vehicles for call-off work.

## Making adaptive work contractible

Fixed-price fixed-scope and adaptive delivery are in direct tension. Workable patterns:

- **Capacity with a prioritised backlog** — buy a stable team for N sprints; the buyer owns
  ordering; the supplier commits to cadence, quality bar, and Definition of Done rather than
  a fixed feature list.
- **Fixed price per increment** — price each increment once its scope is known at the start
  of that increment; the SOW fixes the process, the increments fix the scope.
- **Money-for-nothing / change-for-free** — the buyer may terminate early and pay a stated
  fraction of remaining value; scope may be swapped one-for-one at equal size at no charge.
- **Fixed date and price, variable scope** — with a written must-have set (MoSCoW) and the
  rest explicitly negotiable. Most honest option under a hard deadline.

Whichever you pick, define "done" contractually: the Definition of Done, the acceptance
procedure, and the quality gates belong in the SOW, not in a wiki.

## Payment triggers that survive scrutiny

Weak triggers are the most common SOW defect. Compare:

| Weak | Strong |
|---|---|
| "On completion of Phase 1" | "On buyer's written acceptance of D3 and D4 under §4" |
| "Monthly" | "Monthly in arrears against a timesheet report approved by the buyer's delivery lead" |
| "On go-live" | "On completion of cutover, evidenced by the signed cutover checklist and 5 consecutive days at agreed service levels" |
| "50% up front" | "20% on SOW signature, remainder against accepted milestones per §9" |

Also state what starts the payment clock — invoice date, receipt of a valid invoice, or
acceptance date. This single sentence is worth weeks of working capital.

## Retained-risk checklist

Who pays if:

- Buyer's environment or data is late? (→ buyer dependency with day-for-day relief and standby rate)
- A third party the supplier depends on fails? (→ named, with a relief mechanism)
- Requirements change after baseline? (→ change control, priced per §11)
- Acceptance testing finds defects? (→ rework at supplier cost, with a cycle limit)
- The work takes longer because it was underestimated? (→ pricing model decides; say it plainly)
- Key personnel leave? (→ substitution clause with skill equivalence)
- The buyer cancels early? (→ notice, payment for work performed, hand-over obligations)
- Personal data is breached? (→ notification window, cooperation, per the master agreement)

## Red flags in a supplier-drafted SOW

- Deliverables described as activities ("provide consultancy support") — nothing can be missed.
- Acceptance defined as "buyer will review" with no window, criteria, or rejection consequence.
- Deemed-acceptance in short windows over holiday periods.
- Assumptions that quietly transfer scope back to the buyer.
- Estimates presented as commitments in one section and disclaimed in another.
- Rate card without hours-per-day, or expenses uncapped.
- "As mutually agreed" on anything that costs money.
- Precedence clause putting the supplier's proposal above the SOW.
- Liability cap far below the value of the buyer's exposure, buried in an annex.

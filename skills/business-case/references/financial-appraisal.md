# Financial appraisal — formulas, conventions, and traps

## Core formulas

| Metric | Formula | Reading it |
|---|---|---|
| Discount factor for year *n* | `1 / (1 + r)^n` | `r` = discount rate; state the rate you used and where it came from |
| Present value | `cash flow_n × discount factor_n` | Discount both costs and benefits |
| **NPV** | `Σ (benefit_n − cost_n) / (1 + r)^n` | > 0 → value-adding at that discount rate |
| **Benefit–cost ratio** | `PV of benefits / PV of costs` | > 1 → benefits exceed costs; compare options on this |
| **Payback period** | first year where cumulative net cash flow ≥ 0 | Simple; ignores time value unless discounted |
| **ROI** | `(total benefit − total cost) / total cost` | Blunt; always say over what period |
| **IRR** | discount rate at which NPV = 0 | Unreliable for irregular or sign-changing flows |
| **EMV of a risk** | `probability × cost impact` | Feeds contingency, not the base estimate |

Conventions worth stating explicitly in the case: appraisal period, discount rate, price
base (real vs nominal), currency and FX assumption, internal day rate, and whether benefits
start at go-live or after a ramp-up.

## Benefit types — keep them apart

| Type | Definition | Can it be booked? |
|---|---|---|
| **Cash-releasing** | A budget line actually reduces or is avoided | Yes — the budget holder must agree the reduction |
| **Non-cash-releasing** | Time or capacity freed, no budget change | Only as capacity; do not present as savings |
| **Revenue / income** | New or protected income | Yes, with a demand assumption stated |
| **Cost avoidance** | A future cost that will not now occur | Only if the future cost is evidenced and committed |
| **Unquantifiable** | Reputation, compliance posture, morale | Describe; never assign a made-up number |

Never total across types. A single figure combining "€400k saved" and "1,200 hours freed"
is the most common way a business case loses credibility.

## Costing checklist

- Internal effort at a published day rate, with the FTE assumption shown.
- Recurring cost for the whole appraisal period, not just year 1.
- Transition, training, data migration, parallel running, decommissioning.
- Licence escalation and support renewals.
- Cost of the business change, not just the technical delivery.
- Contingency with a stated basis (risk EMV total, or an uplift % justified by comparable projects) — never a round 10% with no explanation.
- Sunk costs excluded from the appraisal; note them separately if politically relevant.

## Countering optimism bias

Reference class forecasting (Flyvbjerg, building on Kahneman) is the practical remedy:
take the outside view. Identify a class of comparable completed projects, use their actual
cost and schedule outturns, and apply the resulting uplift to your base estimate rather than
arguing about why this project is different.

Practical version when no formal reference class exists:

1. Find three to five comparable delivered projects in the organisation.
2. Record their estimate-at-approval vs actual outturn for both cost and duration.
3. Apply the median overrun as an uplift, and state that you did.
4. Where the uplift is politically unacceptable, record that as an assumption with the
   sponsor's name against it.

Also worth testing: whether benefits were realised on those comparables. Benefit shortfall
is usually larger than cost overrun and much less often measured.

## Sensitivity and switching values

Run at minimum: benefits −30%, costs +30%, six months late. Then compute the **switching
value** — the point at which the recommendation changes. "The case fails if adoption falls
below 55% of users" is far more useful to a decision-maker than a single NPV.

## Traps to check for in review

| Trap | How to spot it |
|---|---|
| No baseline | A benefit with a target but no current-state figure |
| Double counting | The same headcount saving appears in two benefit lines, or a benefit also claimed by another project |
| Benefit for free | A benefit requiring business change that no one has funded or owned |
| Do-nothing straw man | Option 0 given costs it would not actually incur, or none of the risks it would avoid |
| Contingency as slack | A percentage with no risk basis, or contingency inside the base estimate |
| Discount rate shopping | A rate chosen to make NPV positive; compare against the organisation's standard rate |
| Ramp-up ignored | Full benefit assumed from month 1 of go-live |
| Whole-life gap | No operating or decommissioning cost beyond the delivery period |
| Unowned benefit | No named person in the receiving business accountable for realisation |

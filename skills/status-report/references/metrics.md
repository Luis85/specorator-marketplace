# Progress metrics — earned value, flow, and how to read them

## Earned value: the three inputs

| Term | Meaning |
|---|---|
| **BAC** | Budget at completion — the total authorised budget for the work |
| **PV** | Planned value — budgeted cost of the work *scheduled* to date |
| **EV** | Earned value — budgeted cost of the work *actually completed* to date |
| **AC** | Actual cost — what has been spent to achieve that work |

Everything else derives from these four. EV is the one that takes discipline: it must come from
an objective completion rule, not from opinion.

| EV method | Rule | Best for |
|---|---|---|
| 0/100 | Credit only on completion | Short packages; the most honest default |
| 50/50 | Half on start, half on completion | Packages spanning two periods |
| Milestone weighting | Credit at defined interim milestones | Long packages with verifiable states |
| Units complete | Physical units × budget per unit | Repetitive work (interfaces, sites, test cases) |
| Percent complete | Estimator's judgement | Avoid — it is the source of the 90%-done syndrome |

## Variances and indices

```
SV  = EV − PV            negative = behind schedule (in cost terms)
CV  = EV − AC            negative = over budget
SPI = EV / PV            < 1 = behind schedule
CPI = EV / AC            < 1 = over budget
```

## Forecasting

```
EAC (CPI trend)        = BAC / CPI                        current efficiency continues
EAC (atypical)         = AC + (BAC − EV)                  the overrun was one-off
EAC (CPI × SPI)        = AC + (BAC − EV) / (CPI × SPI)    both cost and schedule pressure continue — most pessimistic
EAC (re-estimate)      = AC + bottom-up ETC               when the original basis no longer holds
ETC                    = EAC − AC
VAC                    = BAC − EAC                        negative = forecast overrun
TCPI (to BAC)          = (BAC − EV) / (BAC − AC)           efficiency needed to still hit BAC
TCPI (to EAC)          = (BAC − EV) / (EAC − AC)
```

Always name the EAC method you used. Quoting an EAC without its method is unfalsifiable.

## Reading the numbers

| Signal | Likely meaning | Response |
|---|---|---|
| CPI < 0.9 | Rarely recovers without scope or budget change | Re-baseline conversation, not a promise to improve |
| SPI < 1 with CPI ≈ 1 | Behind but efficient — usually resource shortfall | Add capacity or move the date |
| SPI ≈ 1 with CPI < 1 | On time by overspending | Check for unrecorded overtime or scope absorbed |
| TCPI > 1.1 | The required efficiency exceeds anything achieved so far | Present the EAC, not the BAC, as the operative number |
| EV flat, AC rising | Effort with no completed work | Look for a blocked dependency or work not being closed out |
| SPI recovering near the end | SPI always converges to 1 at completion | Stop using SPI in the last 10–15%; use remaining milestones instead |

Two structural limits worth stating in a report: SPI is measured in cost units, so it hides
*which* work is late — a project can be on SPI and still miss the critical path; and earned value
says nothing about quality. Pair it with defect and acceptance data.

## Flow metrics for adaptive streams

| Metric | Definition | Use |
|---|---|---|
| **Throughput** | Items completed per period | Forecasting; trend matters more than the value |
| **Cycle time** | Start-of-work to done, per item | Report the 50th and 85th percentile, never the mean |
| **WIP** | Items started but not done | Leading indicator; rising WIP predicts falling throughput |
| **Flow efficiency** | Active time ÷ total elapsed time | Exposes waiting as the real constraint (often 15–40%) |
| **Little's law** | `cycle time ≈ WIP / throughput` | Sanity-check a promise to go faster without cutting WIP |
| **Scope growth** | Items added per period | The most common reason a "stable velocity" forecast is wrong |
| **Age of WIP** | How long each in-progress item has been open | Best daily signal; surfaces stuck work before it slips |

Forecast as a range: "at the last eight sprints' 85th-percentile throughput, the remaining 96
items complete between 12 March and 9 April, assuming scope growth continues at 8 items per
sprint." Then state which of those assumptions the reader should doubt.

Avoid: velocity as a productivity measure (it is a capacity constant, and it inflates on
demand), story points across teams, and mean cycle time (the distribution is right-skewed, so
the mean understates the tail every time).

## Hybrid reporting

Report per stream in the stream's own metrics, then reconcile into **one** overall position —
schedule and cost against the committed milestones, since that is what the board authorised.
Never publish two competing truths; the discipline is a single overall RAG with per-stream
evidence beneath it.

## RAG criteria that hold

Publish them in the report, and apply them literally:

| Status | Definition |
|---|---|
| 🟢 | Within all tolerances; no intervention needed |
| 🟡 | Forecast to breach a tolerance unless a named intervention lands |
| 🔴 | A tolerance is breached, or a breach is unavoidable |

Watermelon reporting — green outside, red inside — comes from status being a judgement rather
than a test. Tie each colour to the tolerance table in the charter and the argument disappears.
Also record who set the status and when it last changed: a project that has been amber for six
periods is not amber, it is red with a comfortable label.

## Vanity metrics to keep out of a report

Hours worked · tasks closed · lines of code · number of meetings · documents produced ·
percentage complete with no objective basis · velocity as an achievement · "on track" with no
baseline named. Each measures activity rather than progress toward an outcome, and their
presence usually correlates with the absence of the metrics that would show the truth.

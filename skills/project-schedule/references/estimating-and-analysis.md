# Estimating, network analysis, and forecasting

## Effort, duration, and the productive fraction

```
duration = effort / (assigned resource × productive fraction)
```

The productive fraction is the share of a working day actually available for project work.
Realistic values: 60–70% for people with operational duties, 70–80% for dedicated team
members. Using 100% is the single most common cause of schedules that are wrong from day one.

State the fraction you used. Also reflect: public holidays, annual leave, notice and
onboarding periods, part-time allocations, and context-switching cost when someone is split
across two or more projects (assume a 20–40% penalty above two).

## Estimating techniques

| Technique | How | Accuracy | Use when |
|---|---|---|---|
| **Analogous** | Scale from a comparable completed piece of work | −25% to +75% early | Little detail; a genuine comparable exists |
| **Parametric** | Rate × quantity (e.g. days per interface, hours per test case) | Good where rates are calibrated | Repetitive, measurable units |
| **Bottom-up** | Estimate each work package, roll up | Best, at high cost | Scope is decomposed and stable |
| **Three-point / PERT** | `E = (O + 4M + P) / 6`, `σ = (P − O) / 6` | Captures uncertainty | Anything uncertain but boundable |
| **Triangular** | `E = (O + M + P) / 3` | Cruder, pessimism-tolerant | Very rough sizing |
| **Wideband Delphi** | Independent estimates, discuss divergence, re-estimate | Reduces anchoring | High-stakes or contested estimates |
| **Relative sizing** | Story points / t-shirts, converted by measured throughput | Good for adaptive work with history | A team with actuals |
| **Reference class** | Distribution of outturns from a class of similar past projects | Best correction for bias | Any significant commitment |

Always record the basis with the number. An estimate without a basis cannot be challenged,
re-used, or improved.

## Combining uncertainty

For a chain of independent activities on one path:

```
E_path = Σ E_i
σ_path = √( Σ σ_i² )
```

So a path's uncertainty grows more slowly than its length — which is exactly why buffering the
path is more efficient than padding each activity. Approximate confidence bands: `E ± σ` ≈ 68%,
`E ± 2σ` ≈ 95%. Present the band, not just the point.

Where paths merge, remember **merge bias**: a milestone fed by several parallel paths finishes
late if *any* path is late, so the joint probability of on-time delivery is lower than any
single path's. Two paths at 80% each give roughly 64% at the merge point. Monte Carlo
simulation models this properly; a manual sanity check is to buffer the merge point itself.

## Network analysis

| Term | Definition |
|---|---|
| Forward pass | Earliest start/finish for each activity, working left to right |
| Backward pass | Latest start/finish that does not delay the end, right to left |
| **Total float** | Latest start − earliest start: delay available before the *project* slips |
| **Free float** | Delay available before the *successor* slips |
| **Critical path** | The longest path; zero total float; determines the end date |
| Near-critical | Float small enough that ordinary variation makes it critical |

Practical rules:

- Model logic, not dates. A "start no earlier than" constraint on a dozen activities means the
  network is decorative.
- Prefer finish-to-start. Every SS/FF and every lead or lag needs a written reason.
- Avoid open ends: every activity except the first has a predecessor and every activity except
  the last has a successor.
- Watch for **too much float** — usually a missing dependency, not genuine slack.
- Watch for **zero float everywhere** — usually artificial constraints or a fully sequential
  plan for work that is really parallel.
- Long activities (> 2–3 reporting periods) hide progress; break them at verifiable states.

## Critical chain buffering

An alternative to per-activity padding, and the more honest structure:

1. Estimate activities at roughly 50% confidence (aggressive but possible).
2. Remove all local padding.
3. Add a **project buffer** at the end of the critical chain, sized at roughly 30–50% of the
   chain's aggressive length or from `σ_path`.
4. Add **feeding buffers** where non-critical paths merge into the chain.
5. Manage buffer consumption as the primary progress signal: report percentage of buffer used
   against percentage of chain complete.

Buffer consumption is a far better early-warning indicator than percentage complete, because
it cannot be talked up.

## Correcting for optimism

Schedules are systematically optimistic — the planning fallacy is robust and survives
awareness of it. Practical corrections, in order of effectiveness:

1. **Reference class forecasting.** Take three to five comparable delivered projects, record
   their planned vs actual durations, and apply the median overrun as an uplift. State that
   you did it, and the uplift used.
2. **Estimate the outside view first.** Ask "how long do projects like this take?" before
   decomposing; if the bottom-up total is far lower, find out why before publishing.
3. **Independent review.** Someone not invested in the plan reviews the logic and the top
   ten estimates.
4. **Pre-mortem.** "It is six months later and we are twelve weeks late — what happened?"
   Turn each answer into a risk, a dependency, or a buffer.

## Compression, and what it costs

| Technique | Mechanism | Cost |
|---|---|---|
| **Fast tracking** | Run activities in parallel that were sequential | Rework risk, coordination overhead |
| **Crashing** | Add resources to critical activities | Cost, onboarding drag, Brooks's law on late work |
| **Scope reduction** | Move should/could-haves out of this release | Benefit deferral — needs sponsor agreement |
| **Reducing quality gates** | Skip or shorten testing | Almost always pays back later with interest; flag as a risk, not a plan |
| **Longer hours** | Overtime | Short-lived; productivity and defect rates degrade within weeks |

Recompute the critical path after every compression — it usually moves, and compressing the
old path buys nothing.

## Forecasting adaptive streams

| Input | Source |
|---|---|
| Throughput | Items completed per period, last 5–10 periods |
| Cycle time distribution | 50th, 85th, 95th percentile from actuals |
| Backlog size | Remaining items, with a growth rate for scope discovered so far |
| WIP | Current; Little's law: `cycle time ≈ WIP / throughput` |

Forecast as a range: "at the 85th-percentile throughput of the last eight sprints, the
remaining 96 items complete between 12 March and 9 April". Never convert velocity to a single
date without stating the confidence and the scope-growth assumption. If the backlog has grown
every period, the forecast must include that growth rate or it is knowingly wrong.

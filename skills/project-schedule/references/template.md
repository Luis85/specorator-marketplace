# Schedule — {{project name}}

| | |
|---|---|
| **Version / date** | |
| **Author** | |
| **Approved by** | |
| **Status** | Draft / Baselined |
| **Scope baseline used** | v… dated … |
| **Planning unit** | days / weeks / sprints |
| **Working calendar** | days per week, holidays, freeze periods |

## 1. Milestone spine

| M | Milestone (a verifiable state) | Planned date | Decision / gate attached | Evidence of completion | Owner |
|---|---|---|---|---|---|
| M1 | | | | | |
| M2 | | | | | |

Committed external dates and their driver:

| Date | Driver | Consequence of missing it |
|---|---|---|
| | Regulatory / contractual / seasonal | |

## 2. Activities

| ID | WBS | Activity | Owner | Effort | Resource × productive % | Duration | Estimate basis | Predecessors (type, lag) |
|---|---|---|---|---|---|---|---|---|
| A10 | 1.2.1 | | | 40 h | 1 × 70% | 7 d | Three-point (32/38/56) | — |
| A20 | 1.2.2 | | | | | | Analogous — project X | A10 FS |

Estimate basis codes: **AN** analogous · **PA** parametric · **EJ** expert judgement ·
**3P** three-point/PERT · **AC** actuals from a prior increment.

## 3. Dependency logic

| From | To | Type | Lag | Mandatory or preferred | Reason |
|---|---|---|---|---|---|
| A10 | A20 | FS | 0 | Mandatory | Output of A10 is input to A20 |
| A30 | A40 | SS | +3 d | Preferred | Overlap to compress; needs both resources available |

**External dependencies**

| # | We need | From (party + named contact) | Committed date | Confidence | Fallback if late |
|---|---|---|---|---|---|
| E1 | | | | High/Med/Low | |

**Date constraints used** (should be few — each one hides logic)

| Activity | Constraint | Why it is not expressible as a dependency |
|---|---|---|
| | Start no earlier than … | |

## 4. Critical path and float

| Path | Activities | Length | Float | Threatens which milestone |
|---|---|---|---|---|
| Critical | | | 0 | |
| Near-critical 1 | | | ≤ … d | |

Longest-pole activities (top three by duration on or near the critical path), and what would
shorten each.

## 5. Contingency and buffers

| Buffer | Position | Size | Basis | Released by |
|---|---|---|---|---|
| Milestone buffer M3 | before M3 | 10 d | Risk EMV + estimate σ on the path | PM within tolerance |
| Project buffer | before final milestone | | | Sponsor |

Rule: no padding inside activity estimates. All contingency is visible, sized, and owned.

## 6. Resource feasibility

| Resource / role | Required peak | Available | Gap | Action |
|---|---|---|---|---|
| | | | | |

Levelling decisions made, and their effect on the end date. Holidays, notice periods, and
recruitment or onboarding lead times reflected: yes/no, where.

## 7. Adaptive stream forecast (if applicable)

| | |
|---|---|
| **Cadence** | e.g. 2-week sprints, releases monthly |
| **Team capacity** | |
| **Backlog size** | in points / stories / items, with refinement horizon |
| **Throughput or velocity (actuals)** | last 5 periods: … |
| **Forecast** | earliest / likely / late — e.g. "80% confidence of feature-complete between 12 Mar and 9 Apr" |
| **Fixed dates this stream must hit** | integration points, release windows, freeze dates |

## 8. Reality check

| Check | Result |
|---|---|
| Comparable completed projects (duration, outturn vs plan) | |
| This plan vs those comparables | faster / similar / slower — and why |
| Peak resource demand vs any prior achieved level | |
| Number of parallel workstreams vs team's demonstrated capacity | |

## 9. Assumptions the dates depend on

| # | Assumption | Effect on end date if false | Owner | Validate by |
|---|---|---|---|---|
| 1 | Test environment available from … | +… weeks | | |

## 10. Baseline record

| Version | Date | End date | What changed | Approved by |
|---|---|---|---|---|
| 1.0 | | | Initial baseline | |

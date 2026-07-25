# Scope Baseline — {{project name}}

| | |
|---|---|
| **Version / date** | |
| **Author** | |
| **Approved by** | |
| **Status** | Draft / Baselined |
| **Change control from** | (date the baseline takes effect) |

## 1. Scope statement

### 1.1 Product scope
What the delivered thing is: its characteristics, capabilities, and the standards it meets.

### 1.2 Project scope
The work required to produce and hand over that product, including management, quality,
transition, and closure work.

### 1.3 Exclusions
Explicitly not delivered:
1. 

### 1.4 Constraints
| Type | Constraint | Consequence for decomposition |
|---|---|---|
| Date | | |
| Budget | | |
| Regulatory | | |
| Technical | | |
| Organisational | | |

### 1.5 Assumptions
| # | Assumption | Owner | Validate by |
|---|---|---|---|
| 1 | | | |

### 1.6 Acceptance approach
Who accepts what, against which criteria, in what sequence.

## 2. Work breakdown structure

Decompose by deliverable or phase. Nouns at every level. Keep IDs stable.

```
1  {{Project}}
1.1  Project management
   1.1.1  Governance and reporting pack
   1.1.2  Risk and issue management
   1.1.3  Change control administration
1.2  {{Deliverable / sub-product A}}
   1.2.1  …
   1.2.2  …
1.3  {{Deliverable / sub-product B}}
   1.3.1  …
1.4  Quality and testing
   1.4.1  Test approach and cases
   1.4.2  Test execution and defect resolution
   1.4.3  Acceptance evidence pack
1.5  Data
   1.5.1  Migration mapping
   1.5.2  Migration execution and reconciliation
1.6  Transition and adoption
   1.6.1  Training materials and delivery
   1.6.2  Operational hand-over pack
   1.6.3  Hypercare
1.7  Closure
   1.7.1  Closure report and lessons
   1.7.2  Decommissioning of superseded assets
```

**100% rule check.** For each parent, state in one line why its children are complete and
non-overlapping.

**Stopping rule.** e.g. *decompose until a package has one owner, ≤ 2 weeks duration,
≤ 80 hours effort, and a testable output.*

## 3. WBS dictionary

Repeat per work package.

### 1.2.1 — {{work package name}}

| | |
|---|---|
| **Deliverable produced** | |
| **Work included** | |
| **Work explicitly excluded** | |
| **Owner** | |
| **Acceptance criteria** | testable, pass/fail |
| **Estimate** | effort / duration, and its basis (analogy, parametric, expert, three-point) |
| **Predecessors / dependencies** | |
| **Assumptions** | |
| **Requirements satisfied** | R-… |

## 4. Requirements traceability

| Req ID | Requirement | Source | Priority (MoSCoW) | WBS element | Acceptance criterion | Verified by |
|---|---|---|---|---|---|---|
| R1 | | | Must | 1.2.1 | | Test / inspection / demo |

**Orphan check:** requirements with no WBS element ⟶ ; WBS elements with no requirement ⟶ .

## 5. Prioritisation (where scope may flex)

| Priority | Definition here | Share of effort |
|---|---|---|
| Must have | Without it, the project fails its objective | target ≤ 60% |
| Should have | Painful to omit, workaround exists | |
| Could have | Desirable, first to drop | |
| Won't have (this time) | Explicitly deferred — record where to | |

For adaptive streams, replace with backlog order and the ordering method (WSJF, value/effort),
and state the Definition of Done that every item must meet.

## 6. Adaptive stream addendum (if applicable)

- **Product/feature breakdown:** epics → features → stories, with the same no-gap discipline.
- **Definition of Ready:** what an item needs before it can be pulled.
- **Definition of Done:** the quality bar every increment meets.
- **Backlog size and horizon:** how far ahead items are refined.

## 7. Baseline record

| Version | Date | Change | Approved by |
|---|---|---|---|
| 1.0 | | Initial baseline | |

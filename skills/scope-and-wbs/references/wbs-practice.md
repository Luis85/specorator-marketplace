# WBS practice — rules, structures, and the packages everyone forgets

## The rules that matter

1. **The 100% rule.** The WBS captures 100% of the work defined by the project scope,
   including all internal, external, and interim deliverables — and project management
   itself. At every level, the children sum to exactly the parent: no gaps, no extras.
2. **No overlap.** Two elements must never cover the same work. Overlap causes duplicated
   effort, argument over ownership, and unusable cost data.
3. **Deliverable-oriented.** Elements are nouns — outcomes or outputs. If an element reads
   as a verb ("manage stakeholders", "develop the API"), you are building an activity list.
   Activities belong under a work package, in the schedule.
4. **One owner per work package.** Decompose until each package has a single accountable
   individual or organisation.
5. **Estimable and verifiable.** Stop when a package can be estimated with acceptable
   confidence and its completion can be objectively verified.
6. **The dictionary carries the definition.** Ambiguous names are fine if the dictionary
   entry says exactly what is in and out.
7. **Stable IDs.** Numbers become the spine of schedule, cost, change control, and reporting.
   Add new IDs; do not renumber.

## Choosing the decomposition axis

| Axis | Use when | Risk |
|---|---|---|
| **Deliverable / product** | Default. Scope is defined by what gets produced | None significant |
| **Phase or stage** | Governance is stage-gated; phases repeat similar work | Same deliverable split across phases, hard to total |
| **Sub-system / component** | Engineering work with clear architectural boundaries | Cross-cutting work (integration, testing) gets orphaned |
| **Geography / site** | Rollouts to many locations | Central work duplicated per site |
| **Organisational unit** | Almost never — it hides gaps between teams | Work nobody owns falls between units |
| **Calendar** | Never | Scope becomes time, and the 100% rule is untestable |

Mixed axes are acceptable if the level is consistent: e.g. level 2 by phase, level 3 by
deliverable. Do not mix axes at the same level.

## Work packages projects habitually omit

Check every one of these against your WBS. Each is a common source of overrun.

- Project management, governance, and reporting effort
- Requirements elaboration and stakeholder workshops
- Architecture and design review cycles
- Environment setup: dev, test, staging, and their access
- Test data creation, anonymisation, and refresh
- Testing beyond functional: performance, security, accessibility, UAT
- Defect resolution capacity (as scope, not slack)
- Data migration: mapping, cleansing, dry runs, reconciliation, fallback
- Interfaces and integration with third parties, including their delivery slots
- Non-functional evidence: security review, DPIA, penetration test remediation
- Documentation: user, operational, and support runbooks
- Training design and delivery; train-the-trainer
- Business-change work: process redesign, comms, adoption support
- Operational readiness and service acceptance
- Cutover: rehearsal, execution, hypercare window
- Licences, procurement lead time, and vendor onboarding
- Decommissioning the thing being replaced
- Closure: lessons, archive, financial close, benefits measurement setup

## Product-based planning (PRINCE2 variant)

Where the culture is product-based, the equivalent chain is:

1. **Project product description** — what the whole project delivers, with its quality
   expectations and acceptance criteria.
2. **Product breakdown structure** — the products, decomposed. Same 100% and no-overlap rules.
3. **Product descriptions** — per product: purpose, composition, derivation, format,
   quality criteria, quality method, quality tolerance, and who approves.
4. **Product flow diagram** — the order in which products must be created.

This maps cleanly onto WBS + WBS dictionary; the discipline it adds is quality criteria and
tolerance *per product*, which is worth importing even in a PMBOK-shaped project.

## Adaptive equivalent

| Predictive | Adaptive |
|---|---|
| Scope baseline | Product backlog with an ordered top and a refined near-horizon |
| WBS element | Epic → feature → story |
| WBS dictionary entry | Story with acceptance criteria |
| Acceptance criteria | Acceptance criteria + Definition of Done |
| Change control | Reordering the backlog |
| 100% rule | Story mapping to expose gaps in the user journey |

The 100% rule still applies to the *known* scope of the next increment; it cannot apply to a
backlog that is meant to emerge. What must not emerge unnoticed is the omitted work in the
list above — those belong in the Definition of Done or as explicit backlog items.

## Estimating from the WBS

- Estimate at work-package level; roll up. Never estimate at level 1 and divide down.
- Record the **basis** with the number: analogous, parametric, expert judgement, or three-point.
- Three-point: `expected = (optimistic + 4 × most likely + pessimistic) / 6` (PERT/beta), with
  `σ = (pessimistic − optimistic) / 6`.
- Keep contingency out of individual packages; hold it centrally against identified risk.
- Where prior projects exist, sanity-check the roll-up against their actual outturn before
  presenting it (reference class, not intuition).

## Traceability both ways

| Direction | What it catches |
|---|---|
| Requirement → WBS element | Requirements nobody is building |
| WBS element → requirement | Work nobody asked for (gold plating) |
| WBS element → acceptance criterion | Work that cannot be verified |
| Acceptance criterion → verification method | Criteria nobody can test |
| Deliverable → benefit | Output with no line to a business benefit |

The last row is the one most often missing and the most valuable at a gate review.

---
name: scope-and-wbs
description: Use when project scope needs defining, decomposing, or defending — writing a scope statement, work breakdown structure (WBS) and WBS dictionary, product breakdown, deliverable list, requirements list with acceptance criteria, or a prioritised backlog, and when reviewing scope for gaps, overlaps, or creep. Produces a scope baseline whose parts add up to exactly the work in scope and no more.
author: Specorator
license: MIT
tags: ["project-management", "scope", "wbs", "requirements", "baseline", "artifact"]
version: 1
---

# scope-and-wbs

Scope work has one test: does the decomposition account for **all** the work and **only** the
work? Everything else — schedule, cost, resourcing, acceptance — is built on this, so gaps
here become overruns later.

Produce the scope baseline: the scope statement, the WBS, and the WBS dictionary. For
adaptive streams, the equivalent is a product/feature breakdown plus a prioritised,
estimated backlog with a Definition of Done — same discipline, different artifact.

## Inputs to gather

- Approved objectives and success criteria (charter or brief).
- Deliverables already committed, and to whom.
- Requirements, however rough, and their source.
- Exclusions already agreed, plus the boundary with adjacent projects and BAU.
- Acceptance authorities per deliverable.
- Constraints that shape decomposition: contractual milestones, procurement lots,
  team boundaries, regulatory evidence, phased go-lives.
- The delivery approach per stream — it determines whether you decompose to work packages
  or to backlog items.

## Produce

1. **Write the scope statement**: product scope (what the thing is) and project scope (the
   work to produce it), plus exclusions, constraints, assumptions, and acceptance approach.
2. **Decompose to deliverables, then to work packages.** Use nouns throughout. Group by
   deliverable, phase, or sub-product — never by organisational unit alone, and never by
   calendar. Two to four levels covers most projects.
3. **Apply the 100% rule at every level.** Children sum to exactly the parent: no gaps, no
   extras, no overlaps. Include project management, testing, training, data migration,
   documentation, transition, and decommissioning as scope — they are the lines most often
   left out and most often blamed later.
4. **Stop decomposing** when a work package can be estimated, scheduled, assigned to one
   owner, and verified. State your stopping rule (e.g. "no work package longer than two
   weeks or larger than 80 hours").
5. **Write the WBS dictionary** — for each work package: ID, name, description of work
   included and explicitly excluded, deliverable produced, owner, acceptance criteria,
   estimate basis, dependencies, and assumptions.
6. **Number the WBS hierarchically** (1, 1.1, 1.1.1) and keep the IDs stable — they become
   the spine for schedule, cost, and change control.
7. **Trace requirements to WBS elements** so every requirement has a home and every element
   has a reason to exist. Note orphans in both directions; they are the real findings.
8. **Prioritise** where scope may need to flex: MoSCoW for a fixed-date project, WSJF or
   value/effort for backlog ordering. Must-haves should not exceed roughly 60% of effort.
9. **Baseline it** — version, date, approver — and record it as the reference that change
   control protects.

Fill `references/template.md`. Techniques and worked structures: `references/wbs-practice.md`.

## Review mode

Use `references/review-checklist.md`. Test the 100% rule branch by branch, hunt for
activity-shaped elements ("develop", "manage") masquerading as deliverables, and check the
habitually missing work packages listed in the practice reference. Then check the boundary:
every interface with another project or BAU should appear either as scope or as an exclusion.

## Quality bar

- Every level satisfies the 100% rule; no element overlaps another.
- Every work package has one owner, an acceptance criterion, and an estimate basis.
- Elements are deliverables (nouns), not activities, at every level above the work package.
- Project management, quality, transition, training, and closure work are visibly in scope.
- Requirements trace both ways with no unexplained orphans.
- Exclusions are as specific as inclusions.
- Baselined with a version and an approver.

## Grounding

PMI's *Practice Standard for Work Breakdown Structures* — the 100% rule at every level of
decomposition, no scope outside the WBS, no overlap between elements, decomposition to a
single accountable owner, and the WBS dictionary as the narrative definition of each work
package; PMBOK® Guide 7/8 scope performance domain, scope baseline (scope statement + WBS +
WBS dictionary), and requirements traceability; PRINCE2® 7 product-based planning
(project product description, product breakdown structure, product descriptions with quality
criteria and tolerances); the 2020 Scrum Guide (Product Backlog, refinement, Definition of
Done as the Increment's commitment); MoSCoW prioritisation and SAFe's WSJF for ordering.

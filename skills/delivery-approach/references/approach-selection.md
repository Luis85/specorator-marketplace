# Choosing an approach — drivers, methods, and what each implies

## The four base lifecycles

| Lifecycle | Requirements | Delivery | Change during build | Typical fit |
|---|---|---|---|---|
| **Predictive** | Defined up front | Once, at the end | Formal change control | Regulated, physical, contractually fixed, high cost-of-change |
| **Iterative** | Defined, refined by feedback | Once, after iterations prove the solution | Expected on *how*, not *what* | Design-heavy, usability, novel solution to a known problem |
| **Incremental** | Defined, delivered in slices | Repeatedly, each slice usable | Between increments | Roll-outs, migrations, endpoint-by-endpoint integration |
| **Adaptive** | Emergent, ordered backlog | Every iteration, usable | Continuous, by design | Unclear or shifting requirements, engaged customer, low cost-of-change |

**Hybrid** is not a fifth lifecycle — it is a deliberate composition of the four across
work streams or across time (e.g. a predictive discovery stage, adaptive build, predictive
cutover). Say which parts are which; "we're hybrid" alone is not an approach.

## Suitability drivers

Score each work stream. Two or more markers on a row pull the whole stream toward that column.

| Driver | Pulls predictive | Pulls adaptive |
|---|---|---|
| Requirements clarity | Known, signed, stable | Emergent, contested, discovery needed |
| Cost of change late | High (steel, silicon, contracts, licences) | Low (software, content, config) |
| Deliverability in slices | All-or-nothing value | Usable value in weeks |
| Customer/product decision-maker | Available at gates | Available continuously |
| Team | Large, distributed, contracted, junior | Small, co-located or well-connected, experienced, cross-functional |
| Criticality / assurance | Safety, regulatory, audit evidence | Reversible, low blast radius |
| Technology | Proven, constrained | Novel, experimental |
| Funding | Fixed scope + fixed price | Capacity- or outcome-funded |

Derived from the Boehm–Turner risk-based model (personnel, dynamism, culture, size,
criticality) as adapted in PMI's *Agile Practice Guide* suitability filters.

## What each method contributes

| Method | Take from it | Costs / preconditions |
|---|---|---|
| **PMBOK® Guide 8** | Performance domains (governance, scope, schedule, finance, stakeholders, resources, risk) as a coverage checklist; the five focus areas as a lifecycle spine; tailoring as a first-class principle | Non-prescriptive — you still design the process |
| **PMBOK® Guide 7** | Principles for behaviour; the artifact taxonomy (strategy, logs and registers, plans, hierarchy charts, baselines, visual data, reports, agreements) | Gives no process; teams wanting steps find it thin |
| **PRINCE2® 7** | Product-based planning, defined roles (board / PM / team manager), manage by stages, manage by exception with tolerances, continued business justification | Document set needs active tailoring or it becomes bureaucracy |
| **PM² (European Commission)** | Ready-made artifact set and the RfP / RfE / RfC phase gates; strong fit for public-sector and EU-funded work | Assumes its own role model and templates |
| **ISO 21502:2020** | Neutral practice vocabulary for governance, benefits, and integrated planning — useful when two organisations run different methods | Guidance only, no templates |
| **Scrum (2020 Guide)** | Sprint cadence, three accountabilities, Product/Sprint Backlog and Increment with Product Goal, Sprint Goal, Definition of Done | Needs an empowered Product Owner and a genuinely cross-functional team |
| **Kanban** | Visualised flow, WIP limits, cycle time / throughput / flow efficiency; best for continuous or unpredictable-arrival work | No built-in planning horizon or commitment mechanism |
| **SAFe** | PI planning for multi-team alignment, WSJF prioritisation, Lean Portfolio Management with portfolio WIP limits | Heavy; only justified above roughly 50 people or several interdependent teams |
| **Disciplined Agile** | Explicit lifecycle choice (agile, lean, continuous delivery, exploratory, programme) and process-goal-driven tailoring | Toolkit, not a recipe — demands decisions |
| **Stage-Gate** | Go / kill / hold / redirect decisions with pre-agreed gate criteria; separates doing the work from funding it | Gates become theatre without real kill authority |

## Anti-patterns to name explicitly

- **Agile in name only** — fixed scope, fixed date, fixed budget, plus sprints. Say which
  of the three will move, or stop calling it adaptive.
- **Predictive by default** — a full baseline for work whose requirements provably cannot
  be known yet, producing a change-request treadmill.
- **Ceremony import** — every event from a framework, none of its preconditions.
- **Gate theatre** — gates that cannot say no, so evidence is never really tested.
- **Approach chosen by tooling** — the lifecycle bent to fit a tracker's workflow.
- **Unbounded hybrid** — no defined interface between differently-run streams, so
  dependencies surface only when they break.

## Reporting implications

| Approach | Progress measured by | Report artifacts |
|---|---|---|
| Predictive | Milestones, % complete against baseline, earned value (SPI / CPI, EAC) | Status report, variance report, forecast |
| Incremental | Slices released vs planned, acceptance pass rate | Release/milestone report |
| Iterative | Options tested, decisions closed, requirements stabilised | Decision log, prototype review |
| Adaptive | Increments accepted, velocity or throughput, cycle time, WIP | Burn-down/up, cumulative flow, sprint review outcome |
| Hybrid | Both, reconciled at the gate — never two competing truths | One status report with per-stream sections |

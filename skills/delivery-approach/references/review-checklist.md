# Review checklist — delivery approach

Mark each ✅ pass / ⚠️ weak / ❌ blocking. Anything ❌ means the approach is not yet
usable as the basis for planning.

## Fit

- [ ] Work is segmented into streams before an approach is assigned to any of them.
- [ ] Each stream's approach traces to a named driver (requirements stability, cost of
      change, deliverability in slices, customer availability, criticality, team, funding).
- [ ] No stream is labelled adaptive while its scope, date, and budget are all fixed.
- [ ] No stream is labelled predictive while its requirements are admittedly unknown.
- [ ] The overall label (including "hybrid") matches what the table actually says.

## Lifecycle and interfaces

- [ ] Phases/stages are named with an explicit end condition each.
- [ ] Differently-run streams have a described interface: integration cadence, what the
      adaptive stream commits to at a gate, how cross-stream dependencies surface.
- [ ] Planning horizon and the replanning trigger are stated.
- [ ] Long streams are broken at points where stopping is genuinely possible.

## Governance

- [ ] Each gate names a decision, a decider, required evidence, and the possible outcomes
      including *stop*.
- [ ] At least one gate can realistically kill or redirect the project.
- [ ] Tolerances are quantified per dimension (cost, time, scope, quality, risk, benefit)
      with a named escalation route.
- [ ] Reporting cadence matches the gate cadence — no gate arriving with data nobody has seen.
- [ ] Existing organisational governance is either used or explicitly reconciled with.

## Tailoring

- [ ] Every retained method element has a purpose; every dropped one has a rationale and a
      named risk accepted.
- [ ] Ceremonies retained have their preconditions in place (e.g. an empowered product
      decision-maker for Scrum, a WIP limit that is actually enforced for Kanban).
- [ ] Framework weight is proportionate to size and stakes (SAFe for two teams is a finding).
- [ ] Artifact list has an owner and an update frequency per artifact.
- [ ] "Not producing" list exists and is honest.

## Measurement

- [ ] Progress measures match each stream's approach (earned value for predictive, flow or
      accepted increments for adaptive).
- [ ] There is exactly one reconciled version of overall status, not two competing ones.
- [ ] Measures named are ones the project can actually collect from day one.

## Clarity

- [ ] Three pages or fewer.
- [ ] Readable by a sponsor who does not know the method vocabulary.
- [ ] Assumptions and open questions carry an owner and a needed-by date.

## Common findings, phrased usefully

| Finding | Say it like this |
|---|---|
| Label without substance | "§2 calls stream 3 adaptive, but §4 fixes its scope and date at G1. Either move scope to a tolerance or relabel it incremental." |
| No kill authority | "Every gate outcome is go or hold. Add stop criteria at G1, or state that funding is committed and the gate is informational." |
| Missing interface | "The adaptive build and predictive cutover share no integration point until week 30. Add a monthly integration checkpoint with a defined hand-over state." |
| Untailored ceremony | "PI planning is retained for two teams of four. Drop it and use the existing sprint review, or state the dependency it exists to resolve." |
| Unowned tolerance | "Cost tolerance is ±10% with no escalation route. Name who is told, and within how long." |

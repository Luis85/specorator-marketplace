---
name: stakeholder-plan
description: Use when working out who matters on a project and how to keep them engaged — building a stakeholder register or map, a power/interest or salience analysis, an engagement plan, a RACI or decision-rights matrix, or a communications plan; and when reviewing engagement for missing stakeholders, unowned relationships, or reporting nobody reads. Produces a stakeholder analysis and a communications plan with named owners, cadence, and messages per audience.
author: Specorator
license: MIT
tags: ["project-management", "stakeholders", "communications", "raci", "engagement", "artifact"]
version: 1
---

# stakeholder-plan

Projects fail on relationships more often than on technique. This artifact answers four
questions: who is affected or can affect us, how much influence and interest each has, what
each needs from us and when, and who owns each relationship.

Two products, usually one document: the **stakeholder register and analysis**, and the
**communications plan** derived from it. Add a **RACI** where decision rights are contested.

## Inputs to gather

- Objectives and scope — stakeholders are defined relative to what is changing.
- The governance already agreed (sponsor, board, assurance) from the charter.
- Groups affected operationally, not just those in the reporting line: users, support teams,
  data owners, security, legal, procurement, finance, works councils or unions, regulators,
  suppliers, customers, adjacent projects.
- Who can say no — approval authorities, gatekeepers, veto holders.
- Existing communication channels and rhythms you can use instead of inventing new ones.
- Known history: previous attempts, past grievances, current pressures on each group.
- Language, accessibility, and confidentiality constraints.

## Produce

1. **Identify broadly before filtering.** Walk the lifecycle (initiation → build → cutover →
   operate → decommission) and the value chain, listing who touches or is touched at each
   point. The stakeholder most often missed is the one who inherits the result: operations,
   support, and the team whose process changes.
2. **Register each stakeholder** — name, role, organisation, what they care about, what they
   need from the project, what the project needs from them, and their current position
   (supportive / neutral / resistant / unaware).
3. **Analyse.** Power/interest grid for the standard case; add legitimacy and urgency
   (salience) where the politics are contested; note attitude and influence networks — who
   listens to whom. See `references/stakeholder-analysis.md`.
4. **Set a target position per stakeholder** and the gap from current. This turns analysis
   into work: an engagement plan is the set of actions that closes those gaps.
5. **Assign a relationship owner** per stakeholder — usually the PM for delivery contacts and
   the sponsor for peers and seniors. Nobody important should be unowned.
6. **Define decision rights** with a RACI (or RASCI/DACI) over the decisions that will
   actually be contested — not over every task. One accountable per decision, always.
7. **Build the communications plan** from the analysis: per audience, the message, the
   purpose (inform / consult / involve / collaborate), the channel, the sender, the frequency,
   and the feedback route. Reuse existing forums where they exist.
8. **Plan for resistance explicitly.** For each resistant or high-power/low-support
   stakeholder: the concern in their words, what would address it, who will have that
   conversation, and by when.
9. **Set the review rhythm.** Positions change; the register is reviewed at least at each
   stage boundary and whenever the change lands somewhere new.

Fill `references/template.md`.

## Review mode

Use `references/review-checklist.md`. Look for: operations and support missing entirely,
"all staff" as an audience, communications that are all one-way broadcast, no feedback route,
no owner per relationship, a RACI with several accountable parties per decision, and no plan
for the one person who can veto the project.

## Quality bar

- Register covers those affected operationally, not just those in the governance chain.
- Every stakeholder has a relationship owner, a current position, and a target position.
- Analysis drives specific engagement actions with owners and dates.
- Communications entries name a sender, a channel, a cadence, and a feedback route.
- Audiences are specific enough to write for; "all staff" is not an audience.
- RACI covers contested decisions with exactly one accountable each.
- Confidentiality is respected: nothing recorded about an individual that you would not
  defend saying to them.

## Grounding

PMBOK® Guide 7 Stakeholders performance domain and PMBOK® Guide 8's Stakeholders domain with
expanded stakeholder complexity; the stakeholder register and stakeholder-engagement
assessment matrix (current vs desired engagement: unaware, resistant, neutral, supportive,
leading); Mendelow's power/interest grid (manage closely, keep satisfied, keep informed,
monitor) and Mitchell–Agle–Wood salience (power, legitimacy, urgency); PRINCE2® 7 Organizing
practice and communication management approach, with its business/user/supplier interests;
the European Commission's PM² Project Stakeholder Matrix and Communications Management Plan;
ISO 21502:2020 stakeholder engagement practice; RACI/RASCI and DACI decision-rights practice;
IAP2's spectrum of participation (inform, consult, involve, collaborate, empower) for choosing
engagement depth.

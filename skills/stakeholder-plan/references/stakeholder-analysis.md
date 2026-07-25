# Stakeholder analysis — models, engagement depth, and communication design

## Identification, before analysis

Analysis of the wrong list is worthless. Two sweeps catch most omissions:

1. **Lifecycle sweep** — who is involved or affected at initiation, design, build, testing,
   training, cutover, early live running, steady-state operation, and decommissioning.
2. **Consequence sweep** — whose work changes, whose numbers change, whose budget changes,
   whose risk changes, whose job security is perceived to change.

Chronically missed: operations and support (who inherit the thing), the service desk (who take
the calls), data owners, security and privacy reviewers, procurement, the trainers, the team
whose process is being replaced, adjacent projects with a shared dependency, and the regulator
or auditor who will ask later.

## Power / interest (Mendelow)

| Quadrant | Strategy | What it means in practice |
|---|---|---|
| High power, high interest | **Manage closely** | Named owner, regular 1:1s, involved in decisions, no surprises |
| High power, low interest | **Keep satisfied** | Short, targeted updates; escalate only what needs them; do not overload |
| Low power, high interest | **Keep informed** | Regular detail, use them as advocates and testers |
| Low power, low interest | **Monitor** | Minimal effort; re-check when scope moves toward them |

Two refinements worth adding: **attitude** (supportive/resistant, which the grid ignores) and
**movement** (positions shift as the change gets closer to someone — the grid is a snapshot,
so re-plot at stage boundaries).

## Engagement assessment matrix

Score current (C) and desired (D) engagement per stakeholder:

| Stakeholder | Unaware | Resistant | Neutral | Supportive | Leading |
|---|---|---|---|---|---|
| Ops manager | | C | | D | |

Every C≠D pair is an action for someone, with a date. This is the single most useful conversion
of analysis into work — without it a stakeholder plan is a description, not a plan.

## Salience (Mitchell, Agle & Wood) — when politics decide outcomes

Three attributes: **power** (can they affect you), **legitimacy** (is their claim proper),
**urgency** (does it demand immediate attention). Classes:

| Attributes | Class | Handling |
|---|---|---|
| All three | Definitive | Highest priority; act now |
| Power + legitimacy | Dominant | Formal governance role |
| Power + urgency | Dangerous | Manage actively; coercive potential without legitimate claim |
| Legitimacy + urgency | Dependent | Needs an advocate with power — often the users |
| Power only | Dormant | Monitor for activation |
| Legitimacy only | Discretionary | Engage on merit |
| Urgency only | Demanding | Acknowledge; do not let volume set priority |

The useful insight for a PM: **dependent** stakeholders (legitimate, urgent, powerless) are
usually the users, and their claim only lands if the sponsor lends them power. Arranging that is
a real engagement action.

## Choosing engagement depth (IAP2 spectrum)

| Level | Promise to the stakeholder | Use when | Cost |
|---|---|---|---|
| Inform | We will keep you informed | Low impact on them, decision already made | Low |
| Consult | We will listen and tell you how it shaped the outcome | Their input improves the decision | Medium |
| Involve | We will work with you throughout | They must live with the result | Medium-high |
| Collaborate | We will decide together | Joint accountability, shared resources | High |
| Empower | You decide | Their domain, our support | Varies |

Two failure modes: promising *consult* and delivering *inform* (destroys trust faster than
never asking), and *collaborating* with everyone (nothing gets decided). Choose the level
deliberately per stakeholder and honour it.

## RACI and its variants

| Model | Roles | Use when |
|---|---|---|
| **RACI** | Responsible, Accountable, Consulted, Informed | Default for decisions and deliverables |
| **RASCI** | + Support | Where helpers need naming distinctly from doers |
| **DACI** | Driver, Approver, Contributor, Informed | Decision-heavy work; clearer on who moves it |
| **RAPID** | Recommend, Agree, Perform, Input, Decide | Contested cross-functional decisions |

Discipline that makes them work:

- Exactly one Accountable per row. Two means nobody.
- Apply to *decisions and deliverables*, not tasks — task-level RACIs go stale in a fortnight.
- Consulted is an obligation with a deadline, or it becomes a veto arriving late.
- Fewer than eight rows for most projects. Cover what will be argued about.
- Validate with the named people; an unagreed RACI is a wish list.

## Designing communications that get read

| Principle | In practice |
|---|---|
| Audience-specific | "All staff" is not an audience. Split by what changes for them |
| One message per item | If an update has three asks, it will produce none |
| Sender matters more than content | Change news from a line manager beats the same words from a project mailbox |
| Use existing forums | Team meetings and existing newsletters beat a new channel nobody has subscribed to |
| Two-way by default | Every audience gets a named route back, not a no-reply address |
| Say what you don't know | "The training date is not fixed; you will know by the 14th" preserves credibility |
| Cadence rises near impact | Monthly at distance, weekly at T−4, daily at cutover |
| Accessibility | Plain language, translation where needed, formats that work for shift and field staff |

## Anti-patterns

- **Broadcast-only plan** — every row is a newsletter; no consultation, no feedback route.
- **Unowned VIP** — the person who can veto has no relationship owner and no scheduled contact.
- **Register as compliance artifact** — produced for a gate, never updated, positions
  unrecorded.
- **Sponsor as mailing list** — the sponsor is copied on reports but never asked to use their
  influence on a specific blocker.
- **Silence during quiet phases** — long build periods with no communication, so the eventual
  arrival of change feels sudden.
- **Assessment nobody could defend** — subjective notes about individuals recorded in a shared
  document. Write only what you would say to their face.

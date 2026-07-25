# Running lessons sessions and making benefits stick

## Why most lessons-learned exercises produce nothing

Four causes, all fixable:

1. **Held once, at the end**, when memory has faded and the team has dispersed.
2. **Observations, not lessons.** "Communication could have been better" changes nothing.
3. **No owner outside the project.** The team that learned the lesson disbands; nothing in the
   organisation changes.
4. **Blame risk.** People will not name the real cause if it implicates someone in the room.

Fix: capture continuously in a lessons log, run the session on causes rather than events, require
each lesson to name a *thing that will change*, and give it an owner who controls that thing.

## Facilitating the session

**Before.** Circulate the timeline (milestones, changes, incidents, key decisions) and the data
(cost and schedule outturn, defect counts, change volume, throughput). Discussing from data
rather than memory changes the quality of the conversation immediately.

**Ground rules.** Blameless: look for the conditions that made an outcome likely, not the person
who was standing nearest. Anyone may raise anything. What worked gets equal time.

**Structure** (choose one, run it consistently):

| Format | Prompts | Best for |
|---|---|---|
| Start / stop / continue | What should we begin, end, keep? | Quick, action-oriented |
| Timeline + emotion | Walk the timeline, mark high and low points, ask why at each | Long projects; surfaces what people actually felt |
| Four Ls | Liked, learned, lacked, longed for | Mixed teams, safe entry |
| Five whys per theme | Drill from symptom to condition | A small number of significant failures |
| Sailboat | Wind (helped), anchors (held us back), rocks (risks), island (goal) | Teams tired of retrospectives |
| Pre-mortem in reverse | "If we did this again, where would it go wrong?" | Extracting transferable lessons |

**Depth.** For each significant theme, ask why until you reach something the organisation
controls: a standard, a template, an estimating rate, a contract clause, a governance threshold,
a training gap, a staffing model. That is where the lesson attaches.

**After.** Publish within a week, while people can still correct it. Send each lesson to its
owner personally; a lessons report filed in a shared drive changes nothing.

## Writing a lesson that transfers

| Field | Bad | Good |
|---|---|---|
| Context | "This project" | "Integration projects with an external SaaS vendor" |
| What happened | "Testing was late" | "Vendor sandbox access arrived 5 weeks after the planned date because the request needed their security review, which we learned about in week 3" |
| Effect | "Caused delay" | "5-week delay to M3, €38k of standby cost, UAT compressed from 4 weeks to 2" |
| Root cause | "Poor planning" | "Our planning template has no lead-time item for third-party environment access" |
| Recommendation | "Plan better" | "Add 'third-party environment access — request 8 weeks ahead' to the planning checklist and the WBS template" |
| Owner | "Project team" | "PMO lead — template owner" |

The test: could a project manager who has never met you apply this next quarter?

## Reference-class data is the most valuable output

Record, at closure, for feeding forward:

| Metric | Planned at approval | Actual | Ratio |
|---|---|---|---|
| Duration | | | |
| Cost | | | |
| Effort | | | |
| Change volume as % of baseline | | | |
| Benefit realised at review | | | |

Over a handful of projects this becomes the organisation's own reference class — the single most
effective correction to optimism bias in future business cases and schedules, and far more
persuasive than an argument about whether an estimate is realistic.

## Benefits realisation after the project ends

Benefits usually land after closure — which is exactly why they get lost. Four things must exist
before the team disbands:

1. **A named owner in the receiving business** for each benefit, who has accepted it in writing.
2. **A measurement mechanism** — the measure, its data source, who collects it, and where it is
   reported. If nobody's existing report contains the measure, it will not be measured.
3. **A scheduled review date**, in someone's calendar and in a governance forum's agenda, not
   just in a document.
4. **Named remaining actions** — the business changes still needed for the benefit to appear
   (process change, training, decommissioning the old route), each with an owner.

Choose the review timing from the benefit profile: 3 months for operational efficiency that
should appear immediately; 6–12 months for adoption-dependent or seasonal benefits; longer, with
an interim check, for benefits contingent on volume growth.

## Running the post-implementation review

Attendees: the benefit owners, the sponsor, operations, and someone from the appraisal or PMO
function who will carry the learning forward. The project manager attends as a witness, not as
the accused.

Agenda:

1. Benefit-by-benefit: target, actual, variance, and **why**.
2. What is still recoverable, and who will act.
3. What was never going to happen, and what that says about how it was appraised.
4. Whether the investment was worth it, against the original NPV or ROI claim.
5. Feed the outturn back into the estimating and appraisal reference data.

Say the unwelcome result plainly. A review that finds 40% of forecast benefit is the most useful
document the organisation will read that quarter — provided it explains *why*, and provided the
appraisal process learns from it rather than the project manager absorbing the blame.

## Premature closure

When a project is stopped early, the report still matters and its content shifts:

- Why it was stopped, and by whose decision.
- What was delivered that retains value, and who takes it.
- What must be unwound: contracts, licences, partially migrated data, communications already made.
- Sunk cost, recoverable cost, and cancellation cost.
- What the organisation should learn — usually about appraisal or early gate discipline, which is
  the most valuable lesson category there is.

Stopping a project that no longer has a business case is a success of governance, and the report
should say so rather than reading like a failure notice.

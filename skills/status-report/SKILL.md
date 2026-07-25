---
name: status-report
description: Use when reporting or reviewing project progress — writing a status or highlight report, stage or end-stage report, checkpoint report, exception report, dashboard, or executive update; setting RAG criteria; computing earned value or flow metrics; or forecasting completion. Produces a short, honest report that states position against baseline, forecast, exceptions, decisions needed, and the top risks — with numbers a reader can check.
author: Specorator
license: MIT
tags: ["project-management", "status-report", "reporting", "earned-value", "forecast", "artifact"]
version: 1
---

# status-report

A status report exists so the reader can act: approve something, unblock something, or accept
a forecast. It is not a diary of activity. One page for a board, with detail in annexes.

Two rules dominate everything else. **Report against a baseline** — progress without a
reference point is anecdote. And **bad news travels fast and unhedged** — a report that softens
a slipping date destroys the value of every future report.

## Inputs to gather

- The baselines: scope, schedule, cost — and the version being reported against.
- Actuals: spend to date, committed costs, effort consumed, milestones achieved with dates.
- Progress evidence per work package or increment — completed and accepted, not "nearly done".
- Tolerances from the charter, so exceptions can be identified rather than judged.
- Open risks and issues from the RAID log, with movement since last period.
- Change requests in flight and their status.
- Decisions needed from the reader, with the consequence of delay.
- For adaptive streams: throughput or velocity, WIP, cycle time, accepted increments, and
  scope added.

## Produce

1. **Lead with the answer.** Overall RAG, the forecast completion date and cost, and the single
   most important thing the reader must know. Three sentences.
2. **State position against baseline** — milestones achieved this period, milestones due and
   missed, percentage complete by an objective measure (not opinion), spend vs plan.
3. **Compute the metrics that apply.** Predictive streams: earned value — SV, CV, SPI, CPI, EAC,
   VAC, TCPI — with the EAC method named. Adaptive streams: throughput, cycle time percentile,
   WIP, and a forecast range. Hybrid: both, reconciled into one overall position. Formulas and
   interpretation in `references/metrics.md`.
4. **Forecast honestly.** Give the expected completion and cost with a confidence statement,
   and say what changed since the last forecast and why. A forecast that never moves is not a
   forecast.
5. **Apply RAG against stated criteria**, not mood. Define the criteria once and hold them:
   green = within tolerance, amber = forecast to breach without intervention, red = breached or
   will breach. Publish the criteria in the report so nobody can relabel a red as amber.
6. **List exceptions**: any tolerance breached or forecast to breach, each with cause, options,
   recommendation, and the decision needed. Where a tolerance is already breached, this becomes
   an exception report in its own right.
7. **Show risk and issue movement** — top five, new this period, closed, and any change in
   severity. Not the whole register.
8. **State decisions and support needed**, each with an owner and a by-when, and the
   consequence of not deciding.
9. **Preview the next period** — what will be delivered, and what would derail it.
10. **Keep the annexes separate** so the one-pager stays a one-pager.

Fill `references/template.md`. For an exception report specifically, use the shorter structure
at the end of that file.

## Review mode

Use `references/review-checklist.md`. The reliable tells of a report that is hiding something:
green status with a slipping milestone, percentage complete rising while the end date is fixed,
"90% done" for three periods, no baseline named, no forecast change ever, risks with no
movement, and activity narrative instead of deliverable status. Check the arithmetic — EVM
indices are frequently wrong or inconsistent with the stated spend.

## Quality bar

- One page for the primary audience; annexes carry detail.
- Baseline version named; every number is against it.
- Percentage complete derives from an objective rule (accepted deliverables, earned value,
  or items done), stated in the report.
- Forecast includes a confidence statement and an explanation of change.
- RAG criteria are published and applied literally.
- Every exception carries options and a recommendation.
- Every decision requested has an owner, a date, and a consequence of delay.
- No number appears that the reader cannot reconcile with another.

## Grounding

PMBOK® Guide 7 Measurement performance domain — leading and lagging indicators, dashboards,
information radiators, and the caution against vanity metrics — plus its report artifacts
(status, variance, forecast, quality); earned value management per ANSI/EIA-748 with the
standard indices and EAC formulations; PRINCE2® 7 Progress practice and its report set
(checkpoint, highlight, end stage, end project, exception) with manage-by-exception against
delegated tolerances; the European Commission's PM² status and progress reports; ISO 21502:2020
on progress control and reporting; Kanban flow metrics and Little's law for adaptive streams;
the 2020 Scrum Guide's Sprint Review as the inspection point for increment-based progress.

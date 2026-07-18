---
type: specorator-loop
schema_version: 1
name: "Devil's advocate"
description: "Adversarially review a consequential design before committing to it."
icon: "swords"
tags: ["review", "design"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

Before committing to an architecture, interface, rollout plan, or other consequential design that benefits from structured adversarial review.

## Approach

Have a critic argue that the design is wrong. Record each objection, its impact, and its status in a repository-local review log; the builder fixes or explicitly accepts each one with evidence.

## Steps

1. Write the design goals and acceptance criteria, then initialize a review log inside the repository and keep it out of commits.
2. Have the critic present the strongest evidence-backed case against the current design and rank each objection by impact.
3. Have the builder repair the weakness or document an explicit acceptance rationale, then verify against the stated criteria.
4. Let the critic reopen weak answers and repeat until objections are closed with evidence or the loop reports a stalemate honestly.

## Verify

No high-impact objection remains open — each is resolved or explicitly accepted with evidence, or the report truthfully records a stalemate.

## Notes

Keep the critic independent where possible. Do not change the acceptance criteria mid-run just to close a difficult objection.

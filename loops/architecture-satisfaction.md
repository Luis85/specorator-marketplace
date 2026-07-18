---
type: specorator-loop
schema_version: 1
name: "Architecture satisfaction"
description: "Refactor toward a stated architecture, verifying and committing each checkpoint."
icon: "blocks"
tags: ["engineering", "refactor", "architecture"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

A deliberate architectural refactor where the destination can be stated in concrete terms and the current system can be tested after each meaningful change.

## Approach

Refactor until the architecture reaches its stated target, preserving observable behavior at every step. Move in small reversible increments — extract and consolidate over rewrite. After each significant step, live-test the system, run an independent review, and commit. Track progress in a scratch file.

## Steps

1. Write down the architectural target, constraints, and current risks before editing code; if coverage is thin where you will work, add characterization tests first.
2. Make one significant, reviewable, behavior-preserving change at a time — never mix a behavior change into the refactor.
3. Live-test the affected behavior and run an independent review after each significant step; existing tests should stay green and untouched.
4. Commit each verified checkpoint and update the progress file with decisions, blockers, and the next action.

## Verify

The architecture is satisfactory and checks pass; observable behavior is unchanged; each significant step was live-tested, reviewed, and committed.

## Notes

Define what "satisfactory" means before starting — module boundaries, dependency direction, passing tests, and acceptable performance. Prefer pure functions and focused modules over stateful god-objects; leave a clone alone when a shared abstraction would be harder to read than the duplication.

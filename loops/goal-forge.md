---
type: specorator-loop
schema_version: 1
name: "Goal Forge"
description: "Turn a vague idea into a spec and an execution plan before a long autonomous run."
icon: "target"
tags: ["planning", "spec"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

A rough coding idea is too vague to hand to an agent for a long autonomous run and you first need to settle scope, completion checks, safety boundaries, and required tools.

## Approach

Interview the user, then write a SPEC (what to build, exclude, and consider, with measurable done-when checks) and a GOAL (the work plan, progress scorecard, quick and final checks, evidence, and approval boundaries) before starting the long run.

## Steps

1. Ask what the finished feature should do, what is out of scope, which edge cases matter, what could go wrong, and what evidence would prove completion; write those decisions in a SPEC file.
2. Point out ambiguous requirements with concrete interpretations and have the user resolve product decisions instead of letting the agent silently choose.
3. Write a GOAL file with the ordered work, a progress scorecard, quick checks for each iteration, slower final checks, approval boundaries, and required evidence.
4. Confirm the tools, permissions, environment, and tests exist; stop as not-ready when anything essential is missing, and start the long run only after approval.

## Verify

The planning files say what to build, how to judge it, and when to stop — every done-when check names observable evidence and the environment is ready.

## Notes

Adapted from a Codex /goal workflow: the SPEC captures the product decision; the GOAL tells the agent how to execute and verify it.

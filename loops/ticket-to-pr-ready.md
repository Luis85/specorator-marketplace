---
type: specorator-loop
schema_version: 1
name: "Ticket to PR-ready"
description: "Turn a loose ticket into a proven root cause and a minimal, review-ready patch."
icon: "git-pull-request"
tags: ["engineering", "bugfix", "review"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

A real but loosely written ticket, bug report, or customer complaint needs to become a bounded engineering change with enough proof for a fast review.

## Approach

Reproduce the failure in the smallest representative environment, prove the root cause, make the smallest credible fix, then rerun the original reproduction plus relevant regression tests and package it for review.

## Steps

1. State the expected and actual behavior, then reproduce the failure in the smallest representative environment.
2. Trace the behavior to a root cause and confirm the causal link with evidence.
3. Implement the smallest credible fix, avoiding unrelated cleanup or hidden refactors.
4. Repeat the original reproduction, run relevant regression checks, and package the result for review.

## Verify

The issue reproduces before the fix, no longer reproduces afterward, and relevant regression checks pass.

## Notes

Match the proof to the failure: screenshots or recordings for UI issues, tests or logs for backend behavior.

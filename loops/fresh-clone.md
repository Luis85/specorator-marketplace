---
type: specorator-loop
schema_version: 1
name: "Fresh clone"
description: "Prove the README onboarding works in a clean environment from scratch."
icon: "package-check"
tags: ["onboarding", "documentation"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

You want to test whether a repository's onboarding instructions work in a clean environment without undocumented help.

## Approach

Clone into a disposable environment and follow only the README to the documented ready state. When a step fails or assumes missing knowledge, record the gap, fix it, discard the environment, and start again.

## Steps

1. Create a disposable environment with no project dependencies or configuration carried over from another checkout.
2. Fresh-clone the repository and follow only the README, recording every missing step, hidden assumption, and failure.
3. Fix the smallest setup or documentation gap, discard the environment completely, and begin again.
4. Repeat until one clean run reaches the documented ready state without intervention, then report the exact commands and the gaps closed.

## Verify

A clean environment reaches the documented ready state using only the README, with no unstated dependency, configuration, or manual repair.

## Notes

Use an isolated disposable environment and review the repository before running it. Never copy personal credentials into the test environment.

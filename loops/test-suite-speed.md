---
type: specorator-loop
schema_version: 1
name: "Test-suite speed"
description: "Make the test suite faster without weakening coverage or behavior."
icon: "gauge"
tags: ["testing", "performance"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

Slow tests are delaying local feedback or CI and the project has stable commands for measuring runtime and coverage.

## Approach

Optimize the test suite to run as quickly as possible without reducing coverage or changing behavior.

## Steps

1. Record the full-suite runtime, coverage, environment, worker settings, and a repeatable timing method.
2. Profile the suite to find expensive setup, redundant work, poor isolation, unnecessary integration paths, or safe parallelization.
3. Make one optimization at a time, then rerun the full suite and compare timing, coverage, and behavior.
4. Stop at the agreed runtime target or diminishing-returns rule with all original checks still passing.

## Verify

The suite is faster with no coverage or behavior regression, proven by repeatable timing and the full passing suite.

## Notes

Define a runtime target or diminishing-returns rule before starting. Faster tests are not an improvement if they become flaky.

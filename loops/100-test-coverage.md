---
type: specorator-loop
schema_version: 1
name: "100% test coverage"
description: "Drive a coverage gap to 100% with tests that assert real behavior."
icon: "shield-check"
tags: ["testing", "coverage", "quality"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

100% coverage is an explicit project requirement and the repository has a trustworthy coverage command, clear exclusions, and a repeatable test suite.

## Approach

Add tests until the suite reaches 100% coverage — asserting real outcomes and failure paths, not just executing lines.

## Steps

1. Run the complete test suite with coverage and save the baseline report.
2. Prioritize uncovered branches and behavior by risk instead of file order.
3. Add tests that assert meaningful outcomes, failure paths, and boundary conditions.
4. Repeat until the full suite passes and the configured coverage report reaches 100%.

## Verify

The full test suite passes at 100% coverage, using the project's coverage report as the source of truth.

## Notes

Coverage measures which code ran, not whether the assertions are good. Avoid tests that execute lines without asserting behavior.

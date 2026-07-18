---
type: specorator-work-order-template
schema_version: 1
name: "Test backfill"
description: "Add tests for under-covered code without changing behavior."
icon: "flask-conical"
priority: 2 - normal
tags: ["testing"]
author: "Specorator"
license: MIT
version: 1
---

# {{title}}

## Objective

Backfill tests for the area described below.

## Acceptance Criteria

- [ ] Coverage gaps listed
- [ ] Test cases written (happy + edge)
- [ ] All new tests pass
- [ ] No production code changed unless required to make code testable

## Context

{{source}}

## Constraints

- Do not change production behavior.
- Do not modify unrelated files.

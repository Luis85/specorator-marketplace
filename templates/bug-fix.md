---
type: specorator-work-order-template
schema_version: 1
name: "Bug fix"
description: "Reproduce, diagnose, and fix a defect."
icon: "bug"
priority: 1 - high
tags: ["engineering", "bugfix"]
author: "Specorator"
license: MIT
version: 1
---

# {{title}}

## Objective

Diagnose and fix the bug described below.

## Acceptance Criteria

- [ ] Repro confirmed
- [ ] Root cause identified
- [ ] Fix covered by a regression test
- [ ] No unrelated changes

## Context

{{source}}

_Captured {{date}}._

## Constraints

- Do not modify unrelated files.
- Keep direct chat behavior intact.

---
type: specorator-work-order-template
schema_version: 1
name: "Refactor"
description: "Improve structure without changing behavior."
icon: "wrench"
priority: 2 - normal
tags: ["engineering", "refactor"]
author: "Specorator"
license: MIT
version: 1
---

# {{title}}

## Objective

Refactor the area described below for clarity and reuse without changing observable behavior.

## Acceptance Criteria

- [ ] Behavior unchanged (existing tests stay green and untouched)
- [ ] Smell named and reduced (duplication, oversized unit, or unclear seam)
- [ ] Change made in small, reviewable steps — no behavior change mixed in
- [ ] Extracted code is pure or focused; names say intent, comments say why
- [ ] No new public API surface
- [ ] typecheck + lint + tests clean

## Context

{{source}}

## Constraints

- Do not change observable behavior; a behavior change belongs in its own task.
- Prefer extracting and consolidating over rewriting.
- If coverage is thin where you work, add characterization tests first.
- Do not modify unrelated files.

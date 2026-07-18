---
type: specorator-loop
schema_version: 1
name: "Propagation compliance"
description: "Keep a changed value consistent across every copy in the project."
icon: "copy-check"
tags: ["maintenance", "consistency"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

After changing something that appears in several files — a version number, feature name, count, rule, setting, or identifier — and every copy must stay consistent.

## Approach

List where the new value belongs and update it. Search the project for the old value and related forms, then fix real stale values while keeping intentional history, examples, migrations, or compatibility rules.

## Steps

1. List the files, documentation, settings, generated outputs, or operational notes expected to copy the changed value.
2. Update the known copies, then search the whole project for the old value, old spelling, and other likely leftover forms.
3. Decide whether each match is truly stale or intentionally preserved (history, example, migration, compatibility rule); fix only the stale matches.
4. Repeat the searches until no stale match remains; if one returns for two rounds, stop and identify the generator restoring it.

## Verify

No unintended copy of the old value remains — the final searches find only intentionally historical or required references, each with a recorded reason.

## Notes

The exact files depend on the change. Watch for generated outputs and operational notes that quietly restore old values.

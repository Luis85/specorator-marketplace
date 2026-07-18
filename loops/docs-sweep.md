---
type: specorator-loop
schema_version: 1
name: "Docs sweep"
description: "Find documentation drift against the code and fix it behind a reviewable PR."
icon: "book-open"
tags: ["documentation", "maintenance"]
author: "Forward-Future loop library, adapted by Specorator"
source: "https://github.com/Forward-Future/loop-library"
license: MIT
version: 1
---

## Use when

Implementation changes may have left READMEs, setup guides, API references, examples, or runbooks behind.

## Approach

Review the codebase in full and make sure all documentation reflects the current implementation. Update stale documentation, verify the changes, then open a pull request.

## Steps

1. Review implementation changes since the last documentation pass.
2. Compare the repository's documentation with the code, configuration, commands, and behavior that now ship.
3. Update only stale material, then verify commands, links, and examples against the current repository.
4. Run the relevant checks and open a pull request that explains the documentation drift and the fixes.

## Verify

Documentation matches the current implementation, finished with a reviewable pull request.

## Notes

Keep the scope tied to real implementation changes. Do not rewrite accurate documentation just to create activity.

# Skills

Reusable **skills** (`SKILL.md` capabilities an agent auto-loads when its description
trigger matches) that a Specorator user can install into their vault's skill roots
(`.claude/skills/`, `.codex/skills/`, `.cursor/skills/`, …).

## Status

This category is **scaffolded but empty**. The Specorator plugin ships no bundled
_starter_ skills today (unlike Loops, Agents, and Work-Order Templates, which have
compiled-in preset sets that seeded the other folders), so there is nothing to port in
this first pass. It is ready for curated contributions.

## Format (when adding a skill)

Each skill is a folder containing a `SKILL.md`, mirroring the Claude Code / Codex skill
layout so an installed skill is indistinguishable from a hand-authored one:

```
skills/
  <skill-name>/
    SKILL.md            # required
    reference.md        # optional supporting files the skill points at
```

`SKILL.md` frontmatter:

```yaml
---
name: skill-name              # lowercase-hyphen, MUST equal the folder name, unique
description: "Use when …"     # the dispatch trigger — third person, leads with "Use when",
                              # states the conditions AND what the skill does
# allowed-tools: Read, Grep   # optional, only when a fixed tool set is genuinely required
# --- marketplace metadata (optional, ignored by skill runtimes) ---
author: "Your name"
license: MIT
tags: ["category", "…"]
version: 1
---

Concise, imperative instructions — the reusable "how", not a one-off command.
```

See [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the review bar and the `index.json`
manifest rules. Run `node scripts/build-index.mjs` after adding a skill so the manifest
picks it up (the generator reads `<skill-name>/SKILL.md`).

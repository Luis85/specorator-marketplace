# Skills

Reusable **skills** (`SKILL.md` capabilities an agent auto-loads when its description
trigger matches) that a Specorator user can install into their vault's skill roots
(`.claude/skills/`, `.codex/skills/`, `.cursor/skills/`, …).

## Status

**Live** — the first skill, [`project-setup/`](project-setup/), is published, and the in-plugin
Marketplace installs skills with a **provider** (Claude / Codex / Cursor) and **scope** (project
vault or user home) chooser. Ready for more curated contributions.

## Format (when adding a skill)

Each skill is a folder containing a `SKILL.md`, mirroring the Claude Code / Codex / Cursor skill
layout so an installed skill is indistinguishable from a hand-authored one. Skills are
**multi-file**: the whole folder ships, so a skill can carry the supporting `references/`,
`scripts/`, or templates its `SKILL.md` points at:

```
skills/
  <skill-name>/
    SKILL.md            # required
    references/*.md     # optional supporting docs the skill points at
    scripts/**          # optional engine/helpers the skill invokes
```

`node scripts/build-index.mjs` walks the folder and records every file in the skill's
`index.json` entry as a `files` array (repo-relative paths, `SKILL.md` included). The plugin
fetches each of those on install and writes them under `<skill-root>/<skill-name>/`, preserving
the subfolder layout. Keep the folder to what the skill needs **at runtime** — exclude a skill's
own dev-only tests or scratch files so users don't get them in their vault.

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

Skills must be **text-only** (`SKILL.md` plus text supporting files). The plugin fetches
each file as text, so a binary asset would be corrupted on install; `validate:strict` rejects
any skill file containing a NUL byte.

See [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the review bar and the `index.json`
manifest rules. Run `node scripts/build-index.mjs` after adding a skill so the manifest
picks it up (the generator reads `<skill-name>/SKILL.md`).

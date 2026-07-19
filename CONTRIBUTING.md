# Contributing to the Specorator Marketplace

Thanks for helping grow the catalog. Every item is a plain Markdown file with YAML frontmatter,
reviewed before merge. This guide covers the format for each category, the field mapping the
plugin uses on install, and the one required step before you open a PR.

## Ground rules

- **Curated, not a free-for-all.** Every item ships through PR review before it lands — there is
  no unmoderated upload path. An item's payload becomes something an agent reads and acts on (a
  prompt sent verbatim, a system prompt that leads a conversation, a loop injected into a task,
  a template that prefills a work order), so entries are reviewed for prompt-injection / social-
  engineering risk, not just style.
- **Redistributable license required.** Each item must carry a `license` its author is entitled
  to grant (MIT unless stated). Adapted content must credit its `source`.
- **Self-describing.** Every item carries `name`, `description`, `tags`, `author`, and `license`
  in its frontmatter so it is complete on its own and in `index.json`.
- **One item, one file** (skills: one folder). Keep payloads focused.

## Repo layout

```
quick-actions/<slug>.md      # type: quick-action
agents/<slug>.md             # type: specorator-agent
loops/<slug>.md              # type: specorator-loop
templates/<slug>.md          # type: specorator-work-order-template
skills/<skill-name>/SKILL.md # a skill folder
index.json                   # GENERATED — do not hand-edit
scripts/build-index.mjs      # regenerates index.json
```

**Filename `<slug>`** = the item name lowercased, every run of non-alphanumeric characters
replaced with `-`, leading/trailing `-` trimmed (e.g. `Ticket to PR-ready` → `ticket-to-pr-ready`,
`Devil's advocate` → `devil-s-advocate`). This is the same slug Specorator derives from a name,
so a Loop / Template / Quick Action round-trips to the same install path.

## Common marketplace metadata

Add these keys to every item's frontmatter (they sit alongside the type-specific keys below and
are ignored by the plugin's note parsers, so they never interfere with installing):

| Key | Required | Notes |
|---|---|---|
| `author` | yes | Attribution line shown to the user. |
| `source` | when adapted | URL the item was adapted from. |
| `license` | yes | `MIT` unless the author grants another redistributable license. |
| `tags` | yes | Drives search + tag filtering. |
| `version` | recommended | Integer; bump on a meaningful content change. |

## Per-type format

### Quick Actions — `quick-actions/<slug>.md`

Native `quick-action` note. Frontmatter `type: quick-action`, `name`, optional `description`,
`icon`, `tags`; the **body is the prompt** sent to the agent. Do **not** include the personal
`favorite` / `favoriteRank` keys — those are per-user UI state, not catalog content.

```yaml
---
type: quick-action
name: Implement plan with subagents
description: Execute a superpowers implementation plan task-by-task using dispatched subagents
icon: list-checks
tags:
  - superpowers
  - implementation
author: Specorator
license: MIT
version: 1
---
The attached note is a superpowers implementation plan. Implement it end to end. …
```

### Loops — `loops/<slug>.md`

Native `specorator-loop` note. Frontmatter `type: specorator-loop`, `schema_version: 1`, `name`,
optional `description`, `icon`, `tags`; body is exactly these five `##` sections (a section may
be omitted if empty). `Use when` is picker-only guidance and is never injected into a run.

```yaml
---
type: specorator-loop
schema_version: 1
name: "Ticket to PR-ready"
description: "…"
icon: "git-pull-request"
tags: ["engineering", "bugfix"]
author: "…"
source: "…"
license: MIT
version: 1
---

## Use when
…
## Approach
…
## Steps
…
## Verify
…
## Notes
…
```

### Work-Order Templates — `templates/<slug>.md`

Native `specorator-work-order-template` note. Frontmatter `type: specorator-work-order-template`,
`schema_version: 1`, `name`, optional `description`, `icon`, `priority` (`0 - urgent` / `1 - high`
/ `2 - normal` / `3 - low`), `provider`, `model`, `loop`, `agent`; body is the work-order skeleton.
The placeholders `{{title}}`, `{{source}}`, and `{{date}}` are filled in when a work order is
created from the template. Keep `provider`/`model` unset unless the template genuinely requires
one — a pinned provider the installing user hasn't enabled falls back gracefully but is worth
avoiding.

### Agents — `agents/<slug>.md`

Roster agents persist as JSON in the vault, but are authored here as Markdown + frontmatter for
readability. The **body is the system prompt**; structured fields go in frontmatter:

```yaml
---
type: specorator-agent
schema_version: 1
name: "Code Reviewer"
description: "Reviews a change for correctness, edge cases, and clarity."   # routing blurb
icon: "shield-check"
color: "var(--color-purple)"       # a Lucide-friendly CSS var or hex
initials: "CR"
roles: ["verifier"]                # one or both of "worker" / "verifier"
tags: ["review"]
author: "Specorator"
license: MIT
version: 1
---

You review changes with technical rigor. …
```

**Install mapping** (what the plugin does, mirroring `presetAgentToRosterAgent` in the plugin's
`presetAgents.ts`): frontmatter + body →

| Roster agent field | Source |
|---|---|
| `id` | `roster:<slug>` derived from `name` |
| `name`, `description`, `icon`, `color`, `initials`, `roles` | frontmatter |
| `prompt` | the Markdown body |
| `disallowedTools`, `skills` | start empty — the installing user grants these per agent |
| `createdAt`, `updatedAt` | set at install time |

### Skills — `skills/<skill-name>/SKILL.md`

See [`skills/README.md`](skills/README.md). `<skill-name>` must equal the folder name and the
frontmatter `name` (lowercase-hyphen — it is also the skill's id). The `description` is the
dispatch trigger (third person, leads with "Use when …").

Skills are **multi-file**: `build-index.mjs` records every file in the folder as the item's
`files` array (repo-relative, `SKILL.md` included), and the plugin installs the whole folder
under `<skill-root>/<skill-name>/`. So ship the supporting `references/`/`scripts/`/templates the
skill needs at runtime, and **exclude** anything that is only for developing the skill (its own
test suite, scratch notes) — those would otherwise land in every installing user's vault. The
plugin installer chooses the provider root (Claude / Codex / Cursor) and scope (project / user) at
install time, so the skill folder itself carries no provider- or scope-specific paths.

## Before you open a PR

Run the same checks CI enforces (no dependencies — Node ≥ 20 built-ins only):

```bash
npm run build:index      # regenerate index.json from the item files
npm run validate:strict  # per-type contract checks (see rules below)
npm test                 # unit tests for the parser/validator
```

Commit the regenerated `index.json` alongside your item, then open the PR. GitHub Actions
([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) re-runs the unit tests,
`validate:strict`, and `npm run check:index` (fails if the committed `index.json` is stale).

`npm run validate` reports two levels: **errors** always fail; **warnings** fail only under
`--strict` (which CI uses). Warnings cover soft conventions — a quick action carrying personal
`favorite` state, a loop with no `## Use when`, an agent missing `icon`/`color`/`initials`, or a
`source` that isn't an `https://` URL. Errors cover the hard contract: parseable frontmatter,
required `name`/`description`/`author`/`license`/`tags`, the folder-matching `type` marker,
`schema_version: 1` (loops + templates), the **filename == `slugify(name)`** round-trip, the loop's
`Approach`/`Steps`/`Verify` sections, a valid template `priority`, and agent `roles` ⊆
`{worker, verifier}`.

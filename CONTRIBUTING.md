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
| `requires` | when the item needs others | Catalog ids installed **with** this item. See [Packages](#packages--items-that-bring-their-dependencies). |

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
| `disallowedTools` | starts empty — the installing user grants these per agent |
| `skills` | the skills listed in `requires`, bound to the agent as they install (see [Packages](#packages--items-that-bring-their-dependencies)); empty when the agent declares none |
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

Skills are **text-only**. The plugin fetches each file as text and writes it back as UTF-8, so a
binary asset (image, font, archive, …) would be silently corrupted on install — `validate:strict`
rejects any skill file containing a NUL byte. Keep skills to `SKILL.md` plus text supporting files.

## Packages — items that bring their dependencies

Some items are only useful together: an agent that works through a set of skills, a template
that assumes a loop. Declare those with `requires` — a list of **catalog ids** (`<folder>/<slug>`,
the same `id` the item gets in `index.json`):

```yaml
---
type: specorator-agent
name: "Project Manager"
# …
requires:
  - skills/project-brief
  - skills/raid-log
---
```

The plugin then treats the item as a **package**: opening it in the Marketplace lists what comes
with it, and one Install writes the whole set — **dependencies first, the item itself last**, so a
failure part-way never leaves an agent claiming skills that aren't there. Anything already
installed is skipped rather than overwritten. When an **agent** requires **skills**, the installed
skills are also bound to the agent's `skills` field, so it can reach them without the user wiring
them up by hand.

Rules `validate` enforces (all errors):

- every entry is a well-formed catalog id that **resolves to an item in this catalog**;
- an item never requires itself, and never lists the same dependency twice;
- the graph is **acyclic** (dependencies may nest — a skill may require another skill);
- at most **50** direct dependencies per item, and at most **100** items in one resolved package.

Keep `requires` to what the item genuinely needs at runtime. It is a hard install dependency, not
a recommendation: everything listed lands in the user's vault.

## Before you open a PR

Run the same checks CI enforces (Node ≥ 20; one devDependency, the YAML parser):

```bash
npm ci                   # once — installs `yaml`, the parser validate holds the catalog to
npm run build:index      # regenerate index.json from the item files
npm run validate:strict  # per-type contract checks (see rules below)
npm test                 # unit tests for the parser/validator
npm run ci               # all three, as CI runs them
```

That `npm ci` also installs a **pre-push hook** ([`.githooks/pre-push`](.githooks/pre-push), wired
up by the `prepare` script pointing `core.hooksPath` at the folder — no hook manager, no extra
dependency). It runs the three checks above and blocks the push if any fails, so a bad
`description` is caught on your machine rather than one CI round trip later. It is quiet when
everything passes, prints only the failing step's output when something doesn't, and
`git push --no-verify` skips it for a one-off.

Commit the regenerated `index.json` alongside your item, then open the PR. GitHub Actions
([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) re-runs the unit tests,
`validate:strict`, and `npm run check:index` (fails if the committed `index.json` is stale).

`npm run validate` reports two levels: **errors** always fail; **warnings** fail only under
`--strict` (which CI uses). Warnings cover soft conventions — a quick action carrying personal
`favorite` state, a loop with no `## Use when`, an agent missing `icon`/`color`/`initials`, or a
`source` that isn't an `https://` URL. Errors cover the hard contract: frontmatter that parses as
real YAML and means the same thing to both readers (see [below](#two-readers-held-to-each-other)),
required `name`/`description`/`author`/`license`/`tags`, the folder-matching `type` marker,
`schema_version: 1` (loops + templates), the **filename == `slugify(name)`** round-trip, the loop's
`Approach`/`Steps`/`Verify` sections, a valid template `priority`, and agent `roles` ⊆
`{worker, verifier}`.

### Two readers, held to each other

`index.json` is built by the small hand-rolled frontmatter reader in
[`scripts/lib/catalog.mjs`](scripts/lib/catalog.mjs), which is deliberately lenient. Every
consumer downstream — the plugin's note parsers, and Claude Code / Codex / Cursor loading an
installed `SKILL.md` — uses a real YAML parser instead. An item is only publishable when **both**
read it, and read it the same way, so `validate` parses every item a second time with the
[`yaml`](https://www.npmjs.com/package/yaml) library and errors on:

- **frontmatter a real parser rejects** — the common cause is an unquoted value containing `": "`
  (`description: … Produces a SOW: deliverables, …` is read as a nested mapping), but it also
  covers unterminated quotes, trailing content after a quoted scalar, duplicate keys, a value
  opening on a YAML indicator (`*`, `&`, `{`, `[`, `|`, `>`, `%`, `@`, `` ` ``, `- `, `? `), and
  frontmatter that isn't a mapping;
- **frontmatter the two readers disagree about** — valid YAML that would still publish a manifest
  entry no consumer ever sees. `tags: [a: b]` is the example: a one-pair mapping to a real parser,
  the string `"a: b"` to the lenient one.

Quoting the value fixes almost every case, and the error names the key to quote. This is a hard
gate, not a heuristic — new frontmatter shapes are covered automatically because the check is a
real parser rather than a pattern list.

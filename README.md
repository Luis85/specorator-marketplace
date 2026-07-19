# Specorator Marketplace

A curated, versioned catalog of installable **Quick Actions**, **Agents**, **Loops**,
**Work-Order Templates**, and **Skills** for the
[Specorator](https://github.com/Luis85/specorator) Obsidian plugin.

Every item is a plain Markdown file (a **skill** is a folder of files) you can read here on
GitHub before you install it. Once installed into your vault it becomes a normal file you own —
indistinguishable from one you authored by hand — because each item is stored in the exact
on-disk format Specorator's own stores already read.

> **Status:** the in-plugin **Marketplace** browse/install view has shipped — open it from the
> `store` ribbon or the *Open Marketplace* command (network is opt-in). Skills install with a
> **provider** (Claude / Codex / Cursor) and **scope** (project vault or user home) chooser; see
> the [Specorator Marketplace PRD](https://github.com/Luis85/specorator/blob/main/docs/product/Specorator%20Marketplace%20PRD.md).
> Items here can also still be installed by hand (see [Manual install](#manual-install)).

## What's in the catalog

| Category | Folder | Count | What it is | Installs to |
|---|---|--:|---|---|
| Quick Actions | [`quick-actions/`](quick-actions/) | 3 | One-tap saved prompts for the chat composer | your Quick Actions folder |
| Agents | [`agents/`](agents/) | 8 | Named roster specialists (brief + system prompt + role) | `.specorator/agents/` |
| Loops | [`loops/`](loops/) | 10 | Use-when / Approach / Steps / Verify / Notes playbooks | your Loop folder |
| Work-Order Templates | [`templates/`](templates/) | 6 | Reusable Agent Board work-order skeletons | your Template folder |
| Skills | [`skills/`](skills/) | 1 | `SKILL.md` capability folders an agent auto-loads | a provider's skill root (project or user), chosen on install |

The machine-readable index of everything above is **[`index.json`](index.json)** — the manifest
the plugin fetches first (one request) to list, search, and filter the catalog. It is generated
from the item files; never edit it by hand (see [Contributing](#contributing)).

## How installing works

1. The plugin fetches `index.json` over plain HTTPS to list the catalog.
2. You open an item's detail/preview and read its full payload + attribution before installing.
3. Install routes the item through the same store the plugin already uses for user-authored
   items of that type — so an installed item is a normal, editable vault file from then on.

Loops, Work-Order Templates, and Quick Actions are authored here in their native store formats,
so they are byte-compatible with what the plugin writes. Agents are authored as Markdown +
frontmatter for readability; the plugin maps their fields onto a roster agent on install (see
[`CONTRIBUTING.md`](CONTRIBUTING.md)).

**Skills** are multi-file: a skill's `index.json` entry carries a `files` array listing every
file in its folder (its `SKILL.md` plus any `references/`, `scripts/`, or templates), so the
plugin fetches and writes the whole folder on install. You choose a **provider** (Claude, Codex,
or Cursor) and a **scope** — *project* (the vault's `.claude/skills`, `.codex/skills`, or
`.cursor/skills`) or *user* (the same path under your home directory, shared across vaults) — and
the skill lands under `<root>/<skill-name>/`. The `SKILL.md` you preview is exactly what installs;
the supporting files are fetched from the same source at install time.

## Manual install

You can also install anything here by hand without the plugin view: open the item's `.md`, and
either copy its contents into a new note in the matching vault folder (Loops / Templates / Quick
Actions), or paste the agent's fields into the Agent Roster editor. For a skill, recreate its
folder under a skill root (e.g. `.claude/skills/<name>/`) and copy every file listed in the
skill's `files` array.

## Attribution

- The **Loops** are curated and adapted from the
  [Forward-Future loop library](https://github.com/Forward-Future/loop-library) (MIT).
- Agents, Templates, and Quick Actions are authored by the Specorator project.

Each item carries its own `author`, `source`, and `license` in its frontmatter and in
`index.json`.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) for the per-type file format, the agent→roster field
mapping, and the review bar. After adding or editing an item, regenerate the manifest and run the
same checks CI enforces (no dependencies to install — Node ≥ 20 built-ins only):

```bash
npm run build:index      # regenerate index.json from the item files (commit it)
npm run validate:strict  # per-type contract checks (errors + warnings)
npm test                 # unit tests for the parser/validator
```

Every push and pull request runs these in GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)):
the unit tests, `validate:strict`, and an `index.json` freshness check (`npm run check:index`).

## License

[MIT](LICENSE). Individual items are redistributable under the license named in their
frontmatter (MIT unless stated otherwise).

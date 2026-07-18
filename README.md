# Specorator Marketplace

A curated, versioned catalog of installable **Quick Actions**, **Agents**, **Loops**,
**Work-Order Templates**, and **Skills** for the
[Specorator](https://github.com/Luis85/specorator) Obsidian plugin.

Every item is a plain Markdown file you can read here on GitHub before you install it. Once
installed into your vault it becomes a normal file you own — indistinguishable from one you
authored by hand — because each item is stored in the exact on-disk format Specorator's own
stores already read.

> **Status:** this repo is being seeded from the plugin's built-in starter sets. The in-plugin
> "Marketplace" browse/install view is future work — see the
> [Specorator Marketplace PRD](https://github.com/Luis85/specorator/blob/main/docs/product/Specorator%20Marketplace%20PRD.md).
> Until it ships, items here can still be installed by copying the file into the matching vault
> folder (see [Manual install](#manual-install)).

## What's in the catalog

| Category | Folder | Count | What it is | Installs to |
|---|---|--:|---|---|
| Quick Actions | [`quick-actions/`](quick-actions/) | 3 | One-tap saved prompts for the chat composer | your Quick Actions folder |
| Agents | [`agents/`](agents/) | 8 | Named roster specialists (brief + system prompt + role) | `.specorator/agents/` |
| Loops | [`loops/`](loops/) | 10 | Use-when / Approach / Steps / Verify / Notes playbooks | your Loop folder |
| Work-Order Templates | [`templates/`](templates/) | 6 | Reusable Agent Board work-order skeletons | your Template folder |
| Skills | [`skills/`](skills/) | 0 | `SKILL.md` capabilities an agent auto-loads | a vault skill root |

The machine-readable index of everything above is **[`index.json`](index.json)** — the manifest
the plugin fetches first (one request) to list, search, and filter the catalog. It is generated
from the item files; never edit it by hand (see [Contributing](#contributing)).

## How installing works (once the plugin view ships)

1. The plugin fetches `index.json` over plain HTTPS to list the catalog.
2. You open an item's detail/preview and read its full payload + attribution before installing.
3. Install routes the item through the same store the plugin already uses for user-authored
   items of that type — so an installed item is a normal, editable vault file from then on.

Loops, Work-Order Templates, and Quick Actions are authored here in their native store formats,
so they are byte-compatible with what the plugin writes. Agents are authored as Markdown +
frontmatter for readability; the plugin maps their fields onto a roster agent on install (see
[`CONTRIBUTING.md`](CONTRIBUTING.md)).

## Manual install

Until the in-plugin view lands you can still use anything here: open the item's `.md`, and either
copy its contents into a new note in the matching vault folder (Loops / Templates / Quick
Actions), or paste the agent's fields into the Agent Roster editor. The plugin already ships the
same starter sets behind its "Install common …" buttons, so most of this catalog is also one
click away inside Specorator today.

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

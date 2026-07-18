/**
 * Shared, dependency-free catalog library for the Specorator Marketplace.
 *
 * Pure and side-effect-free on import (the two touch points that read the
 * filesystem, `readCatalogFiles` and the functions built on it, only do so when
 * called with a root), so the CLIs (`build-index.mjs`, `validate-catalog.mjs`)
 * and the unit tests can all import it safely.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// [folder, singular catalog type, expected frontmatter `type` marker].
// The folder is authoritative for an item's catalog type; the marker is what a
// well-formed item must declare in its own frontmatter. Skills use a
// `<name>/SKILL.md` folder layout and have no single-file marker.
export const CATEGORIES = [
  ['quick-actions', 'quick-action', 'quick-action'],
  ['agents', 'agent', 'specorator-agent'],
  ['loops', 'loop', 'specorator-loop'],
  ['templates', 'template', 'specorator-work-order-template'],
  ['skills', 'skill', null],
];

export const VALID_PRIORITIES = ['0 - urgent', '1 - high', '2 - normal', '3 - low'];
export const VALID_ROLES = ['worker', 'verifier'];
/** Loop sections injected into a run — required to be non-empty. `Use when` is picker-only. */
export const LOOP_REQUIRED_SECTIONS = ['Approach', 'Steps', 'Verify'];

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const SECTION_HEADING_RE = /^##\s+(.+?)\s*$/;

/** Same slug rule as the plugin's noteStoreShared.slugify, so names round-trip to install paths. */
export function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function unquote(v) {
  if (v.length >= 2 && ((v[0] === '"' && v.endsWith('"')) || (v[0] === "'" && v.endsWith("'")))) {
    return v.slice(1, -1).replace(/\\"/g, '"');
  }
  return v;
}

/**
 * Removes a trailing YAML inline comment (a `#` at line start or preceded by
 * whitespace), skipping any `#` inside single/double quotes — matching how a
 * real YAML parser treats comments.
 */
export function stripInlineComment(value) {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < value.length; i += 1) {
    const c = value[i];
    if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '#' && !inSingle && !inDouble && (i === 0 || /\s/.test(value[i - 1]))) {
      return value.slice(0, i);
    }
  }
  return value;
}

export function parseScalarOrArray(value) {
  const v = stripInlineComment(value).trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    return inner ? inner.split(',').map((s) => unquote(s.trim())) : [];
  }
  return unquote(v);
}

/** Minimal YAML-frontmatter reader for the flat scalar/array shapes this catalog uses. */
export function parseFrontmatter(text) {
  const match = text.match(FRONTMATTER_RE);
  if (!match) return { frontmatter: {}, body: text };
  const lines = match[1].split(/\r?\n/);
  const frontmatter = {};
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    if (stripInlineComment(rawValue).trim() === '') {
      // Bare `key:` (optionally with a trailing comment) — a block sequence follows.
      const seq = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        i += 1;
        seq.push(unquote(stripInlineComment(lines[i].replace(/^\s*-\s+/, '')).trim()));
      }
      frontmatter[key] = seq.length ? seq : '';
      continue;
    }
    frontmatter[key] = parseScalarOrArray(rawValue);
  }
  return { frontmatter, body: match[2] };
}

/** Reads a `## Heading` section body, stopping at the next `##`. Mirrors the plugin's reader. */
export function extractSection(body, heading) {
  const out = [];
  let inSection = false;
  for (const line of body.split(/\r?\n/)) {
    const m = line.match(SECTION_HEADING_RE);
    if (m) {
      if (inSection) break;
      inSection = m[1] === heading;
      continue;
    }
    if (inSection) out.push(line);
  }
  return out.join('\n').trim();
}

export function toList(value) {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

/**
 * Walks the category folders and returns one raw entry per item:
 * `{ folder, type, typeMarker, file, slug, path, frontmatter, body }`.
 * Handles the `skills/<name>/SKILL.md` subfolder layout. Deterministic order
 * (CATEGORIES order, then filename).
 */
export function readCatalogFiles(root) {
  const entries = [];
  for (const [folder, type, typeMarker] of CATEGORIES) {
    let dirents;
    try {
      dirents = readdirSync(join(root, folder), { withFileTypes: true });
    } catch {
      continue; // folder may not exist
    }
    dirents.sort((a, b) => a.name.localeCompare(b.name));

    if (type === 'skill') {
      for (const dirent of dirents) {
        if (!dirent.isDirectory()) continue;
        let content;
        try {
          content = readFileSync(join(root, folder, dirent.name, 'SKILL.md'), 'utf8');
        } catch {
          continue; // a directory without SKILL.md is not a skill
        }
        const { frontmatter, body } = parseFrontmatter(content);
        entries.push({
          folder, type, typeMarker, file: 'SKILL.md', slug: dirent.name,
          path: `${folder}/${dirent.name}/SKILL.md`, frontmatter, body,
        });
      }
      continue;
    }

    for (const dirent of dirents) {
      if (!dirent.isFile() || !dirent.name.endsWith('.md') || dirent.name === 'README.md') continue;
      const { frontmatter, body } = parseFrontmatter(readFileSync(join(root, folder, dirent.name), 'utf8'));
      entries.push({
        folder, type, typeMarker, file: dirent.name, slug: dirent.name.replace(/\.md$/i, ''),
        path: `${folder}/${dirent.name}`, frontmatter, body,
      });
    }
  }
  return entries;
}

/** Projects a raw catalog entry into a manifest item (omitting absent optional fields). */
export function buildItem(entry) {
  const fm = entry.frontmatter;
  const item = {
    id: `${entry.folder}/${entry.slug}`,
    type: entry.type,
    name: fm.name || entry.slug,
    description: fm.description || '',
    path: entry.path,
    tags: toList(fm.tags),
  };
  if (fm.icon) item.icon = fm.icon;
  if (fm.roles) item.roles = toList(fm.roles);
  if (fm.priority) item.priority = fm.priority;
  if (fm.author) item.author = fm.author;
  if (fm.source) item.source = fm.source;
  if (fm.license) item.license = fm.license;
  if (fm.version !== undefined && fm.version !== '') item.version = Number(fm.version);
  return item;
}

export function collectItems(root) {
  return readCatalogFiles(root).map(buildItem);
}

export function buildManifest(items) {
  return { schemaVersion: 1, catalog: 'specorator-marketplace', count: items.length, items };
}

const nonEmptyString = (v) => (typeof v === 'string' && v.trim() ? v.trim() : '');

/**
 * Validates every catalog item against its per-type contract.
 * Returns `{ errors, warnings }` — errors fail CI; warnings fail only under --strict.
 */
export function validateCatalog(root) {
  const errors = [];
  const warnings = [];
  const seenIds = new Map();

  for (const entry of readCatalogFiles(root)) {
    const { frontmatter: fm, type, typeMarker, path } = entry;
    const err = (msg) => errors.push(`${path}: ${msg}`);
    const warn = (msg) => warnings.push(`${path}: ${msg}`);

    if (!fm || Object.keys(fm).length === 0) {
      err('missing or unparseable YAML frontmatter');
      continue;
    }

    const name = nonEmptyString(fm.name);
    if (!name) err('missing required `name`');
    if (!nonEmptyString(fm.description)) err('missing required `description`');
    if (!nonEmptyString(fm.author)) err('missing required `author`');
    if (!nonEmptyString(fm.license)) err('missing required `license`');
    if (!Array.isArray(fm.tags) || fm.tags.length === 0) err('`tags` must be a non-empty list');

    if (type !== 'skill' && fm.type !== typeMarker) {
      err(`\`type\` must be "${typeMarker}" (got ${JSON.stringify(fm.type ?? null)})`);
    }
    if ((type === 'loop' || type === 'template') && Number(fm.schema_version) !== 1) {
      err('`schema_version` must be 1');
    }

    if (name) {
      const expected = slugify(name);
      if (entry.slug !== expected) {
        const label = type === 'skill' ? `skill folder "${entry.slug}"` : `filename "${entry.slug}.md"`;
        const want = type === 'skill' ? `"${expected}"` : `"${expected}.md"`;
        err(`${label} must match slugify(name) ${want}`);
      }
    }

    if (type === 'loop') {
      for (const heading of LOOP_REQUIRED_SECTIONS) {
        if (!extractSection(entry.body, heading)) err(`loop is missing a non-empty "## ${heading}" section`);
      }
      if (!extractSection(entry.body, 'Use when')) warn('loop has no "## Use when" section (picker guidance)');
    } else if (type === 'template') {
      if (!entry.body.trim()) err('template body is empty');
      if (fm.priority !== undefined && fm.priority !== '' && !VALID_PRIORITIES.includes(String(fm.priority))) {
        err(`invalid \`priority\` ${JSON.stringify(fm.priority)} (expected one of ${VALID_PRIORITIES.join(', ')})`);
      }
    } else if (type === 'agent') {
      if (!entry.body.trim()) err('agent body (system prompt) is empty');
      const roles = toList(fm.roles);
      if (roles.length === 0) err('agent must declare at least one role');
      for (const role of roles) if (!VALID_ROLES.includes(role)) err(`invalid role "${role}" (expected worker/verifier)`);
      for (const key of ['icon', 'color', 'initials']) if (!nonEmptyString(fm[key])) warn(`agent missing \`${key}\``);
    } else if (type === 'quick-action') {
      if (!entry.body.trim()) err('quick action body (prompt) is empty');
      if (fm.favorite !== undefined || fm.favoriteRank !== undefined) {
        warn('quick action carries personal favorite state (drop `favorite`/`favoriteRank` from catalog copies)');
      }
    } else if (type === 'skill') {
      if (!nonEmptyString(fm.name)) err('skill SKILL.md missing `name`');
      if (!entry.body.trim()) err('skill SKILL.md body is empty');
    }

    if (fm.source && !/^https:\/\//.test(String(fm.source))) warn('`source` should be an https:// URL');

    const id = `${entry.folder}/${entry.slug}`;
    if (seenIds.has(id)) err(`duplicate id "${id}" (also ${seenIds.get(id)})`);
    else seenIds.set(id, path);
  }

  return { errors, warnings };
}

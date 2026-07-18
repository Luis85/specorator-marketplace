#!/usr/bin/env node
/**
 * Regenerates index.json — the catalog manifest the Specorator plugin fetches
 * first to browse the marketplace — by scanning the category folders and reading
 * each item's YAML frontmatter. No external dependencies (Node >= 16, ESM).
 *
 *   node scripts/build-index.mjs           # write index.json
 *   node scripts/build-index.mjs --check   # exit non-zero if index.json is stale (CI)
 *
 * The output is deterministic: same files in, same index.json out (no timestamps),
 * so re-running never produces a spurious diff.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// [folder, singular catalog type] — folder is authoritative for an item's type.
const CATEGORIES = [
  ['quick-actions', 'quick-action'],
  ['agents', 'agent'],
  ['loops', 'loop'],
  ['templates', 'template'],
  ['skills', 'skill'],
];

/** Minimal YAML-frontmatter reader for the flat scalar/array shapes this catalog uses. */
function parseFrontmatter(text) {
  if (!text.startsWith('---')) return {};
  const end = text.indexOf('\n---', 3);
  if (end === -1) return {};
  const lines = text.slice(3, end).replace(/^\n/, '').split(/\r?\n/);
  const fm = {};
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
      fm[key] = seq.length ? seq : '';
      continue;
    }
    fm[key] = parseScalarOrArray(rawValue);
  }
  return fm;
}

/**
 * Removes a trailing YAML inline comment (a `#` at line start or preceded by
 * whitespace), skipping any `#` inside single/double quotes. Matches how a real
 * YAML parser treats comments, so the documented `key: value  # note` style
 * indexes correctly instead of leaking the comment into the value.
 */
function stripInlineComment(value) {
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

function parseScalarOrArray(value) {
  const v = stripInlineComment(value).trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    return inner ? inner.split(',').map((s) => unquote(s.trim())) : [];
  }
  return unquote(v);
}

function unquote(v) {
  if (v.length >= 2 && ((v[0] === '"' && v.endsWith('"')) || (v[0] === "'" && v.endsWith("'")))) {
    return v.slice(1, -1).replace(/\\"/g, '"');
  }
  return v;
}

function toList(value) {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function buildItem(folder, type, slug, relPath, fm) {
  const item = {
    id: `${folder}/${slug}`,
    type,
    name: fm.name || slug,
    description: fm.description || '',
    path: relPath,
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

const items = [];
for (const [folder, type] of CATEGORIES) {
  let entries;
  try {
    entries = readdirSync(join(ROOT, folder), { withFileTypes: true });
  } catch {
    continue; // folder may not exist yet
  }
  entries.sort((a, b) => a.name.localeCompare(b.name));

  if (type === 'skill') {
    // Skills use a `<skill-name>/SKILL.md` folder layout, not a flat file.
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      let content;
      try {
        content = readFileSync(join(ROOT, folder, entry.name, 'SKILL.md'), 'utf8');
      } catch {
        continue; // directory without a SKILL.md is not a skill
      }
      items.push(
        buildItem(folder, type, entry.name, `${folder}/${entry.name}/SKILL.md`, parseFrontmatter(content)),
      );
    }
    continue;
  }

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'README.md') continue;
    const slug = entry.name.replace(/\.md$/i, '');
    const fm = parseFrontmatter(readFileSync(join(ROOT, folder, entry.name), 'utf8'));
    items.push(buildItem(folder, type, slug, `${folder}/${entry.name}`, fm));
  }
}

const manifest = {
  schemaVersion: 1,
  catalog: 'specorator-marketplace',
  count: items.length,
  items,
};
const output = `${JSON.stringify(manifest, null, 2)}\n`;
const target = join(ROOT, 'index.json');

if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(target, 'utf8');
  } catch {
    /* missing counts as stale */
  }
  if (current !== output) {
    console.error('index.json is out of date — run: node scripts/build-index.mjs');
    process.exit(1);
  }
  console.log(`index.json is up to date (${items.length} items).`);
} else {
  writeFileSync(target, output);
  console.log(`Wrote index.json (${items.length} items).`);
}

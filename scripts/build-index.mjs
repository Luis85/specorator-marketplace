#!/usr/bin/env node
/**
 * Regenerates index.json — the catalog manifest the Specorator plugin fetches
 * first to browse the marketplace — from the item files under the category
 * folders. No external dependencies (Node >= 20, ESM).
 *
 *   node scripts/build-index.mjs           # write index.json   (npm run build:index)
 *   node scripts/build-index.mjs --check   # exit 1 if stale    (npm run check:index)
 *
 * Deterministic: same files in, same index.json out (no timestamps), so
 * re-running never produces a spurious diff. Parsing/collection logic lives in
 * ./lib/catalog.mjs so it can be unit-tested and shared with the validator.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectItems, buildManifest } from './lib/catalog.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = join(ROOT, 'index.json');

const manifest = buildManifest(collectItems(ROOT));
const output = `${JSON.stringify(manifest, null, 2)}\n`;

if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(target, 'utf8');
  } catch {
    /* missing counts as stale */
  }
  if (current !== output) {
    console.error('index.json is out of date — run: npm run build:index');
    process.exit(1);
  }
  console.log(`index.json is up to date (${manifest.count} items).`);
} else {
  writeFileSync(target, output);
  console.log(`Wrote index.json (${manifest.count} items).`);
}

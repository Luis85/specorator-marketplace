#!/usr/bin/env node
/**
 * Validates every catalog item against its per-type contract (see CONTRIBUTING.md).
 *
 *   node scripts/validate-catalog.mjs            # errors fail       (npm run validate)
 *   node scripts/validate-catalog.mjs --strict   # warnings fail too (npm run validate:strict)
 *
 * Rules live in ./lib/catalog.mjs (validateCatalog) so they are unit-tested.
 */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCatalog } from './lib/catalog.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const strict = process.argv.includes('--strict');
const { errors, warnings } = validateCatalog(ROOT);

for (const w of warnings) console.warn(`  warning  ${w}`);
for (const e of errors) console.error(`  error    ${e}`);

if (errors.length > 0 || (strict && warnings.length > 0)) {
  console.error(
    `\nCatalog validation failed: ${errors.length} error(s)` +
      (strict ? `, ${warnings.length} warning(s) [strict]` : ` (${warnings.length} warning(s))`),
  );
  process.exit(1);
}

console.log(
  `Catalog OK — ${errors.length} errors, ${warnings.length} warnings${strict ? ' [strict]' : ''}.`,
);

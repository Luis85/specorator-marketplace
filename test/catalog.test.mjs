import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';

import {
  slugify,
  stripInlineComment,
  parseScalarOrArray,
  parseFrontmatter,
  extractSection,
  buildItem,
  collectItems,
  buildManifest,
  validateCatalog,
} from '../scripts/lib/catalog.mjs';

// --- pure helpers -----------------------------------------------------------

test('slugify matches the plugin slug rule (names round-trip to install paths)', () => {
  assert.equal(slugify('Ticket to PR-ready'), 'ticket-to-pr-ready');
  assert.equal(slugify("Devil's advocate"), 'devil-s-advocate');
  assert.equal(slugify('100% test coverage'), '100-test-coverage');
  assert.equal(slugify('  Bug fix  '), 'bug-fix');
});

test('stripInlineComment removes trailing comments but respects quotes', () => {
  assert.equal(stripInlineComment('["a", "b"]   # note'), '["a", "b"]   ');
  assert.equal(stripInlineComment('"a # b"'), '"a # b"'); // # inside quotes is kept
  assert.equal(stripInlineComment('#leading'), ''); // # at line start
  assert.equal(stripInlineComment('a#b'), 'a#b'); // no whitespace before # => not a comment
  assert.equal(stripInlineComment('plain value'), 'plain value');
});

test('parseScalarOrArray handles quoted scalars, arrays, and trailing comments', () => {
  assert.equal(parseScalarOrArray('"hello"'), 'hello');
  assert.deepEqual(parseScalarOrArray('["a", "b"]'), ['a', 'b']);
  assert.deepEqual(parseScalarOrArray('["a"]   # comment'), ['a']);
  assert.equal(parseScalarOrArray('1 - high'), '1 - high');
  assert.deepEqual(parseScalarOrArray('[]'), []);
});

test('parseFrontmatter reads scalars, inline + block arrays, comments, and body', () => {
  const text = [
    '---',
    'type: specorator-agent',
    'name: "Code Reviewer"',
    'description: "Reviews a change."   # routing blurb',
    'roles: ["worker", "verifier"]      # both',
    'tags:',
    '  - review',
    '  - verifier',
    'version: 1',
    '---',
    '',
    'Body prompt line.',
    '',
  ].join('\n');
  const { frontmatter, body } = parseFrontmatter(text);
  assert.equal(frontmatter.type, 'specorator-agent');
  assert.equal(frontmatter.name, 'Code Reviewer');
  assert.equal(frontmatter.description, 'Reviews a change.'); // comment stripped, quotes removed
  assert.deepEqual(frontmatter.roles, ['worker', 'verifier']); // array survives trailing comment
  assert.deepEqual(frontmatter.tags, ['review', 'verifier']); // block sequence
  assert.match(body, /Body prompt line\./);
});

test('extractSection reads a section up to the next heading', () => {
  const body = ['## Approach', '', 'Do the thing.', '', '## Steps', '', '1. Step one.'].join('\n');
  assert.equal(extractSection(body, 'Approach'), 'Do the thing.');
  assert.equal(extractSection(body, 'Steps'), '1. Step one.');
  assert.equal(extractSection(body, 'Missing'), '');
});

test('buildItem projects a manifest item and coerces version to a number', () => {
  const item = buildItem({
    folder: 'loops',
    type: 'loop',
    slug: 'x',
    path: 'loops/x.md',
    frontmatter: { name: 'X', description: 'd', tags: ['a'], version: '2', icon: 'i', license: 'MIT' },
    body: '',
  });
  assert.equal(item.id, 'loops/x');
  assert.equal(item.type, 'loop');
  assert.deepEqual(item.tags, ['a']);
  assert.equal(item.version, 2);
  assert.equal(item.icon, 'i');
  assert.equal('roles' in item, false); // absent optionals are omitted
});

// --- validateCatalog over fixture catalogs -----------------------------------

const validLoop = [
  '---',
  'type: specorator-loop',
  'schema_version: 1',
  'name: "Ticket to PR-ready"',
  'description: "d"',
  'tags: ["x"]',
  'author: "A"',
  'license: MIT',
  '---',
  '',
  '## Use when', '', 'w', '',
  '## Approach', '', 'a', '',
  '## Steps', '', 's', '',
  '## Verify', '', 'v', '',
].join('\n');

function makeCatalog(files) {
  const root = mkdtempSync(join(tmpdir(), 'spec-mkt-'));
  for (const [rel, content] of Object.entries(files)) {
    const full = join(root, rel);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
  }
  return root;
}

/** Runs validateCatalog over a fixture set, always cleaning up the temp dir. */
function validateFixture(files) {
  const root = makeCatalog(files);
  try {
    return validateCatalog(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

const has = (list, re) => list.some((m) => re.test(m));

test('validateCatalog accepts a well-formed catalog', () => {
  const { errors, warnings } = validateFixture({ 'loops/ticket-to-pr-ready.md': validLoop });
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
});

test('collectItems + buildManifest build a manifest over a fixture catalog', () => {
  const root = makeCatalog({ 'loops/ticket-to-pr-ready.md': validLoop });
  try {
    const manifest = buildManifest(collectItems(root));
    assert.equal(manifest.count, 1);
    assert.equal(manifest.items[0].id, 'loops/ticket-to-pr-ready');
    assert.equal(manifest.items[0].type, 'loop');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('validateCatalog flags a filename that does not match slugify(name)', () => {
  const { errors } = validateFixture({ 'loops/wrong-name.md': validLoop });
  assert.ok(has(errors, /must match slugify\(name\)/));
});

test('validateCatalog flags a missing license', () => {
  const noLicense = validLoop.replace('license: MIT\n', '');
  const { errors } = validateFixture({ 'loops/ticket-to-pr-ready.md': noLicense });
  assert.ok(has(errors, /missing required `license`/));
});

test('validateCatalog flags a type marker that does not match the folder', () => {
  const wrongType = validLoop.replace('type: specorator-loop', 'type: quick-action');
  const { errors } = validateFixture({ 'loops/ticket-to-pr-ready.md': wrongType });
  assert.ok(has(errors, /`type` must be "specorator-loop"/));
});

test('validateCatalog flags a loop missing a required section', () => {
  const noVerify = validLoop.replace('## Verify', '## Notes');
  const { errors } = validateFixture({ 'loops/ticket-to-pr-ready.md': noVerify });
  assert.ok(has(errors, /missing a non-empty "## Verify" section/));
});

test('validateCatalog flags an invalid template priority', () => {
  const badPriority = [
    '---',
    'type: specorator-work-order-template',
    'schema_version: 1',
    'name: "Bug fix"',
    'description: "d"',
    'priority: 9 - bogus',
    'tags: ["x"]',
    'author: "A"',
    'license: MIT',
    '---',
    '',
    '# {{title}}',
    'body',
  ].join('\n');
  const { errors } = validateFixture({ 'templates/bug-fix.md': badPriority });
  assert.ok(has(errors, /invalid `priority`/));
});

test('validateCatalog flags an invalid agent role', () => {
  const badRole = [
    '---',
    'type: specorator-agent',
    'name: "Planner"',
    'description: "d"',
    'roles: ["wizard"]',
    'tags: ["x"]',
    'author: "A"',
    'license: MIT',
    '---',
    '',
    'Prompt.',
  ].join('\n');
  const { errors } = validateFixture({ 'agents/planner.md': badRole });
  assert.ok(has(errors, /invalid role "wizard"/));
});

test('validateCatalog accepts a well-formed skill folder', () => {
  const validSkill = [
    '---',
    'name: my-skill',
    'description: "Use when doing the thing."',
    'tags: ["x"]',
    'author: A',
    'license: MIT',
    '---',
    '',
    'Do the thing.',
  ].join('\n');
  const { errors, warnings } = validateFixture({ 'skills/my-skill/SKILL.md': validSkill });
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
});

test('validateCatalog errors on a skill folder with a mis-cased/missing SKILL.md', () => {
  const body = ['---', 'name: broken', 'description: d', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'x'].join('\n');
  const { errors } = validateFixture({ 'skills/broken/skill.md': body }); // lowercase
  assert.ok(has(errors, /skills\/broken\/: missing SKILL\.md/));
});

test('validateCatalog warns (does not error) on quick-action favorite state', () => {
  const favQuickAction = [
    '---',
    'type: quick-action',
    'name: Implement plan with subagents',
    'description: d',
    'tags:',
    '  - x',
    'favorite: true',
    'author: Specorator',
    'license: MIT',
    '---',
    'Prompt body.',
  ].join('\n');
  const { errors, warnings } = validateFixture({
    'quick-actions/implement-plan-with-subagents.md': favQuickAction,
  });
  assert.deepEqual(errors, []);
  assert.ok(has(warnings, /favorite state/));
});

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
  parseVersion,
  collectItems,
  buildManifest,
  validateCatalog,
  listSkillFiles,
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
  assert.equal(parseScalarOrArray('1'), 1); // unquoted number → Number
  assert.equal(parseScalarOrArray('"1"'), '1'); // quoted → stays a string
  assert.equal(parseScalarOrArray('true'), true);
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
  assert.equal(frontmatter.version, 1); // unquoted number coerced to Number
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

test('parseVersion accepts positive integers and rejects everything else', () => {
  assert.equal(parseVersion('1'), 1);
  assert.equal(parseVersion('12'), 12);
  assert.equal(parseVersion(undefined), undefined);
  assert.equal(parseVersion(''), undefined);
  assert.equal(parseVersion('1.0.0'), undefined); // semver string
  assert.equal(parseVersion('0'), undefined);
  assert.equal(parseVersion('abc'), undefined);
});

test('buildItem omits an invalid version instead of publishing null', () => {
  const item = buildItem({
    folder: 'loops',
    type: 'loop',
    slug: 'x',
    path: 'loops/x.md',
    frontmatter: { name: 'X', description: 'd', tags: ['a'], version: '1.0.0' },
    body: '',
  });
  assert.equal('version' in item, false); // not null
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

test('validateCatalog rejects a quoted schema_version (the plugin parses it as a string and rejects)', () => {
  const quoted = validLoop.replace('schema_version: 1', 'schema_version: "1"');
  const { errors } = validateFixture({ 'loops/ticket-to-pr-ready.md': quoted });
  assert.ok(has(errors, /`schema_version` must be the unquoted integer 1/));
});

test('validateCatalog flags a non-integer version', () => {
  const badVersion = validLoop.replace('license: MIT', 'license: MIT\nversion: 1.0.0');
  const { errors } = validateFixture({ 'loops/ticket-to-pr-ready.md': badVersion });
  assert.ok(has(errors, /`version` must be a positive integer/));
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

test('collectItems lists every file in a multi-file skill folder (SKILL.md + supporting files, all under the folder)', () => {
  const skill = ['---', 'name: multi', 'description: "Use when x."', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'body'].join('\n');
  const root = makeCatalog({
    'skills/multi/SKILL.md': skill,
    'skills/multi/references/a.md': 'a',
    'skills/multi/scripts/run.mjs': 'export const x = 1;',
    'skills/multi/scripts/lib/dep.mjs': 'export const y = 2;',
  });
  try {
    const item = collectItems(root).find((i) => i.id === 'skills/multi');
    assert.ok(item, 'skill item present');
    // The whole folder ships, not just SKILL.md. Assert the SET (sorted) so the
    // test doesn't couple to locale-specific ordering of the deterministic walk.
    assert.deepEqual([...item.files].sort(), [
      'skills/multi/SKILL.md',
      'skills/multi/references/a.md',
      'skills/multi/scripts/lib/dep.mjs',
      'skills/multi/scripts/run.mjs',
    ]);
    assert.ok(item.files.includes('skills/multi/SKILL.md'), 'SKILL.md included');
    assert.ok(item.files.every((f) => f.startsWith('skills/multi/')), 'every file stays under the skill folder');
    // Deterministic: same input → identical order (drives check:index freshness).
    const again = collectItems(root).find((i) => i.id === 'skills/multi');
    assert.deepEqual(again.files, item.files);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('listSkillFiles walks depth-first, lists only files, and skips the README housekeeping is caller-side', () => {
  const root = makeCatalog({
    'skills/s/SKILL.md': 'x',
    'skills/s/nested/deep/f.txt': 'y',
  });
  try {
    const files = listSkillFiles(root, 'skills/s');
    assert.deepEqual([...files].sort(), ['skills/s/SKILL.md', 'skills/s/nested/deep/f.txt']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('buildItem includes files for skills and omits them for single-file types', () => {
  const skillItem = buildItem({
    folder: 'skills', type: 'skill', slug: 'multi', path: 'skills/multi/SKILL.md',
    frontmatter: { name: 'multi', description: 'd', tags: ['x'] }, body: 'b',
    files: ['skills/multi/SKILL.md', 'skills/multi/a.md'],
  });
  assert.deepEqual(skillItem.files, ['skills/multi/SKILL.md', 'skills/multi/a.md']);

  const loopItem = buildItem({
    folder: 'loops', type: 'loop', slug: 'x', path: 'loops/x.md',
    frontmatter: { name: 'X', description: 'd', tags: ['a'] }, body: '',
    files: ['loops/x.md'], // present on the entry but a non-skill type must not publish it
  });
  assert.equal('files' in loopItem, false);
});

test('validateCatalog flags a binary file in a skill folder (skills are text-only)', () => {
  const skill = ['---', 'name: my-skill', 'description: "Use when x."', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'body'].join('\n');
  const root = makeCatalog({ 'skills/my-skill/SKILL.md': skill });
  try {
    // A PNG-signature file with a NUL byte — the plugin's text fetch would corrupt it.
    writeFileSync(join(root, 'skills/my-skill/logo.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0x0a]));
    const { errors } = validateCatalog(root);
    assert.ok(has(errors, /logo\.png.*binary.*text-only/), `expected binary error, got: ${errors.join('; ')}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('validateCatalog flags a NUL-free but invalid-UTF-8 skill file (strict text-only)', () => {
  const skill = ['---', 'name: my-skill', 'description: "Use when x."', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'body'].join('\n');
  const root = makeCatalog({ 'skills/my-skill/SKILL.md': skill });
  try {
    // JPEG signature bytes: no NUL (so the NUL heuristic passes), but 0xff is not a
    // valid UTF-8 start byte, so a strict decode rejects it.
    writeFileSync(join(root, 'skills/my-skill/photo.dat'), Buffer.from([0xff, 0xd8, 0xff, 0xe0]));
    const { errors } = validateCatalog(root);
    assert.ok(has(errors, /photo\.dat.*UTF-8.*text-only/), `expected UTF-8 error, got: ${errors.join('; ')}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('validateCatalog errors on a skill folder with a mis-cased/missing SKILL.md', () => {
  const body = ['---', 'name: broken', 'description: d', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'x'].join('\n');
  const { errors } = validateFixture({ 'skills/broken/skill.md': body }); // lowercase
  assert.ok(has(errors, /skills\/broken\/: missing SKILL\.md/));
});

test('validateCatalog requires a skill name to equal its folder exactly (not slugified)', () => {
  const displayNameSkill = [
    '---', 'name: "My Skill"', 'description: "d"', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'x',
  ].join('\n');
  const { errors } = validateFixture({ 'skills/my-skill/SKILL.md': displayNameSkill });
  assert.ok(has(errors, /must equal the folder name "my-skill" exactly/));
});

test('validateCatalog rejects a markdown skill file placed directly under skills/', () => {
  const body = ['---', 'name: my-skill', 'description: d', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'x'].join('\n');
  const { errors } = validateFixture({ 'skills/my-skill.md': body });
  assert.ok(has(errors, /skills\/my-skill\.md: a skill must live in a folder/));
});

test('validateCatalog flags an item placed in a subdirectory of a flat-file folder', () => {
  const { errors } = validateFixture({ 'loops/nested/ticket-to-pr-ready.md': validLoop });
  assert.ok(has(errors, /loops\/nested\/: unexpected subdirectory/));
});

test('validateCatalog flags non-.md extensions (.MD, .markdown) that would be ignored', () => {
  const agent = [
    '---', 'type: specorator-agent', 'name: "Planner"', 'description: "d"',
    'roles: ["worker"]', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'Prompt.',
  ].join('\n');
  const misCased = validateFixture({ 'agents/planner.MD': agent });
  assert.ok(has(misCased.errors, /agents\/planner\.MD: unexpected file/));
  const wrongExt = validateFixture({ 'loops/foo.markdown': validLoop });
  assert.ok(has(wrongExt.errors, /loops\/foo\.markdown: unexpected file/));
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

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
  resolvePackage,
  findYamlScalarHazards,
  parseFrontmatterStrict,
  findParserDivergence,
  splitFlowElements,
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

test('splitFlowElements splits on top-level commas only (quoted commas belong to their element)', () => {
  assert.deepEqual(splitFlowElements('a, b'), ['a', ' b']);
  assert.deepEqual(splitFlowElements('"what, why", other'), ['"what, why"', ' other']);
  assert.deepEqual(splitFlowElements("'a, b'"), ["'a, b'"]);
  assert.deepEqual(splitFlowElements('"esc \\" quote, x", y'), ['"esc \\" quote, x"', ' y']);
  assert.deepEqual(splitFlowElements('a'), ['a']);
});

test('parseScalarOrArray keeps a quoted comma inside its element', () => {
  // Splitting on every comma published ["\"what", "why\"", "other"] to index.json.
  assert.deepEqual(parseScalarOrArray('["what, why", other]'), ['what, why', 'other']);
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

test('findYamlScalarHazards flags plain scalars a real YAML parser would reject', () => {
  // The shape that shipped broken: a description whose second sentence starts
  // "Produces a SOW: deliverables, …". Lenient here, fatal in a real YAML parser.
  const colon = findYamlScalarHazards('description: Use when … Produces a SOW: deliverables, terms.');
  assert.equal(colon.length, 1);
  assert.match(colon[0], /`description` is an unquoted value containing ": "/);
  // Same value, quoted → fine.
  assert.deepEqual(findYamlScalarHazards('description: "Produces a SOW: deliverables."'), []);
  // A block-sequence entry is checked too.
  assert.ok(has(findYamlScalarHazards(['requires:', '  - a: b'].join('\n')), /`requires`/));
  // A plain scalar opening on a YAML indicator is not the string it looks like.
  assert.ok(has(findYamlScalarHazards('icon: *alias'), /starting with the YAML indicator "\*"/));
  // `- ` and `? ` open a sequence entry / complex key: "sequence entries are not
  // allowed here" and "mapping keys are not allowed here" from a real parser.
  assert.ok(has(findYamlScalarHazards('description: - draft'), /YAML indicator "-"/));
  assert.ok(has(findYamlScalarHazards('description: ? draft'), /YAML indicator "\?"/));
  // …only as indicators, though: no whitespace after means an ordinary string.
  assert.deepEqual(findYamlScalarHazards('description: -draft'), []);
  assert.deepEqual(findYamlScalarHazards('priority: 1 - high'), []);
});

test('findYamlScalarHazards checks inline-array elements, not just the outer brackets', () => {
  // `[a: b]` is a list of one MAPPING to a real YAML parser, while this repo's
  // reader yields the string "a: b" — matching brackets prove nothing.
  assert.ok(has(findYamlScalarHazards('tags: [a: b]'), /`tags\[0\]`.*containing ": "/));
  // `[a: b: c]` does not parse at all ("while parsing a flow sequence").
  assert.ok(has(findYamlScalarHazards('tags: [a: b: c]'), /`tags\[0\]`/));
  // Only the offending element is named.
  assert.deepEqual(findYamlScalarHazards('tags: ["ok", "also: ok", plain]'), []);
  assert.equal(findYamlScalarHazards('tags: ["ok", bad: element]').length, 1);
  // An unterminated flow array is still caught by the opener rule.
  assert.ok(has(findYamlScalarHazards('tags: [a, b'), /YAML indicator "\["/));
});

test('findYamlScalarHazards accepts the plain scalars this catalog legitimately uses', () => {
  assert.deepEqual(
    findYamlScalarHazards(
      [
        '# a leading comment',
        'name: project-charter',
        'description: Use when … — writing a charter (PID), or reviewing one.',
        'source: https://example.com/a:b',       // `:` not followed by a space
        'priority: 1 - high',
        'tags: ["a", "b"]',
        'color: "var(--color-blue)"',
        'roles:',
        '  - worker',
        '  - verifier',
        'version: 1',
        'requires:   # a package',
        '  - skills/raid-log',
      ].join('\n'),
    ),
    [],
  );
});

test('parseFrontmatterStrict reports what a real YAML parser makes of the frontmatter', () => {
  // The shape that shipped broken in skills/statement-of-work.
  const broken = parseFrontmatterStrict('name: statement-of-work\ndescription: Produces a SOW: deliverables.');
  assert.match(broken.error, /Nested mappings are not allowed.*line 2, column 14/);
  assert.equal(broken.frontmatter, undefined);
  // Malformed quoting — invisible to any heuristic over the raw text.
  assert.match(parseFrontmatterStrict('description: "unterminated').error, /Missing closing "quote/);
  assert.match(parseFrontmatterStrict('description: "ok" trailing').error, /Unexpected scalar/);
  // Quoted: parses, and to the same string the lenient reader yields.
  const fixed = parseFrontmatterStrict('description: "Produces a SOW: deliverables."');
  assert.equal(fixed.error, undefined);
  assert.equal(fixed.frontmatter.description, 'Produces a SOW: deliverables.');
  // Duplicate keys are silently last-wins in the lenient reader; a real parser refuses.
  assert.match(parseFrontmatterStrict('name: a\nname: b').error, /keys must be unique/i);
  // Frontmatter that is not a mapping at all.
  assert.match(parseFrontmatterStrict('- a\n- b').error, /sequence, not a mapping/);
  assert.deepEqual(parseFrontmatterStrict('').frontmatter, {});
});

test('findParserDivergence flags values the two readers disagree about', () => {
  // Valid YAML both ways, but a one-pair mapping there and a string here.
  const raw = 'tags: [a: b]';
  const { frontmatter: lenient } = parseFrontmatter(`---\n${raw}\n---\n`);
  const { frontmatter: strict } = parseFrontmatterStrict(raw);
  assert.deepEqual(lenient.tags, ['a: b']);
  assert.deepEqual(strict.tags, [{ a: 'b' }]);
  assert.ok(has(findParserDivergence(lenient, strict), /`tags` reads as \["a: b"\] here but \[\{"a":"b"\}\] in a real YAML parser/));
  // A bare `key:` is '' here and null there — the same "empty" to this catalog.
  assert.deepEqual(findParserDivergence({ description: '' }, { description: null }), []);
  assert.deepEqual(findParserDivergence({ version: 1 }, { version: 1 }), []);
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

test('validateCatalog rejects an unquoted description containing ": " (parses here, fails in a real YAML parser)', () => {
  const colonDescription = validLoop.replace(
    'description: "d"',
    'description: Ticket to PR: branch, commit, open.',
  );
  const { errors } = validateFixture({ 'loops/ticket-to-pr-ready.md': colonDescription });
  // The real parser is the gate …
  assert.ok(has(errors, /frontmatter is not valid YAML: Nested mappings are not allowed/));
  // … and the hint names the key to quote, which the parser's line/column does not.
  assert.ok(has(errors, /`description` is an unquoted value containing ": "/));
});

test('validateCatalog rejects frontmatter the lenient reader and a real parser read differently', () => {
  // Valid YAML, so no parse error — but `[a: b]` is a mapping there and a string
  // here, which would publish an index.json entry no consumer ever sees.
  const flowMapping = validLoop.replace('tags: ["x"]', 'tags: [a: b]');
  const { errors } = validateFixture({ 'loops/ticket-to-pr-ready.md': flowMapping });
  assert.ok(has(errors, /`tags` reads as .* here but .* in a real YAML parser/));
});

test('validateCatalog rejects duplicate keys (silently last-wins in the lenient reader)', () => {
  const duplicated = validLoop.replace('license: MIT', 'license: MIT\nlicense: GPL-3.0');
  const { errors } = validateFixture({ 'loops/ticket-to-pr-ready.md': duplicated });
  assert.ok(has(errors, /frontmatter is not valid YAML: .*unique/i));
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

test("listSkillFiles excludes the skill's own scripts/tests suite but keeps shipped template tests", () => {
  const root = makeCatalog({
    'skills/s/SKILL.md': 'x',
    'skills/s/scripts/setup.mjs': 'code',
    'skills/s/scripts/tests/setup.test.js': 'dev-only', // skill's own suite → not distributed
    'skills/s/scripts/tests/helpers.js': 'dev-only', // support file in the suite → not distributed
    'skills/s/scripts/templates/app/tests/x.test.ts.tmpl': 'scaffolding', // shipped in the skill
  });
  try {
    const files = listSkillFiles(root, 'skills/s');
    assert.deepEqual([...files].sort(), [
      'skills/s/SKILL.md',
      'skills/s/scripts/setup.mjs',
      'skills/s/scripts/templates/app/tests/x.test.ts.tmpl',
    ]);
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

// --- packages (`requires`) ---------------------------------------------------

/** An agent fixture whose `requires` block is supplied by the caller. */
const agentWith = (requires) =>
  [
    '---',
    'type: specorator-agent',
    'name: "Project Manager"',
    'description: "d"',
    'icon: "clipboard-list"',
    'color: "var(--color-blue)"',
    'initials: "PM"',
    'roles: ["worker"]',
    'tags: ["x"]',
    ...requires,
    'author: "A"',
    'license: MIT',
    '---',
    '',
    'Prompt.',
  ].join('\n');

const skillNamed = (name) =>
  ['---', `name: ${name}`, 'description: "Use when x."', 'tags: ["x"]', 'author: A', 'license: MIT', '---', '', 'body'].join('\n');

test('buildItem publishes `requires` so the plugin can install a package', () => {
  const root = makeCatalog({
    'agents/project-manager.md': agentWith(['requires:', '  - skills/project-brief']),
    'skills/project-brief/SKILL.md': skillNamed('project-brief'),
  });
  try {
    const items = collectItems(root);
    const agent = items.find((i) => i.id === 'agents/project-manager');
    assert.deepEqual(agent.requires, ['skills/project-brief']);
    // Absent on an item that declares none — never published as an empty array.
    assert.equal('requires' in items.find((i) => i.id === 'skills/project-brief'), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('validateCatalog accepts an agent requiring skills that exist', () => {
  const { errors, warnings } = validateFixture({
    'agents/project-manager.md': agentWith(['requires: ["skills/project-brief", "skills/raid-log"]']),
    'skills/project-brief/SKILL.md': skillNamed('project-brief'),
    'skills/raid-log/SKILL.md': skillNamed('raid-log'),
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
});

test('validateCatalog flags a dependency that is not in the catalog', () => {
  const { errors } = validateFixture({
    'agents/project-manager.md': agentWith(['requires: ["skills/absent"]']),
  });
  assert.ok(has(errors, /names "skills\/absent", which is not in this catalog/));
});

test('validateCatalog flags a malformed, self-referencing, or duplicated dependency', () => {
  const { errors } = validateFixture({
    'agents/project-manager.md': agentWith([
      'requires: ["../etc/passwd", "agents/project-manager", "skills/project-brief", "skills/project-brief"]',
    ]),
    'skills/project-brief/SKILL.md': skillNamed('project-brief'),
  });
  assert.ok(has(errors, /is not a catalog id/));
  assert.ok(has(errors, /must not list the item itself/));
  assert.ok(has(errors, /lists "skills\/project-brief" more than once/));
});

test('validateCatalog flags a dependency cycle', () => {
  const { errors } = validateFixture({
    'agents/one.md': agentWith(['requires: ["agents/two"]']).replace('Project Manager', 'One'),
    'agents/two.md': agentWith(['requires: ["agents/one"]']).replace('Project Manager', 'Two'),
  });
  assert.ok(has(errors, /dependency cycle/));
});

test('resolvePackage orders dependencies before dependents and reports cycles', () => {
  const graph = new Map([
    ['agents/pm', ['skills/brief', 'skills/raid']],
    ['skills/brief', ['skills/shared']],
    ['skills/raid', ['skills/shared']],
    ['skills/shared', []],
  ]);
  const { order } = resolvePackage('agents/pm', graph);
  assert.deepEqual(order, ['skills/shared', 'skills/brief', 'skills/raid', 'agents/pm']);

  const cyclic = new Map([['a/one', ['a/two']], ['a/two', ['a/one']]]);
  assert.deepEqual(resolvePackage('a/one', cyclic).cycle, ['a/one', 'a/two', 'a/one']);
});

test('resolvePackage handles a chain far deeper than the call stack', () => {
  // A recursive walk overflows here. Validation must fail a bad submission with a
  // real error, not a RangeError from the validator itself.
  const graph = new Map();
  const N = 20000;
  for (let i = 0; i < N; i += 1) graph.set(`s/i${i}`, i + 1 < N ? [`s/i${i + 1}`] : []);
  const { order, cycle } = resolvePackage('s/i0', graph);
  assert.equal(cycle, undefined);
  assert.equal(order.length, N);
  assert.equal(order[0], `s/i${N - 1}`); // deepest dependency emitted first
  assert.equal(order[order.length - 1], 's/i0');
});

test('resolvePackage detects a cycle reached through a shared dependency', () => {
  const graph = new Map([
    ['a/root', ['a/one', 'a/two']],
    ['a/one', ['a/shared']],
    ['a/two', ['a/shared']],
    ['a/shared', ['a/two']],
  ]);
  // Reported from where the loop actually closes: the walk reaches `shared` via
  // `one`, descends into `two`, and comes back to `shared`.
  assert.deepEqual(resolvePackage('a/root', graph).cycle, ['a/shared', 'a/two', 'a/shared']);
});

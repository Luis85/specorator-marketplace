// scripts/tests/check-loc.test.js
//
// Runtime behavior of the GENERATED scripts/check-loc.mjs (rendered from
// check-loc.mjs.tmpl by planLoc). The walker is templated code with no export, so
// it's exercised the way it ships: rendered to disk and run as a subprocess.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { planLoc } from '../lib/harness.mjs';
import { tmpProject } from './helpers.js';

// Render the generated check-loc.mjs (src/ scan root) into <dir>/scripts and
// return its path. The script writes its baseline to scripts/loc-baseline.json,
// so scripts/ must exist.
function renderCheckLoc(dir) {
  const content = planLoc({ guardrails: { locGuard: true } }, { entry: 'src/index.ts' })
    .find((a) => a.path === 'scripts/check-loc.mjs').content;
  mkdirSync(join(dir, 'scripts'), { recursive: true });
  const path = join(dir, 'scripts', 'check-loc.mjs');
  writeFileSync(path, content);
  return path;
}

test('generated check-loc walker terminates on a self-referential dir symlink (no ELOOP)', () => {
  const p = tmpProject({ 'src/index.ts': 'export const x = 1;\n', 'package.json': { name: 'loc-symlink' } });
  try {
    // A directory symlink pointing back at its parent makes a statSync-following
    // walker recurse the same tree until the kernel throws ELOOP. Initial apply runs
    // this with --update, so such a repo can't finish setup. Skip where symlinks
    // aren't creatable (e.g. unprivileged Windows) rather than fail spuriously.
    try {
      symlinkSync(join(p.dir, 'src'), join(p.dir, 'src', 'loop'), 'dir');
    } catch {
      return;
    }
    const script = renderCheckLoc(p.dir);
    // execFileSync throws on a non-zero exit, so a clean run == the walker skipped the
    // symlink instead of crashing on ELOOP.
    assert.doesNotThrow(() =>
      execFileSync('node', [script, '--update'], { cwd: p.dir, stdio: 'ignore', timeout: 20_000 }),
    );
  } finally {
    p.cleanup();
  }
});

test('generated check-loc walker still recurses real subdirectories', () => {
  // Guards the withFileTypes refactor: a normal nested dir must still be walked and
  // an oversized file banked into the baseline by --update.
  const big = 'x\n'.repeat(600); // 600 non-blank lines > MAX_LOC 500
  const p = tmpProject({ 'src/index.ts': 'export const x = 1;\n', 'src/deep/huge.ts': big, 'package.json': { name: 'loc-recurse' } });
  try {
    const script = renderCheckLoc(p.dir);
    execFileSync('node', [script, '--update'], { cwd: p.dir, stdio: 'ignore', timeout: 20_000 });
    const baseline = JSON.parse(readFileSync(join(p.dir, 'scripts', 'loc-baseline.json'), 'utf8'));
    assert.equal(baseline.files['src/deep/huge.ts'], 600); // nested oversized file was found
  } finally {
    p.cleanup();
  }
});

test('generated check-loc walker counts an acyclic symlinked source file (only cycles/broken links are skipped)', () => {
  // A symlinked SOURCE FILE under the scan root is real source the build/test tooling
  // consumes, so the LOC guard must still count it — skipping ALL symlinks would let an
  // oversized src/shared.ts slip the guard entirely. Only cyclic dir links / broken
  // links are dropped.
  const big = 'x\n'.repeat(600); // 600 non-blank lines > MAX_LOC 500
  const p = tmpProject({ 'src/index.ts': 'export const x = 1;\n', 'vendored/big.ts': big, 'package.json': { name: 'loc-filelink' } });
  try {
    try {
      symlinkSync(join(p.dir, 'vendored', 'big.ts'), join(p.dir, 'src', 'shared.ts'), 'file');
    } catch {
      return; // symlinks unsupported here
    }
    const script = renderCheckLoc(p.dir);
    execFileSync('node', [script, '--update'], { cwd: p.dir, stdio: 'ignore', timeout: 20_000 });
    const baseline = JSON.parse(readFileSync(join(p.dir, 'scripts', 'loc-baseline.json'), 'utf8'));
    assert.equal(baseline.files['src/shared.ts'], 600); // the symlinked source was counted
  } finally {
    p.cleanup();
  }
});

test('generated check-loc walker records BOTH a real dir and its alias (order-independent baseline)', () => {
  // src/real/ is real; src/alias -> src/real. A GLOBAL visited set records the file
  // under whichever path readdirSync hits first and SUPPRESSES the other, so a different
  // enumeration order — or deleting the alias — then makes the unchanged src/real/huge.ts
  // read as a new oversized file. An active recursion-stack scans both, so both paths are
  // in the baseline regardless of order (before the fix, exactly one is — so asserting
  // BOTH is a stable red).
  const big = 'x\n'.repeat(600);
  const p = tmpProject({ 'src/index.ts': 'export const x = 1;\n', 'src/real/huge.ts': big, 'package.json': { name: 'loc-alias' } });
  try {
    try {
      symlinkSync(join(p.dir, 'src', 'real'), join(p.dir, 'src', 'alias'), 'dir'); // src/alias -> src/real
    } catch {
      return; // symlinks unsupported here
    }
    const script = renderCheckLoc(p.dir);
    execFileSync('node', [script, '--update'], { cwd: p.dir, stdio: 'ignore', timeout: 20_000 });
    const files = JSON.parse(readFileSync(join(p.dir, 'scripts', 'loc-baseline.json'), 'utf8')).files;
    assert.equal(files['src/real/huge.ts'], 600); // the REAL path is always recorded...
    assert.equal(files['src/alias/huge.ts'], 600); // ...as is the alias; neither is suppressed by enum order
  } finally {
    p.cleanup();
  }
});

test('generated check-loc walker does not climb out of the source root via an ancestor symlink', () => {
  // A link to an ancestor (src/up -> the repo root) resolves to a dir that CONTAINS src;
  // descending it would climb above the source root and bank siblings-of-src into the
  // LOC baseline (e.g. sibling/huge.ts under a src/up/... path).
  const big = 'x\n'.repeat(600);
  const p = tmpProject({ 'src/index.ts': 'export const x = 1;\n', 'sibling/huge.ts': big, 'package.json': { name: 'loc-ancestor' } });
  try {
    try {
      symlinkSync(p.dir, join(p.dir, 'src', 'up'), 'dir'); // src/up -> <repo root>
    } catch {
      return; // symlinks unsupported here
    }
    const script = renderCheckLoc(p.dir);
    assert.doesNotThrow(() =>
      execFileSync('node', [script, '--update'], { cwd: p.dir, stdio: 'ignore', timeout: 20_000 }),
    );
    const keys = Object.keys(JSON.parse(readFileSync(join(p.dir, 'scripts', 'loc-baseline.json'), 'utf8')).files);
    assert.ok(!keys.some((k) => k.includes('huge.ts')), `sibling file leaked into the LOC baseline: ${keys.join(', ')}`);
    assert.ok(!keys.some((k) => k.includes('up/')), `walker descended through the ancestor link: ${keys.join(', ')}`);
  } finally {
    p.cleanup();
  }
});

test('generated check-loc ancestor guard compares `..` path segments, not a string prefix', () => {
  // A source dir literally named `..src` (entryDir allows it — it isn't exactly `..`):
  // relative(<root>, <root>/..src) === "..src", which a naive startsWith("..") mistakes
  // for parent traversal, so an ancestor link ..src/up -> <root> is NOT rejected and the
  // walker climbs out and banks siblings (..src/up/sibling/huge.ts) into the baseline.
  const big = 'x\n'.repeat(600);
  const p = tmpProject({ '..src/index.ts': 'export const x = 1;\n', 'sibling/huge.ts': big, 'package.json': { name: 'loc-dotdot', source: '..src/index.ts' } });
  try {
    try {
      symlinkSync(p.dir, join(p.dir, '..src', 'up'), 'dir'); // ..src/up -> <repo root>
    } catch {
      return; // symlinks unsupported here
    }
    // Render check-loc for the `..src` scan root (planLoc sanitizes the entry to that dir).
    const content = planLoc({ guardrails: { locGuard: true } }, { entry: '..src/index.ts' }).find((a) => a.path === 'scripts/check-loc.mjs').content;
    mkdirSync(join(p.dir, 'scripts'), { recursive: true });
    const script = join(p.dir, 'scripts', 'check-loc.mjs');
    writeFileSync(script, content);
    assert.doesNotThrow(() =>
      execFileSync('node', [script, '--update'], { cwd: p.dir, stdio: 'ignore', timeout: 20_000 }),
    );
    const keys = Object.keys(JSON.parse(readFileSync(join(p.dir, 'scripts', 'loc-baseline.json'), 'utf8')).files);
    assert.ok(!keys.some((k) => k.includes('huge.ts')), `sibling leaked via a ..src ancestor link: ${keys.join(', ')}`);
  } finally {
    p.cleanup();
  }
});

test('generated check-loc walker skips a broken symlink without throwing', () => {
  const p = tmpProject({ 'src/index.ts': 'export const x = 1;\n', 'package.json': { name: 'loc-broken' } });
  try {
    try {
      symlinkSync(join(p.dir, 'src', 'nonexistent.ts'), join(p.dir, 'src', 'dangling.ts'), 'file');
    } catch {
      return; // symlinks unsupported here
    }
    const script = renderCheckLoc(p.dir);
    assert.doesNotThrow(() =>
      execFileSync('node', [script, '--update'], { cwd: p.dir, stdio: 'ignore', timeout: 20_000 }),
    );
    const baseline = JSON.parse(readFileSync(join(p.dir, 'scripts', 'loc-baseline.json'), 'utf8'));
    assert.equal('src/dangling.ts' in baseline.files, false); // a dangling link is not counted (or crashed)
  } finally {
    p.cleanup();
  }
});

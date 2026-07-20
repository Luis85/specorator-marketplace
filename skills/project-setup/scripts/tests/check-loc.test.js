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

// scripts/tests/baseline.test.js
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { initBaselines } from '../lib/baseline.mjs';
import { tmpProject } from './helpers.js';

test('initBaselines removes a stale coverage dir BEFORE the fallow baseline', () => {
  // A leftover ./coverage would make fallow snapshot coverage-weighted CRAP.
  const p = tmpProject({ 'package.json': { name: 'x' }, 'coverage/coverage-summary.json': '{}' });
  try {
    initBaselines(p.dir, { guardrails: { fallowRatchet: true } }, () => {});
    assert.equal(existsSync(join(p.dir, 'coverage')), false);
  } finally {
    p.cleanup();
  }
});

test('initBaselines updates fallow + LOC before coverage, only for enabled guardrails', () => {
  const p = tmpProject({ 'package.json': { name: 'x' } });
  const order = [];
  const exec = (cmd, args) => order.push(`${cmd} ${args.join(' ')}`);
  try {
    initBaselines(p.dir, { guardrails: { fallowRatchet: true, locGuard: true, coverageFloors: false } }, exec);
    // Run the generated FILE directly (not the npm script a brownfield repo may shadow).
    assert.deepEqual(order, [
      'node scripts/check-quality.mjs --update',
      'node scripts/check-loc.mjs --update',
    ]);
  } finally {
    p.cleanup();
  }
});

test('initBaselines runs the ratchet via `yarn node` for Yarn (carries the PnP loader)', () => {
  const p = tmpProject({ 'package.json': { name: 'x' } });
  const order = [];
  try {
    initBaselines(p.dir, { packageManager: 'yarn', guardrails: { fallowRatchet: true, locGuard: false, coverageFloors: false } },
      (cmd, args) => order.push(`${cmd} ${args.join(' ')}`));
    assert.deepEqual(order, ['yarn node scripts/check-quality.mjs --update']);
  } finally {
    p.cleanup();
  }
});

test('initBaselines does NOT re-baseline a guardrail that already has its baseline', () => {
  // Re-apply on an already-adopted repo must not reset the ratchets (which would
  // silently bless regressions accumulated since adoption).
  const p = tmpProject({
    'package.json': { name: 'x' },
    'scripts/quality-baseline.json': '{"metrics":{}}',
    'scripts/loc-baseline.json': '{"files":{}}',
  });
  const order = [];
  try {
    initBaselines(p.dir, { guardrails: { fallowRatchet: true, locGuard: true, coverageFloors: false } },
      (cmd, args) => order.push(`${cmd} ${args.join(' ')}`));
    assert.deepEqual(order, []); // both already baselined -> nothing re-run
  } finally {
    p.cleanup();
  }
});

test('initBaselines re-baselines quality when .fallowrc.json was upgraded (analysis graph changed)', () => {
  // A generic->Obsidian conversion swaps the fallow config; the old baseline
  // measured a different graph, so re-measure even though the file exists.
  const p = tmpProject({
    'package.json': { name: 'x' },
    'scripts/quality-baseline.json': '{"metrics":{}}',
    'scripts/loc-baseline.json': '{"files":{}}',
  });
  const order = [];
  try {
    initBaselines(
      p.dir,
      { guardrails: { fallowRatchet: true, locGuard: true, coverageFloors: false } },
      (cmd, args) => order.push(`${cmd} ${args.join(' ')}`),
      ['.fallowrc.json', '.github/workflows/ci.yml'], // apply()'s changed list
    );
    // Quality re-runs (config changed); LOC does NOT (its baseline is untouched).
    assert.deepEqual(order, ['node scripts/check-quality.mjs --update']);
  } finally {
    p.cleanup();
  }
});

test('initBaselines does NOT re-baseline quality when .fallowrc.json was unchanged (converged re-apply)', () => {
  const p = tmpProject({
    'package.json': { name: 'x' },
    'scripts/quality-baseline.json': '{"metrics":{}}',
  });
  const order = [];
  try {
    initBaselines(
      p.dir,
      { guardrails: { fallowRatchet: true, coverageFloors: false } },
      (cmd, args) => order.push(`${cmd} ${args.join(' ')}`),
      ['CLAUDE.md'], // an unrelated change; fallowrc not in the list
    );
    assert.deepEqual(order, []); // ratchet preserved
  } finally {
    p.cleanup();
  }
});

test('initBaselines skips coverage when already baselined (marker present, even a 0% floor)', () => {
  const p = tmpProject({
    'package.json': { name: 'x' },
    'scripts/.coverage-baselined': '',
  });
  const order = [];
  try {
    initBaselines(p.dir, { testFramework: 'jest', guardrails: { coverageFloors: true } },
      (cmd, args) => order.push(`${cmd} ${args.join(' ')}`));
    assert.deepEqual(order, []); // marker present -> no re-measure (no auto-raise)
  } finally {
    p.cleanup();
  }
});

test('coverage baseline runs last and is skipped when the guardrail is off', () => {
  const p = tmpProject({ 'package.json': { name: 'x' } });
  const order = [];
  try {
    initBaselines(p.dir, { testFramework: 'jest', guardrails: { coverageFloors: true } },
      (cmd, args) => order.push(`${cmd} ${args.join(' ')}`));
    assert.equal(order[order.length - 1], 'npm run test:coverage');
  } finally {
    p.cleanup();
  }
});

test('initBaselines does NOT mark baselined when test:coverage produced no summary (retryable)', () => {
  // A brownfield `test:coverage` that emits no coverage-summary.json leaves the floor
  // unestablished; writing the marker would freeze it at zero and block a corrected
  // re-baseline later — so the marker must stay absent (no jest config / no summary).
  const p = tmpProject({ 'package.json': { name: 'x' } });
  try {
    initBaselines(p.dir, { testFramework: 'jest', guardrails: { coverageFloors: true } }, () => {});
    assert.equal(existsSync(join(p.dir, 'scripts', '.coverage-baselined')), false);
  } finally {
    p.cleanup();
  }
});

test('initBaselines marks baselined when a floor is actually applied', () => {
  // A marked jest config plus a summary the runner produces -> applyCoverageFloor
  // establishes a floor (updated) -> the marker IS written so later applies converge.
  const jestConfig = [
    '// Generated by project-setup',
    'export default { coverageThreshold: { global: { statements: 0, branches: 0, functions: 0, lines: 0 } } };',
  ].join('\n');
  const p = tmpProject({ 'package.json': { name: 'x' }, 'jest.config.mjs': jestConfig });
  // The engine deletes ./coverage before running test:coverage, so the mock stands in
  // for the runner and writes the summary applyCoverageFloor then reads.
  const exec = (cmd, args) => {
    if (args.includes('test:coverage')) {
      p.write('coverage/coverage-summary.json', {
        total: { statements: { pct: 80 }, branches: { pct: 70 }, functions: { pct: 90 }, lines: { pct: 85 } },
      });
    }
  };
  try {
    initBaselines(p.dir, { testFramework: 'jest', guardrails: { coverageFloors: true } }, exec);
    assert.equal(existsSync(join(p.dir, 'scripts', '.coverage-baselined')), true);
  } finally {
    p.cleanup();
  }
});

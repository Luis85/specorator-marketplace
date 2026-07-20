---
title: project-setup skill — follow-up backlog
date: 2026-07-20
status: in-progress
scope: skills/project-setup
---

# project-setup skill — follow-up backlog

Edge cases surfaced in review of the skill's setup scripts, deferred at the time
and now being worked one by one. Each has a regression test in the co-located
suite (`skills/project-setup/scripts/tests/`), which the catalog's `npm test`
gates. The skill's canonical home is this repo (the plugin-repo copy was removed),
so fixes land here.

- [ ] **1. `options.mjs` / `harness.mjs` — validate and freeze `testFramework`.**
  An unsupported value (e.g. `mocha`) survives `loadOptions` and later throws in
  `applyCoverageFloor` (`CONFIG[framework]` undefined) after files/deps are
  already mutated. Separately, changing the framework after the first apply
  (jest→vitest) lets the new value through while `planTest` (non-forced merge)
  keeps the old scripts, `planEslint` keeps the old config via `skip-if-exists`,
  and the coverage marker blocks a new floor — so report/deps/docs switch but
  verification still runs the old runner. Fix: normalize/reject `testFramework`
  to `jest`|`vitest` up front, and freeze it after the first apply (the frozen
  value wins over a later explicit change), mirroring the structural Obsidian
  choices.

- [ ] **2. `baseline.mjs` — only mark `.coverage-baselined` when a floor was applied.**
  When `applyCoverageFloor` returns `{ updated: false }` (no summary/config) the
  marker is still written, so the floor stays at zero and later applies skip
  re-baselining forever. Fix: write the marker only when `updated === true`.

- [ ] **3. `obsidian.mjs` — don't clobber the package version on a malformed manifest.**
  When `manifest.json` exists but is malformed/versionless
  (`manifestExists: true`, `manifestVersion: null`), `planObsidian` forces
  `version` to the `0.1.0` fallback, overwriting a valid `package.json` version
  while `skip-if-exists` preserves the broken manifest. Fix: don't force the
  package version in this state — preserve the existing one.

- [ ] **4. `apply.mjs` — include the lockfile in the install-convergence check.**
  Convergence verifies the recorded manager + `node_modules`/PnP loader but not
  the lockfile, so a project that lost its lockfile while keeping `node_modules`
  reads as current and never regenerates it — and the generated CI
  (`npm ci` / `--frozen-lockfile`) then fails. Fix: require the selected
  manager's lockfile (`package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` /
  `bun.lockb`) for convergence.

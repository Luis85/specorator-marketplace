---
title: project-setup skill — follow-up backlog
date: 2026-07-20
updated: 2026-07-20
status: in-progress
scope: skills/project-setup
---

# project-setup skill — follow-up backlog

Edge cases surfaced in review of the skill's setup scripts. The skill's canonical
home is this repo (the plugin-repo copy was removed), so fixes land here. Every
**closed** item has a regression test in the co-located suite
(`skills/project-setup/scripts/tests/`), which the catalog's `npm test` gates; every
**open** item names its file/line, the review it came from, and the fix + test to add
when it's worked.

All of these are reachable only when the skill **runs against a target project** — they
don't touch catalog publishing or the marketplace install path. They're scaffolding-tool
robustness, tracked here for a dedicated skill-hardening pass rather than expanded into
the catalog PR that publishes the skill.

## Closed

- [x] **1. `options.mjs` — validate and freeze `testFramework`.**
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

- [x] **2. `baseline.mjs` — only mark `.coverage-baselined` when a floor was applied.**
  When `applyCoverageFloor` returns `{ updated: false }` (no summary/config, or the
  threshold anchor is missing) the marker was still written, so the floor stayed at
  zero and later applies skipped re-baselining forever. Fix: write the marker only
  when a floor was actually applied (or confirmed already present), so restoring the
  script/anchor later re-baselines.

- [x] **3. `obsidian.mjs` — don't clobber the package version on a malformed manifest.**
  When `manifest.json` exists but is malformed/versionless
  (`manifestExists: true`, `manifestVersion: null`), `planObsidian` forced
  `version` to the `0.1.0` fallback, overwriting a valid `package.json` version
  while `skip-if-exists` preserved the broken manifest. Fix: don't force the
  package version in this state — preserve the existing one.

- [x] **4. `apply.mjs` — include the lockfile in the install-convergence check.**
  Convergence verified the recorded manager + `node_modules`/PnP loader but not
  the lockfile, so a project that lost its lockfile while keeping `node_modules`
  read as current and never regenerated it — and the generated CI
  (`npm ci` / `--frozen-lockfile`) then failed. Fix: require the selected
  manager's lockfile (`package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` /
  `bun.lockb`) for convergence.

- [x] **5. `options.mjs` — freeze `typescript` mode after the first apply.** (sibling of item 1)
  A JS→TS or TS→JS change after the first apply let the new answer through while the
  `skip-if-exists` Jest/ESLint configs kept the previous mode's setup (a TS switch
  without `ts-jest` / the TS ESLint preset, or vice versa) — so the test/lint gate
  could run the wrong toolchain even though the report recorded the new mode. Fix:
  freeze `typescript` like `testFramework` (the first-apply value wins over a later
  explicit change).

## Open — gaps to close

- [ ] **6. `detect.mjs` — detect TypeScript from the source entry.**
  `detect()` sets `typescript` from a `typescript` dep or a `tsconfig.json` only. A
  project whose entry is already `src/index.ts` but that hasn't added either reports
  `typescript: false`, which is then **frozen** on the first apply (item 5) — so the
  generated Jest and ESLint configs take their JS-only paths and coverage excludes all
  `.ts` sources (TS tests fail to parse, or a testless project establishes a misleading
  0% floor over ignored product code). Fix: also treat a real entry with a TS-family
  extension (`.ts/.tsx/.mts/.cts`, using the existing `entry` + `entryExists`) as
  TypeScript. Test: `detect()` returns `typescript: true` for a repo with only
  `src/index.ts` and no dep/tsconfig. (`detect.mjs:170`, review `r3613860480`.)

- [ ] **7. `harness.mjs` — exclude non-source files from a root-layout coverage set.**
  When the detected entry is at the repo root (e.g. `index.js`), `coverageGlobs`
  becomes `**/*.{ext}` — every matching file in the repo. The generated exclusions
  don't drop `eslint.config.mjs`, the test-runner config, tooling dirs, or
  `.project-setup-backup`, so the initial floor measures non-product code and later
  tooling/backup changes can fail or distort the coverage gate. Fix: use a
  source-specific include set for root layouts, or add comprehensive non-source
  excludes (config/tooling/backup). Test: a root-layout harness's coverage config
  excludes `eslint.config.*`, the runner config, and `.project-setup-backup`.
  (`harness.mjs:207`, review `r3613738207`.)

- [ ] **8. `check-loc.mjs.tmpl` — skip symlinked directories in the LOC walker.**
  `walk()` uses `statSync(...).isDirectory()`, which **follows** symlinks: a directory
  symlink to an ancestor makes it recurse the same tree until Node throws `ELOOP`, and
  a broken symlink throws immediately. Because initial apply runs the generated script
  with `--update`, such a repo can't finish setup or pass `check:loc`. Fix: use
  `lstatSync`/`readdirSync(..., { withFileTypes: true })` to skip symlinked entries, or
  track visited real paths before recursing. Test: `walk()` over a tree containing a
  self-referential dir symlink terminates without throwing. (`check-loc.mjs.tmpl:21`,
  review `r3613860489`.)

## Considered — declined

- **`detect.mjs` — realpath the entry `source` before accepting it (`r3611282241`).**
  A `package.json#source` pointing through an in-project symlink to a file outside the
  repo passes `withinProject`'s lexical prefix check (`resolve()` doesn't dereference
  links). Declined: `project-setup` runs on the developer's **own** repo, so an
  in-project symlink is self-owned, not untrusted input — the containment guard exists
  to catch an accidental `../shared` misconfig, not a deliberately-planted symlink. A
  realpath check *here* would also be incomplete: the fixed-candidate entry scan and the
  fallow / `check-loc` scanners follow links without going through `withinProject`, so
  real symlink containment would mean realpath-guarding the whole scan pipeline —
  disproportionate for a self-owned-repo edge. Revisit only if the skill ever scans an
  untrusted tree.

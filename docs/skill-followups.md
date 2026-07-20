---
title: project-setup skill — follow-up backlog
date: 2026-07-20
updated: 2026-07-20
status: done
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

- [x] **6. `detect.mjs` — detect TypeScript from the source entry.**
  `detect()` set `typescript` from a `typescript` dep or a `tsconfig.json` only, so a
  project whose entry is already `src/index.ts` but that had added neither reported
  `typescript: false`, which is then **frozen** on the first apply (item 5) — so the
  generated Jest and ESLint configs took their JS-only paths and coverage excluded all
  `.ts` sources (TS tests fail to parse, or a testless project establishes a misleading
  0% floor over ignored product code). Fix: also treat a real (existing) entry with a
  TS-family extension (`.ts/.tsx/.mts/.cts`, using the existing `entry` + `entryExists`)
  as TypeScript. (`detect.mjs`, review `r3613860480`.)

- [x] **7. `harness.mjs` — exclude non-source files from a root-layout coverage set.**
  When the detected entry was at the repo root (e.g. `index.js`), `coverageGlobs`
  became `**/*.{ext}` — every matching file in the repo — and the generated exclusions
  didn't drop `eslint.config.mjs`, the jest/vitest runner config, or
  `.project-setup-backup`, so the floor measured non-product code and later
  tooling/backup changes could distort the coverage gate. Fix: for a root-layout
  coverage set, add comprehensive non-source excludes — any `*.config.*` (covers
  eslint + the runner config), the `.project-setup-backup` dir, and coverage output; a
  `src/`-scoped layout keeps these outside `src/` and needs none. (`harness.mjs`,
  review `r3613738207`.)

- [x] **8. `check-loc.mjs.tmpl` — skip symlinked directories in the LOC walker.**
  `walk()` used `statSync(...).isDirectory()`, which **follows** symlinks: a directory
  symlink to an ancestor made it recurse the same tree until Node threw `ELOOP`, and a
  broken symlink threw immediately. Because initial apply runs the generated script
  with `--update`, such a repo couldn't finish setup or pass `check:loc`. Fix: walk with
  `readdirSync(..., { withFileTypes: true })` and skip any entry whose dirent
  `isSymbolicLink()` (the dirent type isn't dereferenced, so a symlinked dir reads as a
  symlink, not a directory); the now-unused `statSync` import is dropped. (`check-loc.mjs.tmpl`,
  review `r3613860489`.)

- [x] **9. `detect.mjs` — infer the test runner from a hand-written config file.**
  `detect()` set `testFramework` from a `vitest`/`jest` dep only, so a repo whose only
  runner signal was a hand-written `vitest.config.ts` (the dep hoisted to a workspace
  root, or the config authored pre-install) reported `null`. `freezeOptions` then
  defaulted it to `jest`, and `standsDownTestConfig` — checking `jestConfig` on the jest
  path — did NOT stand down, so `planTest` wrote `jest.config.mjs` and installed
  jest/ts-jest BESIDE the user's vitest config (the day-one gate ran the wrong runner).
  The jest-config-only case worked only by luck of the `jest` default. Fix: fall back to
  the config-FILE signals (`vitestConfig`/`jestConfig`, vitest first — mirroring the dep
  precedence) when no dep is present; a dep still wins. (`detect.mjs`, surfaced by the
  skill-hardening brownfield-detection sweep.)

## Open — gaps to close

_All tracked gaps above are closed. New findings surfaced by later hardening passes are
appended here (with file, review, and the fix + test to add) before they're worked._

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

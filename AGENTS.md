Agent instructions for `babel-plugin-styled-components`, a Babel plugin (plain JavaScript) that annotates and minifies styled-components code.

Charter

- This file holds only one-line rules that prevent a recurring defect class, everyday commands, and a map of every doc. Everything else goes to a named home in this repo (README, a test, or a new `docs/<topic>.md` listed in the map). Never narration, history, backlog, drifting figures, code trivia an agent can grep, or a second copy of a fact that has a home. A misplaced line moves home in the change that finds it, leaving the rule and a pointer.

Commands

- `pnpm install --frozen-lockfile`: install (the form CI uses)
- `pnpm test`: Jest over `test/` (fixture suite and unit tests)
- `pnpm exec jest -u`: regenerate fixture outputs, only after the snapshot-drift rule below is satisfied
- `pnpm exec jest --coverage`: prints live coverage
- `pnpm build`: compile `src/` to `lib/`; run it to verify every set of changes. Don't start a dev server unless asked
- `pnpm bench [--base <ref>] [--config default|all|bare] [--rounds N] [--normalize-aliases]`: interleaved A/B of the plugin at `<ref>` (default `origin/main`) against the working tree over generated inputs; fails when outputs differ
- `pnpm bench:profile [--input small|medium|large|large-cjs]`: CPU profile with the plugin frames that drive Babel's work
- `node scripts/compat.js [--base <ref>]`: styled-components v5, v6, and v7 prerelease smoke against the working tree and `<ref>` (default `origin/main`)
- `pnpm style`: Prettier over `src/`
- `pnpm changeset`: add a release note

Map

- `README.md`: user-facing overview, requirements, highlighted options. The full option reference lives on the styled-components website
- `CHANGELOG.md`: written by changesets at release, never hand-edited
- `.changeset/`: pending release notes, one file per user-visible change
- `src/index.js`: plugin entry, wires the visitors; `src/utils/options.js`: option keys and defaults
- `src/visitors/`: one transform per file; `src/utils/detectors.js`: recognizes styled, css, keyframes, and helper call shapes; `src/minify/`: template-literal CSS minifier
- `test/fixtures/<name>/`: `code.js` (input), `.babelrc` (plugin config), and either `output.js` (expected) or `error.js` (expected throw)
- `test/minify/`: minifier unit tests
- Tracker: GitHub Issues

Rules

Release and attribution

- Never bump the version in `package.json` or publish to npm. Releases ship via changesets + GitHub Actions.
- Add a `.changeset/<slug>.md` for every user-visible change: one sentence on what users see, with a short example when it helps. `patch` for fixes, `minor` for new behavior, `major` only when the change actually breaks working consumers. Declaring an implicit peer dependency that consumers must already have in order to use the plugin (for example adding `@babel/core` as an explicit peer) is not by itself a major; tightening an existing peer range to drop currently-supported versions is.
- Never include AI attribution on commits, PRs, files, or output.

Prose and communication

- Warm, concise, situationally humorous, grounded in data. American English.
- No em-dashes. Use situationally-appropriate unicode punctuation.
- Plain words over terms of art; define jargon at first use. Lead with the recommendation or finding, reasoning after. No clincher sign-offs.
- Machine-oriented markdown (AGENTS.md, internal notes, agent instructions): dashes for lists, no headers, no bold, no tables. This file is one of those.
- Human-facing markdown (README, PR descriptions, changesets, release notes): written for a human to read. Don't include internals or point-in-time numbers or quantities that go stale (test counts, coverage percentages, dependency counts). A changeset may state the measured speedup of its own release, since release notes are frozen once published.
- Public text (PR descriptions, changesets, issues, comments) leads with user-facing impact, assumes no familiarity with the code, and is warm toward contributors.
- External communications (issues, gists, comments) never leak client names or internals. Bug reports to third parties are redacted and minimal: mechanism, symptom, minimal repro.
- Escape literal asterisks outside code blocks (process.env.\*).
- Commits follow Conventional Commits (`type(scope): subject`).

Method

- Scientific method. Form a hypothesis, hold variables constant, test one at a time, update beliefs.
- Be meticulous. Observe, note, plan, act, then reconcile work against the plan.
- A reported defect names a class. Catalog every instance by search (source, tests, fixtures, docs) and fix them all in the same change, or list the ones left and why.
- Fix at the cause. Never update a snapshot to green, swallow an error, or disable a check to hide a symptom.
- Be the gardener. Handle unobjectionable cleanup as you pass through. Sometimes substantial cuts are necessary to keep the system healthy.
- Question complexity. Propose simpler alternatives. Prefer questioning assumptions over accepting overengineering.
- Don't silently work around issues. Log them in a GitHub issue or in the PR body rather than deferring invisibly.
- Never make assumptions about information or file content you have not read in the same session. Verify against fresh sources. Training data is stale by default. Research first-party docs and current code before deciding.
- Distinguish observed (file:line, command output, exact error) from inferred.
- When a behavior, name, or value changes, grep every place that records it (README, tests, fixtures, comments, CI, this file) and update each in the same change. After deleting a module, remove the comments, docs, tests, and CI steps it left behind.

Planning

- Ask clarifying multiple-choice questions until you can restate the ask in one paragraph the maintainer agrees with.
- Present 2-3 directions with research-backed opinions, ranked with the recommendation first.
- Never give time estimates.

Code

- Source is plain JavaScript with no type checker, so read an AST node's fields only after a `@babel/types` predicate (`t.isX`) confirms its shape.
- Prettier enforces format (`.prettierrc`): no semicolons, single quotes, ES5 trailing commas, no parens around a lone arrow parameter.
- Backward compatibility applies only to public API surfaces. The plugin's public surface is the default export (a Babel plugin function), the option keys it accepts, and the runtime behavior of the code it emits. Emitted code may change shape (imports, alias names, helper output) when it behaves identically at runtime and `componentId`/`displayName` values stay stable; a shape change alone is not user-visible and needs no changeset. Internal modules in `src/utils`, `src/visitors`, and `src/minify` are rewritable when complexity warrants.
- Errors carry typed metadata for context but never leak internals to consumers. User-facing throws should use `path.buildCodeFrameError` (with a real `path`) so the error points at the offending source. The message names the problem and the fix.
- Comments explain non-obvious current behavior and are rare; never restate what the code says. Never narrate change history, reference an issue number, or describe what a future maintainer should do.
- Dry-run destructive or batch operations. Verify targeting before executing.

Testing

- Tests ship with features. Branch coverage above 90% (`pnpm exec jest --coverage`). Cover happy paths, edge cases, and failure modes. Prefer inline snapshots seeded empty. Local tests run well under 30s.
- Emitted code and minified CSS are asserted whole (a fixture `output.js`, `toBe`, or an inline snapshot), never with a regex or substring. Derive the expected value from what the code should do, never from observed output. Extend an existing suite or fixture family before creating a new one.
- Red/green TDD is required for every fix. Add or adjust the failing test before the code change, confirm it fails (red) on the unmodified surrounding code, apply the fix, then confirm it passes (green). When the test is a fixture snapshot, generate it on the pre-fix tree so the diff captures the broken output, then update on the post-fix tree. A test that only ever passes alongside the fix is not a regression test.
- Snapshot drift is suspect. When fixture `output.js` files change beyond cosmetic helper renames, isolate the cause before regenerating. Counter shifts (`componentId: "sc-<hash>-N"`) in particular signal that visit order changed; verify the new order is intentional and source-order-stable before committing.
- Fixture snapshots carry no machine paths on any OS: `error.js` holds the error message and code frame with the working directory as `<cwd>` and forward slashes (babel-test is patched in `patches/` to do this), and a test in `test/index.test.js` fails on any absolute path. CI runs on Linux and Windows; `.gitattributes` keeps checkouts LF.
- A new css-prop fixture family includes one fixture without `@babel/preset-env`: its CommonJS transform folds repeated imports into one `require`, which hides import-shape bugs.
- Avoid snapshot churn. A change rewrites only the snapshots its behavior requires, and a hand-written expected output is changed only when the expectation itself was wrong, with the reason in the commit.
- Jest `roots` is `test/`, so agent worktrees under `.claude/worktrees/` stay out of the run.

Review

- Every behavior change is checked against styled-components v5 (latest 5.x), v6 (latest 6.x), and v7 (latest prerelease dist-tag). `node scripts/compat.js` compiles smoke programs with the branch and with main, then executes the output (`renderToString` plus `ServerStyleSheet`) against each version. Generated CSS, displayName, and componentId match main except the intended change. No runtime errors.
- Module formats: the plugin loads from CJS configs (`babel.config.js`, `.babelrc`) and ESM configs (`babel.config.mjs`, a `"type": "module"` project). Input covers ESM (default, named, aliased, and namespace imports) and CJS (`require`, `require(...).default`, destructured require). Babel's modules transform is checked both ways (preset-env `modules: false` and `'commonjs'`). Transformed output runs as native ESM and as CJS.
- Known interop facts: v5 and v6 expose styled as `module.exports.default` and have no `exports` map, so a default import under native Node ESM yields the module object (a packaging limit, not a plugin bug). v7 `require()` returns the callable styled with named exports attached. Non-tag exports (`isStyledComponent`, `createTheme`, `ThemeProvider`, `ServerStyleSheet`, and the rest of that set) must never receive `.withConfig`.
- Output changes (hash shifts, newly recognized forms, minify differences) need a changeset line even when intended.
- Perf: run `pnpm bench` on main and the branch for changes that touch visitors or detectors. A slower branch is a regression.

Performance

- Hot-path code earns microbenchmarks before claiming it is optimized: A/B against the prior code at several input sizes (`pnpm bench`). Its run-to-run noise is large on big inputs, so repeat a run before trusting a single-digit difference. Babel plugins run per file per build, so per-node allocation and repeated AST walks matter.
- The happy path never pays for rare shapes; handle those behind a cheap presence check.
- Docs state a budget and the command that measures it, never a measured figure.

Dependencies and git

- Package manager: pnpm 12 via the `packageManager` field. Use `pnpm install --frozen-lockfile` in CI. Settings live in `pnpm-workspace.yaml`, including the global virtual store (`virtualStoreType: global`), which links every worktree's `node_modules` into one shared store. CI sets `PNPM_CONFIG_VIRTUAL_STORE_TYPE=project`: a cold CI store gains nothing from it, and on Windows the global layout fails install with "Access is denied".
- A dependency change commits its regenerated lockfile. Install scripts stay off; allow one only for demonstrated breakage, in `pnpm-workspace.yaml` `allowBuilds` with a one-line reason.
- `minimumReleaseAge` holds back releases younger than its window; add a deliberate exclusion rather than lowering it.
- Fetch origin before starting work or rebasing. Prefer fast-forward, then rebase; no merge commits. Never `git stash`; use a temporary commit.
- Watch every open PR for review comments and failing checks and handle them. After fixing a valid comment, resolve the thread. When the reviewer's logic is faulty, double-check, then gently leave a corrective comment.

Babel plugin internals

- Babel plugins run per file per build. Hot-path discipline: pre-curry visitor factories once at plugin init, don't re-curry per node.
- Module-level mutable state leaks across files in long-running watchers (webpack-dev-server, jest watch, Next dev). Per-file caches live on `state.file.set/get`.
- The css-prop transform injects new `VariableDeclaration` nodes at the end of `Program.body`, and Babel's outer traversal does not reliably re-visit them. The styled visitors are applied eagerly from inside `transpileCssProp` to compensate. When changing this area, verify on a file that mixes user-written `styled.div` and css-prop usages that both receive `displayName`/`componentId`.
- `componentId` is `sc-<file-hash>-<counter>`. The counter is per-file, source-order-stable. Components found by the css-prop pre-pass are numbered first; a component whose styled `require` sits below the first css prop is not found by it and takes its number in source order. If a change makes counter values shift unexpectedly across a snapshot, treat it as a regression until proven otherwise.
- `isStyled` and the helper detectors in `src/utils/detectors.js` are recursive predicate chains. They short-circuit through nested CallExpression/SequenceExpression shapes (the `(0, x.default)(...)` form produced by `@babel/plugin-transform-modules-commonjs`). When adding a new arm, also reason about whether the recursive traversal will revisit children of the matched shape and re-match downstream (the `addConfig` mutation is not perfectly idempotent across all shapes).

Not applicable

- UI and accessibility: headless build-time library.
- Migrations and data lifecycle: no persisted data.
- User data and secrets: the plugin handles no user data, secrets, or network calls; supply-chain rules are under Dependencies and git.

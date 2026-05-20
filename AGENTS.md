Project notes for AI coding agents working on `babel-plugin-styled-components`.

Hard rules

- Never bump the version in `package.json` or publish to npm. Releases ship via changesets + GitHub Actions.
- Never include AI attribution on commits, PRs, files, or output.
- External communications (issues, gists, comments) never leak client names or internals. Speak as the maintainer in first person, warmly toward contributors. Bug reports to third parties are redacted and minimal.

Voice

- Warm, concise, situationally humorous, grounded in data. American English.
- No em-dashes. Use situationally-appropriate unicode punctuation.
- Machine-oriented markdown (AGENTS.md, internal notes, agent instructions): dashes for lists, no headers, no bold, no tables. This file is one of those.
- Human-facing markdown (README, PR descriptions, changesets, release notes): written for a human to read. Don't include internals or point-in-time numbers or quantities that go stale (test counts, coverage percentages, dependency counts).
- Escape literal asterisks outside code blocks (process.env.\*).

How to think

- Scientific method. Form a hypothesis, hold variables constant, test one at a time, update beliefs.
- Be meticulous. Observe, note, plan, act, then reconcile work against the plan. Keep a running to-do list and update it as work finishes or new requests land. Append new requests to the end unless told otherwise.
- Be the gardener. Handle unobjectionable cleanup as you pass through. Sometimes substantial cuts are necessary to keep the system healthy.
- Question complexity. Propose simpler alternatives. Prefer questioning assumptions over accepting overengineering.
- Don't silently work around issues. Log them in a backlog or in the PR body rather than deferring invisibly.
- Never make assumptions about information or file content you have not read in the same session. Verify against fresh sources. Training data is stale by default. Research first-party docs and current code before deciding.

How to plan

- Ask clarifying multiple-choice questions until you can restate the ask in one paragraph the maintainer agrees with.
- Present 2-3 directions with research-backed opinions, not a single decided plan.
- Never give time estimates.

How to ship

- Types are law. No `as any`, non-null assertions, or `@ts-expect-error` escape hatches, except as deliberate negative-behavior tests clearly labeled as such.
- Tests ship with features. Branch coverage above 80%. Cover happy paths, edge cases, and failure modes. Prefer inline snapshots seeded empty. Local tests run well under 30s.
- Red/green TDD is required for every fix. Add or adjust the failing test before the code change, confirm it fails (red) on the unmodified surrounding code, apply the fix, then confirm it passes (green). When the test is a fixture snapshot, generate it on the pre-fix tree so the diff captures the broken output, then update on the post-fix tree. A test that only ever passes alongside the fix is not a regression test.
- Snapshot drift is suspect. When fixture `output.js` files change beyond cosmetic helper renames, isolate the cause before regenerating. Counter shifts (`componentId: "sc-<hash>-N"`) in particular signal that visit order changed; verify the new order is intentional and source-order-stable before committing.
- Comments explain non-obvious current behavior. Never narrate change history, reference an issue number, or describe what a future maintainer should do.
- Hot-path code earns microbenchmarks before claiming it is optimized. Babel plugins run per file per build, so per-node allocation and repeated AST walks matter.
- Run the build (`pnpm build`) to verify changes. Don't start a dev server unless asked.
- Backward compatibility applies only to public API surfaces. The plugin's public surface is the default export (a Babel plugin function) and the option keys it accepts. Internal modules in `src/utils`, `src/visitors`, and `src/minify` are rewritable when complexity warrants.
- Errors carry typed metadata for context but never leak internals to consumers. User-facing throws should use `path.buildCodeFrameError` (with a real `path`) so the error points at the offending source.
- Dry-run destructive or batch operations. Verify targeting before executing.
- Always subscribe to pull request events and handle review comments and failing builds automatically. When the reviewer's logic is faulty, double-check, then gently leave a corrective comment.

Project shape

- Package manager: pnpm 11 via the `packageManager` field. Use `pnpm install --frozen-lockfile` in CI.
- Releases: changesets. Add a `.changeset/<slug>.md` for every user-visible change. `patch` for fixes, `minor` for new behavior, `major` only when the change actually breaks working consumers. Declaring an implicit peer dependency that consumers must already have in order to use the plugin (for example adding `@babel/core` as an explicit peer) is not by itself a major; tightening an existing peer range to drop currently-supported versions is.
- Tests: `pnpm test`. Fixture-based via `babel-test`. Each directory under `test/fixtures/<name>/` has `code.js` (input), `.babelrc` (plugin config), and either `output.js` (expected) or `error.js` (expected throw). To regenerate intentionally: `pnpm exec jest -u`.

Plugin internals

- Babel plugins run per file per build. Hot-path discipline: pre-curry visitor factories once at plugin init, don't re-curry per node.
- Module-level mutable state leaks across files in long-running watchers (webpack-dev-server, jest watch, Next dev). Per-file caches live on `state.file.set/get`.
- The css-prop transform injects new `VariableDeclaration` nodes at the end of `Program.body`, and Babel's outer traversal does not reliably re-visit them. The styled visitors are applied eagerly from inside `transpileCssProp` to compensate. When changing this area, verify on a file that mixes user-written `styled.div` and css-prop usages that both receive `displayName`/`componentId`.
- `componentId` is `sc-<file-hash>-<counter>`. The counter is per-file, source-order-stable. If a change makes counter values shift unexpectedly across a snapshot, treat it as a regression until proven otherwise.
- `isStyled` and the helper detectors in `src/utils/detectors.js` are recursive predicate chains. They short-circuit through nested CallExpression/SequenceExpression shapes (the `(0, x.default)(...)` form produced by `@babel/plugin-transform-modules-commonjs`). When adding a new arm, also reason about whether the recursive traversal will revisit children of the matched shape and re-match downstream (the `addConfig` mutation is not perfectly idempotent across all shapes).

# hackchat-client — Testing and toolchain

## Test runner

`npm test` = `cross-env NODE_ENV=test jest --coverage`. NOTE: on this
docs branch (based on upstream master) the jest toolchain fix is NOT
present — `jest.config.js` still references the removed
`@testing-library/react/cleanup-after-each` setup file and jest itself
is not declared in the manifest. The toolchain restoration (jest 29.7.0,
modernized config, `test-globals.js`, `localstorage-polyfill.js`) lands
in PR #74 / #3 (branch `test/communication-provider-suite`).

Shims added to make the legacy suites runnable in Node:
- `internals/testing/test-globals.js` — backfills jest-1.x BDD globals
  (`describe`, `it`, `beforeEach`, `beforeAll`) the repo's tests use
  (`setupFilesAfterEnv`).
- `internals/testing/localstorage-polyfill.js` — browser `localStorage`
  for modules that touch it at module scope (`setupFiles`).
- `testPathIgnorePatterns: ['/\\.claude/', '/\\.git/']` — skips worktree
  copies.

Current state (on the tests branch, with the toolchain fix): 12/41 suites
green; the CommunicationProvider domain fully green (6/6 suites,
44/44 tests). Remaining red suites are pre-existing jsdom/browser-environment
failures outside that domain (Message/ChatInput suites need a fuller
browser env) — tracked, not yet fixed.

## Why saga/index suites are placeholders

`app/containers/CommunicationProvider/saga.js` constructs
`new Client(...)` at module scope (`saga.js:74`), which opens a live
WebSocket on import. Any suite that imports the saga (directly or via
`index.js`) executes the engine. The pure logic was therefore extracted
into `userLifecycle.js` with its own suite, and reducer/actions/selectors
are tested against the public API.

## Reproduction harness

`repro-dup-nick.js` (repo root, untracked): fake `ws` server + two engine
`Client` instances modelling two browser windows; speaks the real wire
protocol (`session`, `join`, `leave`, `onlineSet`, `onlineAdd`,
`onlineRemove` — delivered only to subscribed sockets). Exit 0 means the
duplicate reproduced AND the packet-sourced list removed it.

## Lint

`npm run lint` = eslint (`./app`) + stylelint. Clean at time of writing.

# AGENTS.md — hackchat-client

Orientation for coding agents crawling this repo. Facts here are verified
against source; `docs/architecture.md` carries the full evidence trail.

## What this is

Webpack-bundled React/Redux client for hack.chat, compiled into one static
bundle (no runtime server dependency for the client logic). Node >= 22.9.0,
npm >= 10.8.3 (`package.json` engines). The chat protocol lives entirely in
the `hackchat-engine` npm package (pinned `^1.1.28`).

## Read-first map

1. `docs/architecture.md` — component tree, data paths, store shape, wire
   packet reference, failure paths. Start here; it cites every claim.
2. `docs/issues.md` — known bugs, root causes, and which PR fixes which.
3. `docs/testing.md` — jest toolchain state and its caveats.
4. `docs/diagrams/` — editable diagram sources (`.d2`, `.mmd`, `.dot`)
   beside rendered `.svg`s.

## Layout (app/ is the whole source tree)

- `app/app.js` — entry: store setup + container nesting
  (Provider → CommunicationProvider → LanguageProvider → WalletLayer →
  Router → App). The nesting defines ownership; do not reorder.
- `app/setupStore.js` — redux store + saga middleware + injection registries.
- `app/reducers.js` — merges `language`, `settings`, and injected reducers.
- `app/containers/CommunicationProvider/` — the chat core:
  - `saga.js` — owns the `hcClient` (hackchat-engine `Client`), translates
    engine events ↔ store actions ↔ engine calls.
  - `reducer.js` — immer fold of all chat state (channels, users, messages,
    session, captcha/password flags).
  - `actions.js` / `selectors.js` — public API used by the UI.
  - `userLifecycle.js` — pure prune predicate (testable without a socket;
    lands in PR #74, not yet on master).
  - `constants.js` — the action/event type vocabulary.
- `app/containers/` — App (routes + ThemeProvider), HomePage (chat UI),
  SettingsPage, WalletLayer (Solana wallet-standard), LanguageProvider (i18n),
  ToastNotifier.
- `app/components/` — leaf UI (MainMenu = sidebar, ChatManager = message
  rendering, JoinMenu, ChannelList, ChatInput, Message/MessageFormatter,
  ColorPicker, ...). Each may carry its own reducer/actions/selectors.
- `app/themes/` — dynamically imported (`import('../../themes/<name>.js')`
  in `containers/App/index.js`); `default.js` is the fallback.
- `app/translations/*.json` — 19 locales; UI strings go through react-intl
  ids like `hcclient.components.Message.rcWarning`.
- `internals/webpack/` — build config; `server/` — dev/prod static server.

## Commands

- `npm run lint:js` — eslint over `./app` (fast gate; run after edits).
- `npm run lint:css` — stylelint over the same js files.
- `npm test` — jest + coverage. CAVEAT (docs/testing.md): on master the
  toolchain is broken (jest undeclared, stale jest.config.js); the fix is
  PR #74 / branch `test/communication-provider-suite`. Run
  `NODE_ENV=test node node_modules/.bin/jest <path>` on that branch.
- `npm run build` / `npm start` — webpack build / dev server.
- `repro-dup-nick.js` (repo root, untracked) — wire-protocol reproduction
  harness for the duplicate-nick bug; exit 0 = reproduced + fix verified.

## Invariants and traps (verified)

- Custom import syntax: `import X from 'path'` (webpack/babel transform).
  Standard `import X from 'path'` style pervades `app/` — do not "fix" it.
- `hcClient` is constructed at module scope in `saga.js` (the `new Client({...})`
  block, near the `initialGateway`/`SESSION_LS` setup) — importing the
  saga (or `index.js`) opens a live WebSocket. Never unit-test by importing
  the saga; test the pure modules and public API instead.
- `window.hcClient = hcClient` (right after the construction) — global for
  devtools only.
- Reducers are injected per container via `useInjectReducer`/`useInjectSaga`
  (`utils/injectReducer.js`); state is namespaced by injection key
  (`communicationProvider`, `walletLayer`, `language`, `settings`, ...).
- Store state is the single rendering source: sidebar filters
  `channels[].users` on `online` (`MainMenu/index.js:103`,
  `ChatManager/index.js:176`). Never render from `hcClient.users` directly.
- The JOINED_CHANNEL user list must be built from the `onlineSet` packet,
  NOT by scanning `hcClient.users` (master still scans — fix pending in
  PR #77; scanning resurrects stale records — see docs/issues.md and
  docs/diagrams/stale-record.mmd).
- Reducer guards: `USER_JOINED`/`USER_LEFT`/`USER_UPDATE` must be no-ops
  for channels absent client-side (unguarded on master; guards land in
  PR #76 — see docs/issues.md).
- Wire facts: engine `util/Constants.js` maps event names to wire cmds
  (`LEAVE: 'leave'`, `USER_LEAVE: 'onlineRemove'`); `onlineRemove` is
  delivered only to subscribed sockets. PacketRouter keys on `packet.cmd`.
- Warning ids: 987654321 = `dcError` (connection lost), 987654322 =
  `rcWarning` (reconnect notice) — in `Message/messages.js` `ERROR_ID`
  registrations.
- `app/app.js` monkey-patches `addEventListener` to swallow
  `animationiteration` (Chrome perf fix for infinite name effects).
  Intentional; do not remove.
- `app/config.json` and `app/.htaccess` are runtime/deploy artifacts —
  leave them out of task commits.

## Conventions for changes

- One concern per commit; conventional commit titles
  (`fix(scope): ...`, `test(scope): ...`, `docs: ...`).
- Branch names: `fix/<behavior>`, `test/<behavior>`, `docs/<topic>`.
- Fork-based PR flow: push branch to fork, open cross-repo PR into
  `hack-chat/hackchat-client` (no push access upstream).
- Preserve unrelated dirty files when staging (stage only task-owned paths).
- Architecture claims need file citations; do not invent components or
  relationships (see software-architect skill rules for analysis work).
- New UI strings: add to `app/components/*/messages.js` (defaultMessage)
  AND `app/translations/en.json` — both, or i18n falls back silently.

## Where the bugs live (summary; details in docs/issues.md)

| symptom | root cause | fix |
| --- | --- | --- |
| duplicate nick in sidebar | stale engine record after unsubscribe; saga scanned `hcClient.users` | PR #77 (packet-sourced list) |
| user stays connected after leave | same unsubscribe/onlineRemove mechanism | PR #77 |
| reducer crash on late events for deleted channel | unguarded `draft.channels[channel]` writes | PR #76 (guards) |
| engine memory creep | `hcClient.users` never pruned | PR #74 (`userLifecycle.js`) |
| "nick already in use" on rejoin | client never unsubscribed (drifted engine 1.1.6 = install artifact, not source bug) | `npm install hackchat-engine` |

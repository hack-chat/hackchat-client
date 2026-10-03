# hackchat-client — Architecture

Generated from source inspection on branch `docs/client-architecture`.
Every claim cites a file in `app/`. Scope: the whole client (41 test suites
present, 12 green — see `docs/testing.md`).

## 1. What this application is

A webpack-bundled React/Redux client for hack.chat. The entire app — UI,
store, saga, and the chat engine — is compiled into one bundle (`app/app.js`
is the entry; `internals/webpack/webpack.prod.babel.js` builds it; `server`
serves it). There is no separate runtime dependency on a server-side client:
the client talks directly to a gateway over WebSocket via `hackchat-engine`.

Key stack facts (from `package.json` and `app/app.js`):

- React 18 + `react-dom/client` `createRoot` (app.js:31)
- Redux (classic `redux` + `react-redux` `Provider`) with **redux-saga** and
  per-container **injected reducers/sagas** (the old react-boilerplate
  architecture; `app/setupStore.js`, `app/utils/reducerInjectors.js`)
- `hackchat-engine` (npm, pinned `^1.1.28`) owns the WebSocket protocol
- i18n via `react-intl` + `app/translations/*.json` (19 locales)
- theming via `styled-components` `ThemeProvider` + dynamic
  `import('../../themes/<name>.js')` (`app/containers/App/index.js`)
- Solana wallet integration (`@solana/web3.js`, wallet-standard) in
  `app/containers/WalletLayer`

## 2. Component tree and ownership

The container nesting in `app/app.js` defines the ownership hierarchy:

```
Provider (redux store)
└─ CommunicationProvider   (saga + reducer; owns the engine client)
  └─ LanguageProvider      (react-intl; locale from store)
    └─ WalletLayer         (saga; Solana wallet-standard bridge)
      └─ Router (react-router-dom)
        └─ App             (ThemeProvider; routes)
           ├─ HomePage     (/ and /:channel — the chat UI)
           ├─ SettingsPage (/settings)
           └─ ToastNotifier (react-toastify bridge)
```

Evidence: `app/app.js:44-58` render nesting; `app/containers/App/index.js`
routes `HomePage`/`SettingsPage`; `app/containers/ToastNotifier/index.js`.

Reducers are not wired in `app.js` — each container injects its own at
construction: `useInjectReducer({ key: 'communicationProvider', reducer })`
(`app/containers/CommunicationProvider/index.js:16`), and `app/reducers.js`
merges `language`, `settings`, plus all injected reducers into the root
state. State namespaces: `communicationProvider`, `language`, `settings`,
`walletLayer`, `toastNotifier`, `mainMenu`, plus component-local reducers
(e.g. `app/components/MainMenu/reducer.js`).

## 3. The data path: wire → store → UI

### Inbound (server → UI)

1. `hackchat-engine` `Client` opens the socket (`node_modules/hackchat-engine/websocket/SocketHandler.js`).
2. The engine's `PacketRouter` dispatches wire packets by `packet.cmd` to
   event handlers (`node_modules/hackchat-engine/websocket/packets/PacketRouter.js:75` `route(packet)` keyed on `cmd`).
3. Handlers emit engine events (`channelJoined`, `userJoined`, `userLeft`,
   `userUpdate`, `message`, `whisper`, `emote`, `invite`, `warning`,
   `information`, `gotCaptcha`, `publicchannels`, `hackAttempt`,
   `signMessage`, `signTransaction`, `updateMessage`, `gotPasswordReq`,
   `session`, `connected`, `error`, `reconnecting`).
4. The saga registers listeners for all of them and re-emits them through a
   redux-saga `eventChannel` as typed store actions
   (`app/containers/CommunicationProvider/saga.js:431-452` listener block;
   handlers at lines 119-430).
5. The reducer folds those actions into immutable store state
   (`app/containers/CommunicationProvider/reducer.js`, immer `produce`).
6. Components read state through reselect selectors
   (`app/containers/CommunicationProvider/selectors.js`) and render.

### Outbound (UI → server)

UI action buttons call exported action factories
(`app/containers/CommunicationProvider/actions.js`, e.g. `joinChannel`,
`leaveChannel`, `sendChat`), which dispatch typed objects; the saga's
`takeLatest`/`takeEvery` blocks translate them into engine calls
(`hcClient.join`, `hcClient.leave`, `hcClient.say`, ... —
`saga.js:455+`). The engine serialises them as wire packets
(`Client.js` → `ws.send`).

Full round trip: `JoinButton` click → `HomePage` `joinChannel()` →
dispatch `START_JOIN` → saga `takeLatest(START_JOIN)` → `hcClient.join()`
→ `{cmd:'join'}` frame → server `onlineSet`/`onlineAdd` → engine
`channelJoined` → saga `onChannelJoined` → `JOINED_CHANNEL` → reducer merge
→ `ChatManager`/`MainMenu` re-render.

## 4. Store state shape (CommunicationProvider)

`app/containers/CommunicationProvider/reducer.js:37` `initialState`:

```
{
  connected: bool,            // socket connected
  channel: string|false,      // focused channel
  channels: {                 // per-channel state
    <name>: {
      users: { <userid>: UserRecord },   // UserRecord fields below
      messages: [ {type, data, user?} ]  // chat/join/leave/warn/...
    }
  },
  meta: { channelCount, userCount, channels: [] },
  sessionReady: bool,
  lastSession: bool,
  pendingCaptcha: bool,
  pendingPasswordReq: bool,
}
```

`UserRecord` (the shape the saga builds — `saga.js` `onChannelJoined`,
mirroring engine `structures/UserStruct.js:33-134`):

```
{ userid, username, usertrip, userhash, userlevel, permissionLevel,
  online, mine, blocked, isBot, nickColor, flair, effect }
```

Wire packet reference (from engine `util/Constants.js` + handler field
reads; the client's own vocabulary, verified against
`node_modules/hackchat-engine`):

| direction | cmd | key fields |
| --- | --- | --- |
| out | `join` | `nick`, `channel`, `password`, `color` |
| out | `leave` | `channel` |
| out | `say`/`chat` | `channel`, `content` |
| out | `changeColor`, `enableCaptcha`, `disableCaptcha`, `lockChannel`, `unlockChannel`, `invite`, `ignore`, `unignore`, `kick`, `ban`, `mute`, `unmute`, `clearChannel` | `channel` (+targets) |
| in | `session` | `sessionID`, `restored`, `channels` |
| in | `onlineSet` | `channel`, `users[]` (userid, nick, isBot, isme, hash, uType, level, color, trip, flair, effect) |
| in | `onlineAdd` / `onlineRemove` | `channel`, `userid` (+user fields for add) |
| in | `chat` | `channel`, `content`, `id`, user fields |
| in | `whisper`/`emote`/`invite` | `channel`, `content`/targets, from/to user fields |
| in | `warning`/`information` | `channel`, `id`, `text`, `args` |
| in | `captcha` | `captchaData: {channel, text}` |
| in | `publicchannels` | `channels: [{name, users}]` |

Note: `onlineRemove` is delivered **only to subscribed sockets** — the
mechanism behind the stale-record behaviour documented in
`docs/issues.md` and fixed in PR #77.

## 5. Failure paths

- Socket error/reconnecting → `CONNECTION_ERROR` → reducer pushes a
  synthetic `warn` message (id `987654321`) per channel
  (`reducer.js:44-64`); `ChatManager` renders it via
  `app/components/Message/messages.js` (the "Reconnected - you may have
  missed some messages." copy).
- Session restore: `SESSION_READY` with `restored: true` deletes channels
  not in the restored set and prunes the reconnect warning
  (`reducer.js:66-96`).
- Engine `warning` events (e.g. "nickname is already in use") flow as
  `WARNING` → per-channel `warn` message → i18n lookup by numeric id in
  `app/translations/en.json`. Warning ids: `987654321` =
  `dcError` "Lost connection to server. . ." (pushed by the reducer on
  `CONNECTION_ERROR`), `987654322` = `rcWarning` reconnect notice
  (`app/components/Message/messages.js:621-622`). The copy-edit fix for
  the reconnect wording ("Reconnected - you may have missed some
  messages.") is pending in PR #75, not yet on master.

## 6. Diagrams

See `docs/diagrams/` — each diagram source is alongside its SVG:

- `architecture.d2` / `.svg` — system structure and ownership boundaries
- `message-flow.mmd` / `.svg` — inbound/outbound message round trip
- `stale-record.mmd` / `.svg` — the leave→unsubscribe→missed-onlineRemove
  sequence (duplicate-nick root cause)
- `store-wiring.dot` / `.svg` — reducer/saga/selector wiring graph

## 7. Notable behaviours (verified, with consequences)

- `hcClient` is constructed at **module scope** of the saga
  (`saga.js:74`), opening a live WebSocket on import. Consequence: the
  saga/index suites cannot be unit-tested without side effects; they are
  skipped placeholders (`app/containers/CommunicationProvider/tests/saga.test.js`).
- `window.hcClient = hcClient` (`saga.js:76`) exposes the engine globally
  for devtools debugging.
- The gateway URL comes from `localStorage` (`WSPATH_LSLABEL`) or the
  default `wss://hack.chat/chat-ws` (`saga.js:77-84`); `app/config.json`
  carries the production gateway for the server mount.
- `app/app.js:14-21` monkey-patches `addEventListener` to swallow
  `animationiteration` — a Chrome perf fix for infinite name effects.
- Sidebar user list is built from store `channels[].users` filtered on
  `online` (`app/components/MainMenu/index.js:103`,
  `app/components/ChatManager/index.js:176`), not from the engine map —
  the store is the single source of truth for rendering.

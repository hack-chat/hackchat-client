# hackchat-client — Known issues and their status

Written from verified root-cause analysis (local repro: `repro-dup-nick.js`
at repo root, drives two engine `Client`s against a fake `ws` server
speaking the real wire protocol; exit 0 = reproduced + fix verified).

## 1. Duplicate nicks in the sidebar

Symptom: another user's nick appears twice in the side menu after the
observer leaves the channel and rejoins, while the other user's window
closed in between. No page reload, no reconnect involved.

Root cause (correct engine 1.1.28/1.1.29, no version drift):
the server sends `onlineRemove` only to subscribed sockets. When the
observer clicks Leave it is unsubscribed; when Alice's window then closes
the observer receives nothing, so its engine record `Alice#104` keeps
`online: true` and `channels: {gamerism}`. On rejoin the saga's
`onChannelJoined` scanned `hcClient.users` for `channels.has(channel)`
and resurrected the stale record beside the fresh `Alice#106`.

Status: fixed in PR #77 (upstream) / #6 (fork) — user list built from the
authoritative `onlineSet` packet. See `docs/diagrams/stale-record.mmd`.

## 2. "User stays connected" after leaving; rejoin says nick already in use

Same mechanism, two faces:
- the unsubscribed client never receives `onlineRemove` for users that
  left while it was unsubscribed (stale `online: true` records);
- on a drifted engine (`hackchat-engine@1.1.6`, an install-time artifact —
  `node_modules` is gitignored) `Client.leave()` does not exist, so the
  client never unsubscribes at all: no `{cmd:"leave"}` frame is sent, the
  server keeps the subscription, and the rejoin is rejected with
  "nickname is already in use" (warning id 987654322 flows through
  `WARNING` → per-channel warn message → `app/translations/en.json`).

Status: the stale-record face is fixed by PR #77. The drifted-engine face
is an install/lockfile problem, not a source bug; `npm install hackchat-engine`
restores the pinned `^1.1.28`.

## 3. Reducer crash on late events for deleted channels

After `LEAVE_CHANNEL` deletes the channel client-side, the server still
emits the user's own `leave`/`update` packets for it; the unguarded reducer
wrote through `draft.channels[channel]` and immer crashed
(`Cannot read properties of undefined`).

Status: fixed in PR #76 / #5 — `USER_JOINED`/`USER_LEFT`/`USER_UPDATE` are
no-ops when the channel is absent client-side.

## 4. Engine memory creep

`hcClient.users` keeps offline records forever (engine never prunes).
Status: client-side prune landed in PR #74 / #3
(`app/containers/CommunicationProvider/userLifecycle.js` + saga hook).

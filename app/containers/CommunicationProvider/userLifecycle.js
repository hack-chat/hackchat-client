/**
 * UserLifecycle exports pure helpers for pruning stale engine user
 * records. The engine keeps offline users in client.users forever; the
 * client prunes records that are offline, not ours, and no longer in
 * any channel the client is subscribed to.
 */

export function isStaleUser(user, joinedChannels) {
  const stillIn = [...user.channels].some((channel) =>
    joinedChannels.includes(channel),
  );

  return user.online === false && !user.mine && !stillIn;
}

export function staleUserids(users, joinedChannels) {
  const joined = Array.from(joinedChannels);

  return Array.from(users)
    .filter(([, user]) => isStaleUser(user, joined))
    .map(([userid]) => userid);
}

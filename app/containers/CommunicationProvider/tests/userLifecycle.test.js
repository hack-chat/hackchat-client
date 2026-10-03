/**
 * UserLifecycle tests — the prune predicate for stale engine user
 * records (memory creep fix).
 */

import { isStaleUser, staleUserids } from '../userLifecycle';

describe('isStaleUser', () => {
  it('prunes offline users outside every joined channel', () => {
    const user = { online: false, mine: false, channels: new Set(['gone']) };
    expect(isStaleUser(user, ['x'])).toBe(true);
  });

  it('keeps users still in a joined channel', () => {
    const user = { online: false, mine: false, channels: new Set(['x']) };
    expect(isStaleUser(user, ['x'])).toBe(false);
  });

  it('keeps online users', () => {
    const user = { online: true, mine: false, channels: new Set(['gone']) };
    expect(isStaleUser(user, ['x'])).toBe(false);
  });

  it('never prunes our own record', () => {
    const user = { online: false, mine: true, channels: new Set(['gone']) };
    expect(isStaleUser(user, ['x'])).toBe(false);
  });

  it('prunes users with an empty channel set when offline', () => {
    const user = { online: false, mine: false, channels: new Set() };
    expect(isStaleUser(user, ['x'])).toBe(true);
  });
});

describe('staleUserids', () => {
  it('returns only the ids of stale records', () => {
    const users = new Map([
      [
        1,
        { online: false, mine: false, channels: new Set(['gone']) },
      ],
      [2, { online: true, mine: false, channels: new Set(['x']) }],
      [3, { online: false, mine: true, channels: new Set(['gone']) }],
    ]);
    expect(staleUserids(users, ['x'])).toEqual([1]);
  });

  it('returns an empty list when nothing is stale', () => {
    const users = new Map([
      [2, { online: true, mine: false, channels: new Set(['x']) }],
    ]);
    expect(staleUserids(users, ['x'])).toEqual([]);
  });
});

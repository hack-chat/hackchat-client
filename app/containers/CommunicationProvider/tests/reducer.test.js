/**
 * Communication provider reducer tests
 */

import communicationProviderReducer from '../reducer';
import { initialState } from '../reducer';

describe('communicationProviderReducer', () => {
  it('returns the initial state', () => {
    expect(communicationProviderReducer(undefined, {})).toEqual(initialState);
  });

  it('marks connected on CONNECTED', () => {
    const state = { connected: false };
    expect(
      communicationProviderReducer(state, { type: 'app/CommunicationProvider/CONNECTED' }),
    ).toEqual({ connected: true });
  });

  it('creates a channel entry on JOINED_CHANNEL', () => {
    const state = { channels: {} };
    const action = {
      type: 'app/CommunicationProvider/JOINED_CHANNEL',
      data: { channel: 'x', users: { 1: { username: 'a', online: true } } },
    };
    expect(communicationProviderReducer(state, action)).toEqual({
      channels: {
        x: { users: { 1: { username: 'a', online: true } }, messages: [] },
      },
      pendingCaptcha: false,
      pendingPasswordReq: false,
    });
  });

  it('merges users on re-JOINED_CHANNEL, marking all online', () => {
    const state = {
      channels: {
        x: {
          users: {
            1: { username: 'old', online: true },
            2: { username: 'stale', online: true },
          },
          messages: [],
        },
      },
    };
    const action = {
      type: 'app/CommunicationProvider/JOINED_CHANNEL',
      data: { channel: 'x', users: { 2: { username: 'stale' } } },
    };
    const result = communicationProviderReducer(state, action);
    // the previously-online-but-absent user must be marked offline
    expect(result.channels.x.users[1].online).toBe(false);
    expect(result.channels.x.users[2].online).toBe(true);
  });

  it('marks a user offline on USER_LEFT', () => {
    const state = {
      channels: {
        x: { users: { 1: { username: 'a', online: true } }, messages: [] },
      },
    };
    const action = {
      type: 'app/CommunicationProvider/USER_LEFT',
      channel: 'x',
      user: { userid: 1 },
    };
    const result = communicationProviderReducer(state, action);
    expect(result.channels.x.users[1].online).toBe(false);
    expect(result.channels.x.messages).toHaveLength(1);
    expect(result.channels.x.messages[0].type).toBe('leave');
  });

  it('ignores USER_LEFT for a channel already deleted client-side', () => {
    const state = { channels: {} };
    const action = {
      type: 'app/CommunicationProvider/USER_LEFT',
      channel: 'x',
      user: { userid: 1 },
    };
    expect(communicationProviderReducer(state, action)).toEqual(state);
  });

  it('ignores USER_JOINED for a channel already deleted client-side', () => {
    const state = { channels: {} };
    const action = {
      type: 'app/CommunicationProvider/USER_JOINED',
      channel: 'x',
      user: { userid: 1, username: 'a' },
    };
    expect(communicationProviderReducer(state, action)).toEqual(state);
  });

  it('ignores USER_UPDATE for a channel already deleted client-side', () => {
    const state = { channels: {} };
    const action = {
      type: 'app/CommunicationProvider/USER_UPDATE',
      channel: 'x',
      user: { userid: 1, username: 'a' },
    };
    expect(communicationProviderReducer(state, action)).toEqual(state);
  });

  it('deletes the channel on LEAVE_CHANNEL and re-points active channel', () => {
    const state = { channel: 'x', channels: { x: { users: {}, messages: [] }, y: { users: {}, messages: [] } } };
    const action = { type: 'app/CommunicationProvider/LEAVE_CHANNEL', channel: 'x' };
    const result = communicationProviderReducer(state, action);
    expect(result.channels).toEqual({ y: { users: {}, messages: [] } });
    expect(result.channel).toBe('y');
  });

  it('falls back to no active channel when the last one is left', () => {
    const state = { channel: 'x', channels: { x: { users: {}, messages: [] } } };
    const action = { type: 'app/CommunicationProvider/LEAVE_CHANNEL', channel: 'x' };
    const result = communicationProviderReducer(state, action);
    expect(result.channel).toBe(false);
  });
});

/**
 * Communication provider selectors tests
 */

import {
  selectCommunicationProviderDomain,
  makeSelectChannel,
  makeSelectChannelData,
  makeSelectMeta,
  makeSelectSessionReady,
} from '../selectors';
import { initialState } from '../reducer';

describe('CommunicationProvider selectors', () => {
  it('selectCommunicationProviderDomain falls back to initialState', () => {
    expect(selectCommunicationProviderDomain({})).toEqual(initialState);
  });

  it('selectCommunicationProviderDomain reads the namespaced substate', () => {
    const state = { communicationProvider: { connected: true } };
    expect(selectCommunicationProviderDomain(state)).toEqual({
      connected: true,
    });
  });

  it('makeSelectChannel returns the focused channel', () => {
    const state = {
      communicationProvider: { channel: 'x', channels: {}, meta: {} },
    };
    expect(makeSelectChannel()(state)).toBe('x');
  });

  it('makeSelectChannelData returns the channels map', () => {
    const state = {
      communicationProvider: { channel: 'x', channels: { x: {} }, meta: {} },
    };
    expect(makeSelectChannelData()(state)).toEqual({ x: {} });
  });

  it('makeSelectMeta returns the session meta', () => {
    const state = {
      communicationProvider: {
        channel: false,
        channels: {},
        meta: { channelCount: 2, userCount: 3, channels: [] },
      },
    };
    expect(makeSelectMeta()(state)).toEqual({
      channelCount: 2,
      userCount: 3,
      channels: [],
    });
  });

  it('makeSelectSessionReady returns the sessionReady flag', () => {
    const state = { communicationProvider: { sessionReady: true } };
    expect(makeSelectSessionReady()(state)).toBe(true);
  });
});

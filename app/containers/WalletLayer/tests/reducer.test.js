/**
 * WalletLayer
 */

// import { produce } from 'immer';
import walletLayerReducer from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('walletLayerReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      connected: false,
      client: false,
      channel: false,
      channels: {},
      globalNotifs: [],
      meta: {
        channelCount: 0,
        userCount: 0,
        channels: {},
      },
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(walletLayerReducer(undefined, {})).toEqual(expectedResult);
  });
});

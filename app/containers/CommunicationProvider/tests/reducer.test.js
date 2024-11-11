/**
 * Communication provider tests
 */

// import { produce } from 'immer'; 
import communicationProviderReducer from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('communicationProviderReducer', () => {
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
    expect(communicationProviderReducer(undefined, {})).toEqual(expectedResult);
  });
});

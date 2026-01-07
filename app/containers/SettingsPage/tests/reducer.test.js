/**
 * Settings page tests
 */

// import { produce } from 'immer';
import settingsPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('settingsPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(settingsPageReducer(undefined, {})).toEqual(expectedResult);
  });
});

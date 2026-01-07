/**
 * Main menu tests
 */

// import { produce } from 'immer';
import mainMenuReducer from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('mainMenuReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      mainMenuOpen: false,
      usersModalOpen: false,
      channelsModalOpen: false,
      joinModalOpen: false,
      joinModalChannel: false,
      localeModelOpen: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(mainMenuReducer(undefined, {})).toEqual(expectedResult);
  });
});

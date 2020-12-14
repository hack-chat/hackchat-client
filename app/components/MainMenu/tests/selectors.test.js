/**
 * Main menu tests
 */

import { selectMainMenuDomain } from '../selectors';

describe('selectMainMenuDomain', () => {
  it('should select the home state', () => {
    const mainMenuState = {
      mainMenuOpen: false,
      usersModalOpen: false,
      channelsModalOpen: false,
      joinModalOpen: false,
      joinModalChannel: false,
      localeModelOpen: false,
    };
    const mockedState = {
      mainMenu: mainMenuState,
    };
    expect(selectMainMenuDomain(mockedState)).toEqual(mainMenuState);
  });
});

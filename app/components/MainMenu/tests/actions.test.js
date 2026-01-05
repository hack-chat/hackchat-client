/**
 * Main menu tests
 */

import {
  openMainMenu,
  closeMainMenu,
  openUsersModal,
  closeUsersModal,
  openJoinModal,
  closeJoinModal,
  openLocaleModal,
  closeLocaleModal,
  clearJoinModalChannel,
} from '../actions';
import {
  OPEN_MAINMENU,
  CLOSE_MAINMENU,
  OPEN_USERMODAL,
  CLOSE_USERMODAL,
  OPEN_CHANNELSMODAL,
  CLOSE_CHANNELSMODAL,
  OPEN_JOINMODAL,
  CLOSE_JOINMODAL,
  OPEN_LOCALEMODAL,
  CLOSE_LOCALEMODAL,
  CLEAR_JOIN_CHAN,
} from '../constants';

describe('MainMenu actions', () => {
  describe('Menu Action', () => {
    it('has a type of OPEN_MAINMENU', () => {
      const expected = {
        type: OPEN_MAINMENU,
      };
      expect(openMainMenu()).toEqual(expected);
    });

    it('has a type of CLOSE_MAINMENU', () => {
      const expected = {
        type: CLOSE_MAINMENU,
      };
      expect(closeMainMenu()).toEqual(expected);
    });
  });

  describe('User Modal Control', () => {
    it('has a type of OPEN_USERMODAL', () => {
      const expected = {
        type: OPEN_USERMODAL,
      };
      expect(openUsersModal()).toEqual(expected);
    });

    it('has a type of CLOSE_USERMODAL', () => {
      const expected = {
        type: CLOSE_USERMODAL,
      };
      expect(closeUsersModal()).toEqual(expected);
    });
  });

  describe('Join Modal Control', () => {
    it('has a type of OPEN_JOINMODAL', () => {
      const expected = {
        type: OPEN_JOINMODAL,
      };
      expect(openJoinModal()).toEqual(expected);
    });

    it('has a type of CLOSE_JOINMODAL', () => {
      const expected = {
        type: CLOSE_JOINMODAL,
      };
      expect(closeJoinModal()).toEqual(expected);
    });
  });

  describe('Locale Modal Control', () => {
    it('has a type of OPEN_LOCALEMODAL', () => {
      const expected = {
        type: OPEN_LOCALEMODAL,
      };
      expect(openLocaleModal()).toEqual(expected);
    });

    it('has a type of CLOSE_LOCALEMODAL', () => {
      const expected = {
        type: CLOSE_LOCALEMODAL,
      };
      expect(closeLocaleModal()).toEqual(expected);
    });
  });

  describe('Clear Default Join Channel', () => {
    it('has a type of CLEAR_JOIN_CHAN', () => {
      const expected = {
        type: CLEAR_JOIN_CHAN,
      };
      expect(clearJoinModalChannel()).toEqual(expected);
    });
  });
});

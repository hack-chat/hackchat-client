/**
 * MainMenu reducer exports
 */

import produce from 'immer';
import {
  OPEN_MAINMENU,
  CLOSE_MAINMENU,
  OPEN_USERMODAL,
  CLOSE_USERMODAL,
  OPEN_CHANNELSMODAL,
  CLOSE_CHANNELSMODAL,
  OPEN_JOINMODAL,
  CLEAR_JOIN_CHAN,
  CLOSE_JOINMODAL,
  OPEN_LOCALEMODAL,
  CLOSE_LOCALEMODAL,
} from './constants';

export const initialState = {
  mainMenuOpen: false,
  usersModalOpen: false,
  channelsModalOpen: false,
  joinModalOpen: false,
  joinModalChannel: false,
  localeModelOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const mainMenuReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case OPEN_MAINMENU:
        draft.mainMenuOpen = true;
        break;
      case CLOSE_MAINMENU:
        draft.mainMenuOpen = false;
        break;
      case OPEN_USERMODAL:
        draft.usersModalOpen = true;
        break;
      case CLOSE_USERMODAL:
        draft.usersModalOpen = false;
        break;
      case OPEN_CHANNELSMODAL:
        draft.channelsModalOpen = true;
        break;
      case CLOSE_CHANNELSMODAL:
        draft.channelsModalOpen = false;
        break;
      case OPEN_JOINMODAL:
        draft.joinModalChannel = action.channel;
        draft.joinModalOpen = true;
        break;
      case CLEAR_JOIN_CHAN:
        draft.joinModalChannel = '';
        break;
      case CLOSE_JOINMODAL:
        draft.joinModalOpen = false;
        break;
      case OPEN_LOCALEMODAL:
        draft.localeModelOpen = true;
        break;
      case CLOSE_LOCALEMODAL:
        draft.localeModelOpen = false;
        break;
    }
  });

export default mainMenuReducer;

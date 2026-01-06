/**
 * MainMenu reducer exports
 */

import { produce } from 'immer';
import {
  OPEN_MAINMENU,
  CLOSE_MAINMENU,
  OPEN_LOCALEMODAL,
  CLOSE_LOCALEMODAL,
} from './constants';

export const initialState = {
  mainMenuOpen: false,
  localeModelOpen: false,
};

const mainMenuReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case OPEN_MAINMENU:
        draft.mainMenuOpen = true;
        break;
      case CLOSE_MAINMENU:
        draft.mainMenuOpen = false;
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

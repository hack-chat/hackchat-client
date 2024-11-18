/**
 * SettingsPage reducer exports
 */

import { produce } from 'immer';

import {
  SET_USERNAME,
  SET_PASSWORD,
  SET_COLOR,
  SET_CHANSTORFLAG,
  ADD_PREVCHANNEL,
  SET_THEME,
  SET_ALLOWKATEX,
  SET_ALLOWMARKDOWN,
  SET_ALLOWEXTCODE,
  SET_LTR,
  SET_MENUBTNPOS,
  SET_HIGHLIGHTMENTIONS,
  SET_AUTOCONNECT,
  SET_WSPATH,
  USERNAME_LSLABEL,
  PASSWORD_LSLABEL,
  COLOR_LSLABEL,
  STORECHANNELS_LSLABEL,
  PREVCHANNELS_LSLABEL,
  THEME_LSLABEL,
  ALLOWKATEX_LSLABEL,
  ALLOWMARKDOWN_LSLABEL,
  ALLOWEXTCODE_LSLABEL,
  LTR_LSLABEL,
  MENUBTNPOS_LSLABEL,
  HIGHLIGHTMENTIONS_LSLABEL,
  AUTOCONNECT_LSLABEL,
  WSPATH_LSLABEL,
} from './constants';

export const settingsInitialState = {
  username: localStorage.getItem(USERNAME_LSLABEL) || '',
  password: localStorage.getItem(PASSWORD_LSLABEL) || '',
  color: localStorage.getItem(COLOR_LSLABEL) || '#3b7ed0',
  storeChannels: localStorage.getItem(STORECHANNELS_LSLABEL) || false,
  prevChannels: localStorage.getItem(PREVCHANNELS_LSLABEL) || [],
  theme: localStorage.getItem(THEME_LSLABEL) || '',
  allowKatex: localStorage.getItem(ALLOWKATEX_LSLABEL) || true,
  allowMarkdown: localStorage.getItem(ALLOWMARKDOWN_LSLABEL) || true,
  allowExternalCode: localStorage.getItem(ALLOWEXTCODE_LSLABEL) || false,
  ltr: localStorage.getItem(LTR_LSLABEL) || true,
  menuBtnPos: localStorage.getItem(MENUBTNPOS_LSLABEL) || 'left',
  highlightMentions: localStorage.getItem(HIGHLIGHTMENTIONS_LSLABEL) || true,
  autoConnect: localStorage.getItem(AUTOCONNECT_LSLABEL) || true,
  wsPath: localStorage.getItem(WSPATH_LSLABEL) || '',
};

const settingsPageReducer = (state = settingsInitialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USERNAME:
        draft.username = action.username;
        break;
      case SET_PASSWORD:
        draft.password = action.password;
        break;
      case SET_COLOR:
        draft.color = action.color;
        break;
      case SET_CHANSTORFLAG:
        draft.storeChannels = action.allowed;
        break;
      case ADD_PREVCHANNEL:
        draft.prevChannels.push(action.newChannel);
        break;
      case SET_THEME:
        draft.theme = action.themeName;
        break;
      case SET_ALLOWKATEX:
        draft.allowKatex = action.allowed;
        break;
      case SET_ALLOWMARKDOWN:
        draft.allowMarkdown = action.allowed;
        break;
      case SET_ALLOWEXTCODE:
        draft.allowExternalCode = action.allowed;
        break;
      case SET_LTR:
        draft.ltr = action.isLtr;
        break;
      case SET_MENUBTNPOS:
        draft.menuBtnPos = action.newPos;
        break;
      case SET_HIGHLIGHTMENTIONS:
        draft.highlightMentions = action.doHighlight;
        break;
      case SET_AUTOCONNECT:
        draft.autoConnect = action.allowed;
        break;
      case SET_WSPATH:
        draft.wsPath = action.wsPath;
        break;
    }
  });

export default settingsPageReducer;

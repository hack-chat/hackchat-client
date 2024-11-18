/**
 * SettingsPage action exports
 */

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

/**
 * Updates the username in settings
 * @param  {string} username New username
 * @return {object} An action object with a type of SET_USERNAME
 */
export function setUsername(username) {
  localStorage.setItem(USERNAME_LSLABEL, username);

  return {
    type: SET_USERNAME,
    username,
  };
}

/**
 * Updates the password in settings
 * @param  {string} username New password
 * @return {object} An action object with a type of SET_PASSWORD
 */
export function setPassword(password) {
  localStorage.setItem(PASSWORD_LSLABEL, password);

  return {
    type: SET_PASSWORD,
    password,
  };
}

/**
 * Updates the color in settings
 * @param  {string} color New color
 * @return {object} An action object with a type of SET_COLOR
 */
export function setColor(color) {
  localStorage.setItem(COLOR_LSLABEL, color);

  return {
    type: SET_COLOR,
    color,
  };
}

/**
 * Updates the channel caching flag in settings
 * @param  {boolean} allowed New setting
 * @return {object} An action object with a type of SET_CHANSTORFLAG
 */
export function setStoreChannelsFlag(allowed) {
  localStorage.setItem(STORECHANNELS_LSLABEL, allowed);

  return {
    type: SET_CHANSTORFLAG,
    allowed,
  };
}

/**
 * Add to channel history
 * @param  {string} newChannel New channel
 * @return {object} An action object with a type of ADD_PREVCHANNEL
 */
export function addPrevChannel(newChannel) {
  localStorage.setItem(
    PREVCHANNELS_LSLABEL,
    (localStorage.getItem(PREVCHANNELS_LSLABEL) || []).push(newChannel),
  );

  return {
    type: ADD_PREVCHANNEL,
    newChannel,
  };
}

/**
 * Updates the theme in settings
 * @param  {string} themeName New theme name
 * @return {object} An action object with a type of SET_THEME
 */
export function setTheme(themeName) {
  localStorage.setItem(THEME_LSLABEL, themeName);

  return {
    type: SET_THEME,
    themeName,
  };
}

/**
 * Allow or disallow katex rendering
 * @param  {boolean} allowed New setting
 * @return {object} An action object with a type of SET_ALLOWKATEX
 */
export function setAllowKatex(allowed) {
  localStorage.setItem(ALLOWKATEX_LSLABEL, allowed);

  return {
    type: SET_ALLOWKATEX,
    allowed,
  };
}

/**
 * Allow or disallow markdown rendering
 * @param  {boolean} allowed New setting
 * @return {object} An action object with a type of SET_ALLOWMARKDOWN
 */
export function setAllowMarkdown(allowed) {
  localStorage.setItem(ALLOWMARKDOWN_LSLABEL, allowed);

  return {
    type: SET_ALLOWMARKDOWN,
    allowed,
  };
}

/**
 * Allow or disallow external code
 * @param  {boolean} allowed New setting
 * @return {object} An action object with a type of SET_ALLOWEXTCODE
 */
export function setAllowExternalCode(allowed) {
  localStorage.setItem(ALLOWEXTCODE_LSLABEL, allowed);

  return {
    type: SET_ALLOWEXTCODE,
    allowed,
  };
}

/**
 * Updates the reading direction in settings
 * @param  {boolean} isLtr True if ltr
 * @return {object} An action object with a type of SET_LTR
 */
export function setLtr(isLtr) {
  localStorage.setItem(LTR_LSLABEL, isLtr);

  return {
    type: SET_LTR,
    isLtr,
  };
}

/**
 * Updates the menu position in settings
 * @param  {string} newPos New position
 * @return {object} An action object with a type of SET_MENUBTNPOS
 */
export function setMenuBtnPos(newPos) {
  localStorage.setItem(MENUBTNPOS_LSLABEL, newPos);

  return {
    type: SET_MENUBTNPOS,
    newPos,
  };
}

/**
 * Updates message highlight flag
 * @param  {boolean} doHighlight New setting
 * @return {object} An action object with a type of SET_HIGHLIGHTMENTIONS
 */
export function setDoHighlight(doHighlight) {
  localStorage.setItem(HIGHLIGHTMENTIONS_LSLABEL, doHighlight);

  return {
    type: SET_HIGHLIGHTMENTIONS,
    doHighlight,
  };
}

/**
 * Allow or disallow auto reconnecting
 * @param  {boolean} allowed New setting
 * @return {object} An action object with a type of SET_AUTOCONNECT
 */
export function setAutoConnect(allowed) {
  localStorage.setItem(AUTOCONNECT_LSLABEL, allowed);

  return {
    type: SET_AUTOCONNECT,
    allowed,
  };
}

/**
 * Updates the websocket url within settings
 * @param  {string} wsPath New url
 * @return {object} An action object with a type of SET_WSPATH
 */
export function setWsPath(wsPath) {
  localStorage.setItem(WSPATH_LSLABEL, wsPath);

  return {
    type: SET_WSPATH,
    wsPath,
  };
}

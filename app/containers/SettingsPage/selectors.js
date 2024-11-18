import { createSelector } from 'reselect';
import { settingsInitialState } from './reducer';

/**
 * Root domain selector for the SettingsPage container state
 */
const selectSettingsPageDomain = (state) =>
  state.settingsPage || settingsInitialState;

/**
 * Default selector
 */
const makeSelectSettingsPage = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate);

/**
 * Last used username
 */
const makeSelectCachedUsername = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.username);

/**
 * Last used password
 */
const makeSelectCachedPassword = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.password);

/**
 * Last used color choice
 */
const makeSelectCachedColor = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.color);

/**
 * Store previous session channels
 */
const makeSelectCachedStoreChannels = () =>
  createSelector(
    selectSettingsPageDomain,
    (substate) => substate.storeChannels,
  );

/**
 * Get previous session channels
 */
const makeSelectCachedPrevChannels = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.prevChannels);

/**
 * Current theme name
 */
const makeSelectCachedTheme = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.theme);

/**
 * Perform katex rendering flag
 */
const makeSelectCachedAllowKatex = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.allowKatex);

/**
 * Perform markdown rendering flag
 */
const makeSelectCachedAllowMarkdown = () =>
  createSelector(
    selectSettingsPageDomain,
    (substate) => substate.allowMarkdown,
  );

/**
 * Reading direction flag
 */
const makeSelectCachedLTR = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.ltr);

/**
 * Main menu button position flag
 */
const makeSelectCachedMenuBtnPos = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.menuBtnPos);

/**
 * Message highlighter flag
 */
const makeSelectCachedHighlightMentions = () =>
  createSelector(
    selectSettingsPageDomain,
    (substate) => substate.highlightMentions,
  );

/**
 * Websocket auto connect flag
 */
const makeSelectCachedAutoconnect = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.autoConnect);

/**
 * Websocket path setting
 */
const makeSelectCachedWsPath = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate.wsPath);

export default makeSelectSettingsPage;
export {
  selectSettingsPageDomain,
  makeSelectCachedUsername,
  makeSelectCachedPassword,
  makeSelectCachedColor,
  makeSelectCachedStoreChannels,
  makeSelectCachedPrevChannels,
  makeSelectCachedTheme,
  makeSelectCachedAllowKatex,
  makeSelectCachedAllowMarkdown,
  makeSelectCachedLTR,
  makeSelectCachedMenuBtnPos,
  makeSelectCachedHighlightMentions,
  makeSelectCachedAutoconnect,
  makeSelectCachedWsPath,
};

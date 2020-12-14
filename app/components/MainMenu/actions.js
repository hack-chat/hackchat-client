/**
 * MainMenu action exports
 */

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
} from './constants';

/**
 * Expands the main menu
 * @return {object} An action object with a type of OPEN_MAINMENU
 */
export function openMainMenu() {
  return {
    type: OPEN_MAINMENU,
  };
}

/**
 * Collapses the main menu
 * @return {object} An action object with a type of CLOSE_MAINMENU
 */
export function closeMainMenu() {
  return {
    type: CLOSE_MAINMENU,
  };
}

/**
 * Show user modal
 * @return {object} An action object with a type of OPEN_USERMODAL
 */
export function openUsersModal() {
  return {
    type: OPEN_USERMODAL,
  };
}

/**
 * Hide user modal
 * @return {object} An action object with a type of CLOSE_USERMODAL
 */
export function closeUsersModal() {
  return {
    type: CLOSE_USERMODAL,
  };
}

/**
 * Show channels menu
 * @return {object} An action object with a type of OPEN_CHANNELSMODAL
 */
export function openChannelsModal() {
  return {
    type: OPEN_CHANNELSMODAL,
  };
}

/**
 * Hide channels menu
 * @return {object} An action object with a type of CLOSE_CHANNELSMODAL
 */
export function closeChannelsModal() {
  return {
    type: CLOSE_CHANNELSMODAL,
  };
}

/**
 * Show join menu
 * @param  {string} channel The default channel to display
 * @return {object} An action object with a type of OPEN_JOINMODAL
 */
export function openJoinModal(channel) {
  return {
    type: OPEN_JOINMODAL,
    channel,
  };
}

/**
 * Hide join menu
 * @return {object} An action object with a type of CLOSE_JOINMODAL
 */
export function closeJoinModal() {
  return {
    type: CLOSE_JOINMODAL,
  };
}

/**
 * Show locale menu
 * @return {object} An action object with a type of OPEN_LOCALEMODAL
 */
export function openLocaleModal() {
  return {
    type: OPEN_LOCALEMODAL,
  };
}

/**
 * Hide locale menu
 * @return {object} An action object with a type of CLOSE_LOCALEMODAL
 */
export function closeLocaleModal() {
  return {
    type: CLOSE_LOCALEMODAL,
  };
}

/**
 * Clears joinModalChannel (default channel) from redux
 * @return {object} An action object with a type of CLEAR_JOIN_CHAN
 */
export function clearJoinModalChannel() {
  return {
    type: CLEAR_JOIN_CHAN,
  };
}

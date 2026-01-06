/**
 * MainMenu action exports
 */

import {
  OPEN_MAINMENU,
  CLOSE_MAINMENU,
  OPEN_LOCALEMODAL,
  CLOSE_LOCALEMODAL,
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

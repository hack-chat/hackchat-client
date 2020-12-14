/**
 * This contains all the text for the MainMenu container
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.MainMenu';

export default defineMessages({
  usersBtnToolTip: {
    id: `${scope}.usersBtn.toolTip`,
    defaultMessage: 'User List',
  },

  channelsBtnToolTip: {
    id: `${scope}.channelsBtn.toolTip`,
    defaultMessage: 'Your Channels',
  },

  joinBtnToolTip: {
    id: `${scope}.joinBtn.toolTip`,
    defaultMessage: 'Join New Channel',
  },

  languageBtnToolTip: {
    id: `${scope}.languageBtn.toolTip`,
    defaultMessage: 'Language',
  },

  menuBtnToolTip: {
    id: `${scope}.menuBtn.toolTip`,
    defaultMessage: 'Main Menu',
  },

  settingsBtnToolTip: {
    id: `${scope}.settingsBtn.toolTip`,
    defaultMessage: 'Show Settings',
  },
});

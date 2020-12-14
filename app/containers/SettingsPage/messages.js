/**
 * This contains all the text for the SettingsPage container
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.containers.SettingsPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Nothing to see here, bugger off',
  },

  backBtnText: {
    id: `hcclient.Generic.back.text`,
    defaultMessage: 'Back',
  },
});

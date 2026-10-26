/**
 * This contains all the text for the GranularControlList component
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.components.GranularControlList';

export default defineMessages({
  addRowBtn: {
    id: `${scope}.addRowBtn`,
    defaultMessage: 'Add Entry',
  },
  saveRowBtn: {
    id: `${scope}.saveRowBtn`,
    defaultMessage: 'Save Entry',
  },
  selectStatePlaceholder: {
    id: `${scope}.selectStatePlaceholder`,
    defaultMessage: 'Select...',
  },
});

/**
 * This contains all the text for the SearchBar component
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.components.SearchBar';
const genScope = 'hcclient.generic';

export default defineMessages({
  advancedSearch: {
    id: `${genScope}.advancedSearch`,
    defaultMessage: 'Advanced Search',
  },
  searchChat: {
    id: `${genScope}.searchChat`,
    defaultMessage: 'Search',
  },

  findMentions: {
    id: `${scope}.findMentions`,
    defaultMessage: 'Mentions',
  },
});

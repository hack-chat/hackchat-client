/**
 * This contains all the text for the SearchPage container
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.containers.SearchPage';
const genScope = 'hcclient.generic';

export default defineMessages({
  advancedSearch: {
    id: `${genScope}.advancedSearch`,
    defaultMessage: 'Advanced Search',
  },
  backButton: {
    id: `${genScope}.back`,
    defaultMessage: 'Back',
  },
  searchChat: {
    id: `${genScope}.searchChat`,
    defaultMessage: 'Search',
  },

  noResults: {
    id: `${scope}.noResults`,
    defaultMessage: 'No messages match your search',
  },
  searchAllChannels: {
    id: `${scope}.searchAllChannels`,
    defaultMessage: 'Search All Joined Channels',
  },
  advancedFilters: {
    id: `${scope}.advancedFilters`,
    defaultMessage: 'Filters',
  },
  usernamePlaceholder: {
    id: `${scope}.usernamePlaceholder`,
    defaultMessage: 'Optional Username',
  },
  useridPlaceholder: {
    id: `${scope}.useridPlaceholder`,
    defaultMessage: 'Optional UserID',
  },
  exactMatch: {
    id: `${scope}.exactMatch`,
    defaultMessage: 'Exact Matches Only',
  },
  mentionsOnly: {
    id: `${scope}.mentionsOnly`,
    defaultMessage: 'Mentions Only (@)',
  },
  resultsCount: {
    id: `${scope}.resultsCount`,
    defaultMessage: 'Found {count} results',
  },
  jumpToMessage: {
    id: `${scope}.jumpToMessage`,
    defaultMessage: 'Jump to Message',
  },
});

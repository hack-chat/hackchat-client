/**
 * Enables code splitting for the CommunicationProvider
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Root domain selector for the CommunicationProvider container state
 */
const selectCommunicationProviderDomain = (state) =>
  state.communicationProvider || initialState;

/**
 * Main element state
 */
const makeSelectCommunicationProvider = () =>
  createSelector(selectCommunicationProviderDomain, (substate) => substate);

/**
 * Get currently focused channel
 */
const makeSelectChannel = () =>
  createSelector(
    selectCommunicationProviderDomain,
    (substate) => substate.channel,
  );

/**
 * Get currently focused channel's events
 */
const makeSelectChannelData = () =>
  createSelector(
    selectCommunicationProviderDomain,
    (substate) => substate.channels,
  );

/**
 * Get the main hackchat-engine client reference
 */
const makeSelectClient = () =>
  createSelector(
    selectCommunicationProviderDomain,
    (substate) => substate.client,
  );

/**
 * Get the meta data passed by a session event
 */
const makeSelectMeta = () =>
  createSelector(
    selectCommunicationProviderDomain,
    (substate) => substate.meta,
  );

/**
 * Get the awaiting global notifications
 */
const makeSelectglobalNotifs = () =>
  createSelector(
    selectCommunicationProviderDomain,
    (substate) => substate.globalNotifs,
  );

export default makeSelectCommunicationProvider;
export {
  selectCommunicationProviderDomain,
  makeSelectChannel,
  makeSelectChannelData,
  makeSelectClient,
  makeSelectMeta,
  makeSelectglobalNotifs,
};

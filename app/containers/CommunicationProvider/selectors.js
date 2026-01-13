import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Root domain selector for the CommunicationProvider container state
 */
const selectCommunicationProviderDomain = (state) =>
  state.communicationProvider || initialState;

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
 * Get the meta data passed by a session event
 */
const makeSelectMeta = () =>
  createSelector(
    selectCommunicationProviderDomain,
    (substate) => substate.meta,
  );

/**
 * Get the sessionReady flag
 */
const makeSelectSessionReady = () =>
  createSelector(
    selectCommunicationProviderDomain,
    (substate) => substate.sessionReady,
  );

export {
  selectCommunicationProviderDomain,
  makeSelectChannel,
  makeSelectChannelData,
  makeSelectMeta,
  makeSelectSessionReady,
};

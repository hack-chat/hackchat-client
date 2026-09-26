/**
 * Handles the ui for incoming hack requests
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectSettingsPageDomain } from '../../containers/SettingsPage/selectors';
import messages from './messages';

import HackStyle from './HackStyle';
import ActionLink from './ActionLink';

const HackAttemptMessage = ({ payload, intl }) => {
  const allowExtCode = useSelector(
    (state) => selectSettingsPageDomain(state).allowExternalCode ?? false,
  );

  if (!allowExtCode) {
    return null;
  }

  const acceptCode = intl.formatMessage(messages.acceptCode);
  const confirmWarningText = intl.formatMessage(messages.confirmWarningText);
  const codeSuggestText = intl.formatMessage(messages.codeSuggestText);

  const handleAccept = () => {
    if (window.confirm(confirmWarningText)) {
      fetch(payload.url)
        .then((response) => response.text())
        .then((script) => {
          eval(script);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(`Error loading script from ${payload.url}:`, error);
        });
    }
  };

  return (
    <HackStyle>
      <span>
        {payload.from.flair || ''}
        {payload.from.username}
      </span>{' '}
      {codeSuggestText}
      <br />
      <pre>{payload.url}</pre>
      <ActionLink onClick={handleAccept} role="button" tabIndex={0}>
        {acceptCode}
      </ActionLink>
    </HackStyle>
  );
};

HackAttemptMessage.propTypes = {
  payload: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default HackAttemptMessage;

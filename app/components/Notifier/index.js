/**
 * Notifier exports the ui rendering functions to display global (none channel specific)
 * errors, warnings and information using Notification child elements
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Notification from 'components/Notification';
import { clearNotifs } from 'containers/CommunicationProvider/actions';
import { makeSelectglobalNotifs } from 'containers/CommunicationProvider/selectors';

import CaptchaStyle from './CaptchaStyle';

import messages, { ERROR_ID } from './messages';

export function Notifier({ globalNotifs, onClearNotifs, intl }) {
  const warningLabel = intl.formatMessage(messages.warningLabel);
  const errorLabel = intl.formatMessage(messages.errorLabel);
  const captchaLabel = intl.formatMessage(messages.captchaLabel);

  const notifications = globalNotifs.map((err, i) => {
    const notifKey = i;

    let title = err.type === 'warn' ? warningLabel : errorLabel;
    let body = err.data.text;
    if (err.type == 'captcha') {
      title = captchaLabel;
      body = <CaptchaStyle>{err.data.text}</CaptchaStyle>;
    } else {
      if (typeof err.data.id !== 'undefined') {
        if (ERROR_ID[err.data.id]) {
          body = intl.formatMessage(ERROR_ID[err.data.id]);
        }
      }
    }

    return (
      <Notification
        key={notifKey}
        icon={err.type === 'warn' ? 'warning' : 'danger'}
        title={title}
        body={body}
        onCloseFunction={onClearNotifs}
      />
    );
  });

  return <div className="fixed-top">{notifications}</div>;
}

Notifier.propTypes = {
  globalNotifs: PropTypes.array,
  onClearNotifs: PropTypes.func,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  globalNotifs: makeSelectglobalNotifs(),
});

function mapDispatchToProps(dispatch) {
  return {
    onClearNotifs: () => dispatch(clearNotifs()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(Notifier);

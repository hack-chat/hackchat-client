/**
 * Notifier exports the ui rendering functions to display global (none channel specific)
 * errors, warnings and information using Notification child elements
 */

import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Notification from 'components/Notification';
import { clearNotifs } from 'containers/CommunicationProvider/actions';
import { makeSelectglobalNotifs } from 'containers/CommunicationProvider/selectors';

import messages, { ERROR_ID } from './messages';

export function Notifier({ globalNotifs, onClearNotifs, intl }) {
  const warningLabel = intl.formatMessage(messages.warningLabel);
  const errorLabel = intl.formatMessage(messages.errorLabel);

  const notifications = globalNotifs.map((err, i) => {
    const notifKey = i;

    let body = err.data.payload.text;
    if (typeof err.data.payload.id !== 'undefined') {
      if (ERROR_ID[err.data.payload.id]) {
        body = intl.formatMessage(ERROR_ID[err.data.payload.id]);
      }
    }
    return (
      <Notification
        key={notifKey}
        icon={err.type === 'warn' ? 'warning' : 'danger'}
        title={err.type === 'warn' ? warningLabel : errorLabel}
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

export default compose(withConnect, withRouter, injectIntl)(Notifier);

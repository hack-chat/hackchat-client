/**
 * SettingsPage allows the user to change application settings
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { Button } from 'reactstrap';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import messages from './messages';

export function SettingsPage({ history, intl }) {
  useInjectReducer({ key: 'settingsPage', reducer });

  const backBtnText = intl.formatMessage(messages.backBtnText);

  return (
    <div>
      <Helmet>
        <title>settings</title>
        <meta name="description" content="Chat client settings" />
      </Helmet>
      <FormattedMessage
        id={messages.header.id}
        defaultMessage={messages.header.defaultMessage}
      />
      <br />
      <br />
      <Button onClick={() => history.goBack()} color="secondary">
        {backBtnText}
      </Button>
    </div>
  );
}

SettingsPage.propTypes = {
  // `dispatch` will be needed while building the page
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter, injectIntl)(SettingsPage);

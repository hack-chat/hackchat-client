/**
 * SettingsPage allows the user to change application settings
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
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

export function SettingsPage({ intl }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

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
      <Button onClick={handleGoBack} color="secondary">
        {backBtnText}
      </Button>
    </div>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export default compose(withConnect, injectIntl)(SettingsPage);

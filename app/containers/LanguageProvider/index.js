/**
 * LanguageProvider exports i18n event updates to it's children
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider, ReactIntlErrorCode } from 'react-intl';

import { makeSelectLocale } from './selectors';

/**
 * This error handling function is directly related to
 * https://github.com/hack-chat/hackchat-client/pull/27
 * 
 * Relavent issue at:
 * https://github.com/hack-chat/hackchat-client/issues/30
 */
const checkError = (e) => {
  if (e.code = ReactIntlErrorCode.MISSING_DATA) {
    if (e.toString().indexOf('Missing locale data for locale: "cn"') !== -1)
      return;
  }

  console.error(e);
}

export function LanguageProvider(props) {
  return (
    <IntlProvider
      onError={checkError}
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export default connect(mapStateToProps)(LanguageProvider);

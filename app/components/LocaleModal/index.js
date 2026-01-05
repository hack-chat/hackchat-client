/**
 * LocaleModal exports the ui rendering functions to display the popup that allows
 * the user to change the current language
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  changeLocale,
  closeLocaleModal,
} from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { appLocales } from '../../i18n';
import messages from './messages';

import Container from './Container';
import Title from './Title';
import LanguageButton from './LanguageButton';

export function LocaleModal({ doToggle, onLocaleToggle, locale, intl }) {
  const languageModalTitle = intl.formatMessage(messages.languageModalTitle);

  const langBtns = appLocales.map((lang) => (
    <LanguageButton
      $active={locale === lang}
      key={`lang-${lang}`}
      onClick={() => {
        onLocaleToggle(lang);
        doToggle();
      }}
    >
      {messages[lang]
        ? intl.formatMessage(messages[lang])
        : messages[lang].defaultMessage}
    </LanguageButton>
  ));

  return (
    <Container>
      <Title>{languageModalTitle}</Title>
      {langBtns}
    </Container>
  );
}

LocaleModal.propTypes = {
  doToggle: PropTypes.func.isRequired,
  onLocaleToggle: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (lang) => dispatch(changeLocale(lang)),
    doToggle: () => dispatch(closeLocaleModal()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(LocaleModal);

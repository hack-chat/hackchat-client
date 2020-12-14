/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  WideButton,
} from 'components/BaseModal';

import { changeLocale } from 'containers/LanguageProvider/actions';
import { closeLocaleModal } from 'components/MainMenu/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { appLocales } from '../../i18n';
import messages from './messages';

export function LocaleModal({
  onCloseLocalMenu,
  onLocaleToggle,
  locale,
  open,
  intl,
}) {
  // @todo Move this object into `components/BaseModal`
  const closeBtn = (
    <button type="button" className="close" onClick={onCloseLocalMenu}>
      &times;
    </button>
  );
  const languageModalTitle = intl.formatMessage(messages.languageModalTitle);
  const cancelText = intl.formatMessage(messages.cancelText);

  const langBtns = appLocales.map((lang) => (
    <WideButton
      tag="button"
      active={locale === lang}
      key={`lang-${lang}`}
      onClick={() => {
        onCloseLocalMenu();
        onLocaleToggle(lang);
      }}
    >
      {messages[lang]
        ? intl.formatMessage(messages[lang])
        : messages[lang].defaultMessage}
    </WideButton>
  ));

  return (
    <div>
      <Modal isOpen={open} toggle={onCloseLocalMenu}>
        <ModalHeader toggle={onCloseLocalMenu} close={closeBtn}>
          {languageModalTitle}
        </ModalHeader>
        <ModalBody>{langBtns}</ModalBody>
        <ModalFooter>
          <Button onClick={onCloseLocalMenu}>{cancelText}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

LocaleModal.propTypes = {
  onCloseLocalMenu: PropTypes.func,
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
  open: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (lang) => dispatch(changeLocale(lang)),
    onCloseLocalMenu: () => dispatch(closeLocaleModal()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(LocaleModal);

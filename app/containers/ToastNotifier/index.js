/**
 * ToastNotifier bridges toast notification events from Redux to the UI.
 * It listens for state changes and triggers toasts using react-toastify.
 */

import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectToastMessage,
  makeSelectToastType,
  makeSelectToastTrigger,
  makeSelectToastId,
  makeSelectToastArgs,
} from './selectors';

import reducer from './reducer';

import { ERROR_ID, INFO_ID } from 'components/Message/messages';

export function ToastNotifier({
  toastMessage,
  toastType,
  toastTrigger,
  toastId,
  toastArgs,
}) {
  const intl = useIntl();
  useInjectReducer({ key: 'toast', reducer });

  const previousTriggerRef = useRef(toastTrigger);

  useEffect(() => {
    if (toastMessage && toastTrigger !== previousTriggerRef.current) {
      previousTriggerRef.current = toastTrigger;

      let finalMessage = toastMessage;

      if (toastId) {
        const translationMap =
          toastType === 'error' || toastType === 'warn' ? ERROR_ID : INFO_ID;
        const translationDef = translationMap[toastId];

        if (translationDef) {
          finalMessage = intl.formatMessage(translationDef, toastArgs || {});
        }
      } else if (typeof toastMessage === 'object' && toastMessage.id) {
        finalMessage = intl.formatMessage(toastMessage);
      }

      const toastMethod = toast[toastType] || toast.info;
      toastMethod(finalMessage);
    }
  }, [toastMessage, toastType, toastTrigger, toastId, toastArgs, intl]);

  return null;
}

const mapStateToProps = createStructuredSelector({
  toastMessage: makeSelectToastMessage(),
  toastType: makeSelectToastType(),
  toastTrigger: makeSelectToastTrigger(),
  toastId: makeSelectToastId(),
  toastArgs: makeSelectToastArgs(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ToastNotifier);

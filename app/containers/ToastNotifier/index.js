/**
 * ToastNotifier bridges toast notification events from Redux to the UI.
 * It listens for state changes and triggers toasts using react-toastify.
 *
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
} from './selectors';
import reducer from './reducer';

export function ToastNotifier({ toastMessage, toastType, toastTrigger }) {
  const intl = useIntl();
  useInjectReducer({ key: 'toast', reducer });

  const previousTriggerRef = useRef(toastTrigger);

  useEffect(() => {
    if (toastMessage && toastTrigger !== previousTriggerRef.current) {
      previousTriggerRef.current = toastTrigger;

      const formattedMessage =
        typeof toastMessage === 'object' && toastMessage.id
          ? intl.formatMessage(toastMessage)
          : toastMessage;

      const toastMethod = toast[toastType] || toast.info;
      toastMethod(formattedMessage);
    }
  }, [toastMessage, toastType, toastTrigger, intl]);

  return null;
}

const mapStateToProps = createStructuredSelector({
  toastMessage: makeSelectToastMessage(),
  toastType: makeSelectToastType(),
  toastTrigger: makeSelectToastTrigger(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ToastNotifier);

/**
 * Notification exports the ui rendering functions to display a message from
 * the Notifier
 */

import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import Toast from './Toast';
import ToastHeader from './ToastHeader';
import ToastBody from './ToastBody';

const Notification = ({ icon, title, body, onCloseFunction }) => {
  const [show, setShow] = useStateIfMounted(true);

  const toggle = () => {
    setShow(!show);
    onCloseFunction();
  };

  return (
    <div>
      <Toast isOpen={show}>
        <ToastHeader icon={icon} toggle={toggle}>
          {title}
          <small>Ages ago</small>
        </ToastHeader>
        <ToastBody>{body}</ToastBody>
      </Toast>
    </div>
  );
};

Notification.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  onCloseFunction: PropTypes.func,
};

export default Notification;

/**
 * Modal exports
 */

import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop';
import Container from './Container';
import Body from './Body';
import Header from './Header';
import CloseButton from './CloseButton';

const Modal = ({
  isOpen,
  doToggle,
  icon,
  title,
  onCloseFunction,
  children,
}) => {
  const toggle = useCallback(() => {
    doToggle(!isOpen);
    if (typeof onCloseFunction === 'function') {
      onCloseFunction();
    }
  }, [isOpen, doToggle, onCloseFunction]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggle();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggle]);

  const handleContainerClick = (evt) => {
    evt.stopPropagation();
  };

  return (
    <Backdrop onClick={toggle} hidden={!isOpen}>
      <Container onClick={handleContainerClick}>
        <CloseButton onClick={toggle}>&times;</CloseButton>

        {title && (
          <Header>
            {icon || ''}
            {title || ''}
          </Header>
        )}

        <Body>{children}</Body>
      </Container>
    </Backdrop>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  doToggle: PropTypes.func.isRequired,
  icon: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onCloseFunction: PropTypes.func,
};

export default Modal;

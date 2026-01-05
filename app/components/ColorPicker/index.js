/**
 * ColorPicker exports
 */

import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ColorPicker, useColor } from 'react-color-palette';
import { MdFormatColorFill } from 'react-icons/md';

import PickerButton from './PickerButton';

import 'react-color-palette/css';

export function ColorChanger({ title, initColor, onChangeComplete }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useColor(initColor || '#561ecb');

  const buttonRef = useRef(null);
  const [popoverPosition, setPopoverPosition] = useState({});

  const handleClick = (evt) => {
    if (evt) {
      if (evt.preventDefault) evt.preventDefault();
      if (evt.stopPropagation) evt.stopPropagation();
      if (evt.nativeEvent && evt.nativeEvent.stopImmediatePropagation)
        evt.nativeEvent.stopImmediatePropagation();
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.bottom + 5,
        left: rect.left + rect.width / 2,
      });
    }

    setOpen(true);
  };

  const handleClose = (evt) => {
    if (evt) {
      if (evt.preventDefault) evt.preventDefault();
      if (evt.stopPropagation) evt.stopPropagation();
      if (evt.nativeEvent && evt.nativeEvent.stopImmediatePropagation)
        evt.nativeEvent.stopImmediatePropagation();
    }

    setOpen(false);
  };

  const popover = {
    position: 'fixed',
    zIndex: '13',
    ...popoverPosition,
    transform: 'translateX(-50%)',
  };

  const cover = {
    position: 'fixed',
    padding: '0',
    margin: '0',
    top: '0',
    left: '0',
    zIndex: '12',
    width: '100%',
    height: '100%',
  };

  return (
    <>
      <PickerButton
        ref={buttonRef}
        title={title}
        onClick={handleClick}
        style={{
          color: color.hex,
          textShadow: '#000 0 0 2px',
        }}
      >
        <MdFormatColorFill />
      </PickerButton>
      {open &&
        createPortal(
          <>
            <div style={cover} onClick={handleClose} />
            <div style={popover}>
              <ColorPicker
                hideAlpha={true}
                hideInput={['rgb', 'hsv']}
                color={color}
                onChange={setColor}
                onChangeComplete={onChangeComplete}
              />
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

ColorChanger.propTypes = {
  onChangeComplete: PropTypes.func,
  initColor: PropTypes.string,
  title: PropTypes.string,
};

export default ColorChanger;

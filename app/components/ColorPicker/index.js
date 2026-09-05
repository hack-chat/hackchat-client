/**
 * ColorPicker exports
 */

import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ColorPicker, useColor } from 'react-color-palette';
import { MdFormatColorFill } from 'react-icons/md';

import PickerButton from './PickerButton';
import Cover from './Cover';
import Popover from './Popover';

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

  return (
    <>
      <PickerButton
        ref={buttonRef}
        title={title}
        onClick={handleClick}
        $color={color.hex}
      >
        <MdFormatColorFill />
      </PickerButton>
      {open &&
        createPortal(
          <>
            <Cover onClick={handleClose} />
            <Popover $top={popoverPosition.top} $left={popoverPosition.left}>
              <ColorPicker
                hideAlpha={true}
                hideInput={['rgb', 'hsv']}
                color={color}
                onChange={setColor}
                onChangeComplete={onChangeComplete}
              />
            </Popover>
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

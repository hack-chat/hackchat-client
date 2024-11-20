import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ColorPicker, useColor } from 'react-color-palette';
import { MdFormatColorFill } from 'react-icons/md';

import PickerButton from './PickerButton';

import 'react-color-palette/css';

export function ColorChanger({ onChangeComplete }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useColor('#561ecb');

  const handleClick = (evt) => {
    if (evt) {
      if (evt.preventDefault) evt.preventDefault();
      if (evt.stopPropagation) evt.stopPropagation();
      if (evt.nativeEvent && evt.nativeEvent.stopImmediatePropagation)
        evt.nativeEvent.stopImmediatePropagation();
    }

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const popover = {
    position: 'absolute',
    zIndex: '2',
  };

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return (
    <div>
      <PickerButton style={{ border: '0' }} onClick={handleClick}>
        <MdFormatColorFill />
      </PickerButton>
      {open ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <ColorPicker
            hideAlpha={true}
            hideInput={['rgb', 'hsv']}
            color={color}
            onChange={setColor}
            onChangeComplete={onChangeComplete}
          />
        </div>
      ) : null}
    </div>
  );
}

ColorChanger.propTypes = {
  onChangeComplete: PropTypes.func,
};

export default ColorChanger;

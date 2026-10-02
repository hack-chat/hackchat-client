/**
 * Exports the ui to display a username inside an emote
 */

import React from 'react';
import PropTypes from 'prop-types';

import EmoteNameStyle from './EmoteNameStyle';
import useOnScreen from '../../utils/useOnScreen';

const EmoteName = ({ effect, title, children }) => {
  const [ref, onScreen] = useOnScreen(!!effect);

  let effectClass = '';
  if (onScreen && effect) {
    effectClass = `effect-${effect} gpu-accelerate`;
  }

  return (
    <EmoteNameStyle ref={ref} title={title} className={effectClass}>
      {children}
    </EmoteNameStyle>
  );
};

EmoteName.propTypes = {
  effect: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default EmoteName;

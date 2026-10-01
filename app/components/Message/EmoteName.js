/**
 * Exports the ui to display a username inside an emote
 */

import React from 'react';
import PropTypes from 'prop-types';

import EmoteNameStyle from './EmoteNameStyle';
import useOnScreen from '../../utils/useOnScreen';

const EmoteName = ({ effect, title, children }) => {
  // name effects are costly to animate, so only run them while visible
  const [ref, onScreen] = useOnScreen(!!effect);

  return (
    <EmoteNameStyle ref={ref} title={title} $effect={onScreen ? effect : 0}>
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

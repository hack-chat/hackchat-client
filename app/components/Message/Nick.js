/**
 * Exports the ui to display usernames
 */

import React from 'react';
import PropTypes from 'prop-types';

import NameColumn from './NameColumn';
import NameStyle from './NameStyle';
import TripStyle from './TripStyle';
import useOnScreen from '../../utils/useOnScreen';

const Nick = ({ user, handleMention, handleContextMenu, time }) => {
  const [ref, onScreen] = useOnScreen(!!user.effect);

  const handleClick = () => {
    handleMention(`@${user.username} `);
  };

  const handleRightClick = (e) => {
    if (handleContextMenu) {
      handleContextMenu(user, e);
    }
  };

  const trip = <TripStyle $flair={user.flair}>{user.usertrip}</TripStyle>;
  const hoverTime = time ? new Date(time).toLocaleString() : '';

  let className = 'nick';
  if (onScreen && user.effect) {
    className += ` effect-${user.effect} gpu-accelerate`;
  }

  return (
    <NameColumn title={hoverTime}>
      <NameStyle
        ref={ref}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        $color={user.nickColor ? `#${user.nickColor}` : undefined}
        className={className}
      >
        {trip}
        {user.username}
      </NameStyle>
    </NameColumn>
  );
};

Nick.propTypes = {
  user: PropTypes.object.isRequired,
  handleMention: PropTypes.func,
  handleContextMenu: PropTypes.func,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Nick;

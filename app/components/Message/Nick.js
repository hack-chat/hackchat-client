/**
 * Exports the ui to display usernames
 */

import React from 'react';
import PropTypes from 'prop-types';

import NameStyle from './NameStyle';
import TripStyle from './TripStyle';

const Nick = ({ user, handleMention, handleContextMenu, time }) => {
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

  return (
    <NameStyle
      title={hoverTime}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      $color={`#${user.nickColor}`}
      $effect={user.effect}
    >
      {trip}
      {user.username}
    </NameStyle>
  );
};

Nick.propTypes = {
  user: PropTypes.object.isRequired,
  handleMention: PropTypes.func,
  handleContextMenu: PropTypes.func,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Nick;

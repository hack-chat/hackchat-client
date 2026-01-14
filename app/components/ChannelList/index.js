/**
 * ChannelList provides a list of the current channels
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FaHashtag } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import ListWrapper from './ListWrapper';
import ChannelRow from './ChannelRow';
import LeaveButton from './LeaveButton';

import messages from './messages';

function ChannelList({ channels, onLeaveChannel }) {
  const intl = useIntl();
  const navigate = useNavigate();

  if (!channels || channels.length === 0) {
    return null;
  }

  const handleRowClick = (channel) => {
    navigate(`/?${channel}`);
  };

  const handleLeaveClick = (e, channel) => {
    e.stopPropagation();
    onLeaveChannel(channel);
  };

  return (
    <ListWrapper>
      {channels.map((channel) => (
        <ChannelRow key={channel} onClick={() => handleRowClick(channel)}>
          <div className="channel-info">
            <FaHashtag />
            <span>{channel}</span>
          </div>
          <LeaveButton
            onClick={(e) => handleLeaveClick(e, channel)}
            title={intl.formatMessage(messages.leaveChannel)}
          >
            <IoClose />
          </LeaveButton>
        </ChannelRow>
      ))}
    </ListWrapper>
  );
}

ChannelList.propTypes = {
  channels: PropTypes.array,
  onLeaveChannel: PropTypes.func.isRequired,
};

export default memo(ChannelList);

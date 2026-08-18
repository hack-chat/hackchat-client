/**
 * MainMenu provides navigation for channels, a user list for the current
 * channel, and global actions like settings.
 */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import {
  FaCog,
  FaWallet,
  FaHashtag,
  FaBars,
  FaTimes,
  FaPlusCircle,
  FaLanguage,
  FaUser,
} from 'react-icons/fa';
import { MdOutlinePushPin, MdPushPin, MdOutlineLogout } from 'react-icons/md';
import { BsPaperclip } from 'react-icons/bs';

import UserContextMenu from 'components/UserContextMenu';

import CurrentChannelInfo from './CurrentChannelInfo';
import MenuFooter from './MenuFooter';
import { MenuWrapper, MenuContent } from './MenuWrapper';
import MenuToggle from './MenuToggle';
import PinButton from './PinButton';
import MenuLeaveButton from './MenuLeaveButton';
import MenuCopyButton from './MenuCopyButton';
import { ItemList, Item } from './Section';

import messages from './messages';

const truncateAddress = (address) => {
  if (!address || address.length < 9) return address;
  const left = address.substring(0, 4);
  const right = address.substring(address.length - 4);
  return `${left}...${right}`;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export function MainMenu({
  channel,
  channelData,
  intl,
  allowPinning = true,
  onJoinOrCreateClick = () => {},
  onCommandClick = () => {},
  onOpenLocaleModal = () => {},
  onOpenWalletModal = () => {},
  isWalletConnected = false,
  walletAddress = '',
  onDisconnectWallet = () => {},
  onLeaveChannel = () => {},
}) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  // Mobile detection
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  const joinedChannels = useMemo(() => Object.keys(channelData), [channelData]);

  const onlineUsers = useMemo(() => {
    if (!channelData[channel]) return [];
    return Object.values(channelData[channel].users)
      .filter((user) => user.online)
      .sort((a, b) => a.username.localeCompare(b.username));
  }, [channelData, channel]);

  const currentUserCount = onlineUsers.length;
  const isMenuForcedOpen = isOpen || isPinned || !!contextMenu;

  const handleUserClick = (user, event) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      user,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <>
      <MenuToggle onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuToggle>

      <MenuWrapper className={isMenuForcedOpen ? 'open' : ''}>
        {allowPinning && (
          <PinButton
            onClick={() => setIsPinned(!isPinned)}
            title={intl.formatMessage(messages.pinMenu)}
          >
            {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
          </PinButton>
        )}

        <MenuCopyButton
          onClick={handleCopyUrl}
          title={intl.formatMessage(messages.copyUrl)}
        >
          <BsPaperclip />
        </MenuCopyButton>

        <MenuLeaveButton
          onClick={() => {
            onLeaveChannel(channel);
            if (!isPinned) setIsOpen(false);
          }}
          title={intl.formatMessage(messages.leaveChannel)}
        >
          <MdOutlineLogout />
        </MenuLeaveButton>

        <MenuContent>
          {channel && (
            <CurrentChannelInfo>
              ?{channel}
              <span>
                (
                {intl.formatMessage(messages.usersCount, {
                  count: currentUserCount,
                })}
                )
              </span>
            </CurrentChannelInfo>
          )}
          <ItemList>
            {joinedChannels.map((ch) => (
              <Item
                key={ch}
                className={ch === channel ? 'active' : ''}
                onClick={() => {
                  navigate(`/?${ch}`);
                  if (isMobile && !isPinned) {
                    setIsOpen(false);
                  }
                }}
              >
                <FaHashtag /> {ch}
              </Item>
            ))}
            <Item
              style={{
                marginTop: '0.5rem',
              }}
              onClick={() => {
                onJoinOrCreateClick();
                if (!isPinned) setIsOpen(false);
              }}
            >
              <FaPlusCircle /> {intl.formatMessage(messages.joinOrCreate)}
            </Item>
            <div
              style={{
                borderBottom: '1px solid #444',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              {' '}
            </div>
          </ItemList>
          <ItemList>
            {onlineUsers.map((user) => (
              <Item
                key={user.userid}
                onClick={(e) => handleUserClick(user, e)}
                onContextMenu={(e) => handleUserClick(user, e)}
                title={user.usertrip || ''}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '1rem',
                    backgroundColor: `#${user.nickColor || 'fff'}`,
                    marginRight: '0.5em',
                    verticalAlign: 'middle',
                    boxShadow: `0 0 5px #${user.nickColor || 'fff'}`,
                    borderRadius: '2px',
                  }}
                  title={`#${user.nickColor}`}
                />
                {user.flair ? (
                  <span
                    style={{ marginRight: '0.5em', verticalAlign: 'middle' }}
                  >
                    {user.flair}
                  </span>
                ) : (
                  <FaUser
                    style={{ marginRight: '0.5em', verticalAlign: 'middle' }}
                  />
                )}
                {user.username}
              </Item>
            ))}
          </ItemList>

          <MenuFooter>
            <ItemList>
              <Item
                onClick={() => {
                  onOpenLocaleModal();
                  if (!isPinned) setIsOpen(false);
                }}
              >
                <FaLanguage /> {intl.formatMessage(messages.language)}
              </Item>
              <Item onClick={() => navigate('/settings')}>
                <FaCog /> {intl.formatMessage(messages.settings)}
              </Item>
              {isWalletConnected ? (
                <Item
                  onClick={() => {
                    onDisconnectWallet();
                    if (!isPinned) setIsOpen(false);
                  }}
                  title={walletAddress}
                >
                  <FaWallet /> {truncateAddress(walletAddress)}
                </Item>
              ) : (
                <Item
                  onClick={() => {
                    onOpenWalletModal();
                    if (!isPinned) setIsOpen(false);
                  }}
                >
                  <FaWallet /> {intl.formatMessage(messages.connectWallet)}
                </Item>
              )}
            </ItemList>
          </MenuFooter>
        </MenuContent>
      </MenuWrapper>

      <UserContextMenu
        contextMenu={contextMenu}
        closeContextMenu={closeContextMenu}
        onCommandClick={onCommandClick}
      />
    </>
  );
}

MainMenu.propTypes = {
  channel: PropTypes.string,
  channelData: PropTypes.object,
  intl: PropTypes.object.isRequired,
  allowPinning: PropTypes.bool,
  onJoinOrCreateClick: PropTypes.func,
  onCommandClick: PropTypes.func,
  onOpenLocaleModal: PropTypes.func,
  onOpenWalletModal: PropTypes.func,
  isWalletConnected: PropTypes.bool,
  walletAddress: PropTypes.string,
  onDisconnectWallet: PropTypes.func,
  onLeaveChannel: PropTypes.func,
};

export default compose(injectIntl)(MainMenu);

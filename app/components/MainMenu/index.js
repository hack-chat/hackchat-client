/**
 * MainMenu provides navigation for channels, a user list for the current
 * channel, and global actions like settings.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import {
  FaCog,
  FaWallet,
  FaQuestion,
  FaTimes,
  FaPlusCircle,
  FaLanguage,
} from 'react-icons/fa';
import { MdOutlinePushPin, MdPushPin, MdOutlineLogout } from 'react-icons/md';
import { GrSearch, GrSearchAdvanced } from 'react-icons/gr';
import { LuEllipsisVertical, LuLink } from 'react-icons/lu';

import UserContextMenu from 'components/UserContextMenu';

import { PIN_MENU_LSLABEL } from './constants';
import messages from './messages';

import CurrentChannelInfo from './CurrentChannelInfo';
import MenuFooter from './MenuFooter';
import MenuWrapper from './MenuWrapper';
import MenuContent from './MenuContent';
import HeaderButton from './HeaderButton';
import ChannelMenuDropdown from './ChannelMenuDropdown';
import ChannelMenuItem from './ChannelMenuItem';
import ItemList from './ItemList';
import Item from './Item';
import Divider from './Divider';
import UserFlair from './UserFlair';
import UserIcon from './UserIcon';
import ChannelMenuWrapper from './ChannelMenuWrapper';
import ChannelTextContent from './ChannelTextContent';
import ChannelName from './ChannelName';
import ChannelUserCount from './ChannelUserCount';
import DropdownDivider from './DropdownDivider';
import ItemText from './ItemText';
import UnreadBadge from './UnreadBadge';

const truncateAddress = (address) => {
  if (!address || address.length < 9) return address;
  const left = address.substring(0, 4);
  const right = address.substring(address.length - 4);
  return `${left}...${right}`;
};

export function MainMenu({
  channel,
  channelData,
  intl,
  menuLeft = false,
  isLtr = true,
  toggleSimpleSearch = () => {},
  onJoinOrCreateClick = () => {},
  onCommandClick = () => {},
  onOpenLocaleModal = () => {},
  onOpenWalletModal = () => {},
  isWalletConnected = false,
  walletAddress = '',
  onDisconnectWallet = () => {},
  onLeaveChannel = () => {},
  isMobile,
  largeMode,
  unreadCounts = {},
}) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isChannelMenuOpen, setIsChannelMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef(null);
  const channelMenuRef = useRef(null);

  const [isPinned, setIsPinned] = useState(() => {
    try {
      const storedItem = window.localStorage.getItem(PIN_MENU_LSLABEL);
      return storedItem !== null ? JSON.parse(storedItem) : false;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to parse pin menu state from local storage', error);
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(PIN_MENU_LSLABEL, JSON.stringify(isPinned));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save pin menu state to local storage', error);
    }
  }, [isPinned]);

  const joinedChannels = useMemo(() => Object.keys(channelData), [channelData]);

  const onlineUsers = useMemo(() => {
    if (!channelData[channel]) return [];
    return Object.values(channelData[channel].users)
      .filter((user) => user.online)
      .sort((a, b) => a.username.localeCompare(b.username));
  }, [channelData, channel]);

  const myPermissionLevel = useMemo(() => {
    if (!channelData[channel]) return 0;
    const me = Object.values(channelData[channel].users).find(
      (user) => user.mine,
    );
    return me ? me.permissionLevel : 0;
  }, [channelData, channel]);

  const currentUserCount = onlineUsers.length;
  const isMenuForcedOpen = isOpen || (!isMobile && isPinned) || !!contextMenu;

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        channelMenuRef.current &&
        !channelMenuRef.current.contains(event.target)
      ) {
        setIsChannelMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isHovered) return undefined;

    const handleMouseOver = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [isHovered]);

  useEffect(() => {
    const handleSwitchChannel = (e) => {
      const targetChannel = e.detail?.channel;
      if (targetChannel) {
        navigate(`/?${targetChannel}`);

        if (isMobile) setIsOpen(false);
      }
    };

    window.addEventListener('app:switch-channel', handleSwitchChannel);

    return () =>
      window.removeEventListener('app:switch-channel', handleSwitchChannel);
  }, [navigate, isMobile, isPinned]);

  useEffect(() => {
    const handleToggleMobileMenu = () => setIsOpen((prev) => !prev);
    window.addEventListener('app:toggle-mobile-menu', handleToggleMobileMenu);

    return () => {
      window.removeEventListener(
        'app:toggle-mobile-menu',
        handleToggleMobileMenu,
      );
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const handleHeaderClick = () => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsPinned(!isPinned);
    }
  };

  const getHeaderTitle = () => {
    if (isMobile) return 'Close';
    return intl.formatMessage(messages.pinMenu);
  };

  const renderHeaderIcon = () => {
    if (isMobile) return <FaTimes />;
    if (isPinned) return <MdPushPin />;
    return <MdOutlinePushPin />;
  };

  const renderUserIcon = (user) => {
    if (user.flair) return <UserFlair>{user.flair}</UserFlair>;
    return <UserIcon />;
  };

  const renderWalletItem = () => {
    if (isWalletConnected) {
      return (
        <Item
          onClick={() => {
            onDisconnectWallet();
            if (!isPinned) setIsOpen(false);
          }}
          title={walletAddress}
        >
          <FaWallet /> {truncateAddress(walletAddress)}
        </Item>
      );
    }

    return (
      <Item
        onClick={() => {
          onOpenWalletModal();
          if (!isPinned) setIsOpen(false);
        }}
      >
        <FaWallet /> {intl.formatMessage(messages.connectWallet)}
      </Item>
    );
  };

  return (
    <>
      <MenuWrapper
        ref={menuRef}
        $isOpen={isMenuForcedOpen}
        $isHovered={isHovered}
        $menuLeft={menuLeft}
        dir={isLtr ? 'ltr' : 'rtl'}
        onWheel={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsHovered(true)}
        $isMobile={isMobile}
        $largeMode={largeMode}
      >
        <MenuContent>
          {channel && (
            <>
              <CurrentChannelInfo>
                <ChannelMenuWrapper ref={channelMenuRef}>
                  <HeaderButton
                    onClick={() => setIsChannelMenuOpen(!isChannelMenuOpen)}
                  >
                    <LuEllipsisVertical />
                  </HeaderButton>

                  {isChannelMenuOpen && (
                    <ChannelMenuDropdown>
                      <ChannelMenuItem
                        onClick={() => {
                          if (!isPinned) setIsOpen(false);

                          toggleSimpleSearch();
                          setIsChannelMenuOpen(false);
                        }}
                      >
                        <GrSearch /> {intl.formatMessage(messages.searchChat)}
                      </ChannelMenuItem>
                      <ChannelMenuItem
                        onClick={() => {
                          navigate('/search');
                          if (isMobile && !isPinned) setIsOpen(false);
                          setIsChannelMenuOpen(false);
                        }}
                      >
                        <GrSearchAdvanced />{' '}
                        {intl.formatMessage(messages.advancedSearch)}
                      </ChannelMenuItem>
                      <ChannelMenuItem
                        onClick={() => {
                          handleCopyUrl();
                          setIsChannelMenuOpen(false);
                        }}
                      >
                        <LuLink /> {intl.formatMessage(messages.copyUrl)}
                      </ChannelMenuItem>

                      <DropdownDivider />

                      <ChannelMenuItem
                        $danger
                        onClick={() => {
                          onLeaveChannel(channel);
                          setIsChannelMenuOpen(false);
                          if (!isPinned) setIsOpen(false);
                        }}
                      >
                        <MdOutlineLogout />{' '}
                        {intl.formatMessage(messages.leaveChannel)}
                      </ChannelMenuItem>
                    </ChannelMenuDropdown>
                  )}
                </ChannelMenuWrapper>

                <ChannelTextContent>
                  <ChannelName>?{channel}</ChannelName>
                  <ChannelUserCount>
                    (
                    {intl.formatMessage(messages.usersCount, {
                      count: currentUserCount,
                    })}
                    )
                  </ChannelUserCount>
                </ChannelTextContent>

                <HeaderButton
                  $alignRight
                  onClick={handleHeaderClick}
                  title={getHeaderTitle()}
                >
                  {renderHeaderIcon()}
                </HeaderButton>
              </CurrentChannelInfo>
            </>
          )}

          <ItemList>
            {joinedChannels.map((ch) => (
              <Item
                key={ch}
                $isActive={ch === channel}
                onClick={() => {
                  navigate(`/?${ch}`);
                  if (isMobile && !isPinned) setIsOpen(false);
                }}
              >
                <FaQuestion />
                <ItemText>
                  {ch}
                  {unreadCounts[ch] > 0 && (
                    <UnreadBadge>{unreadCounts[ch]}</UnreadBadge>
                  )}
                </ItemText>
              </Item>
            ))}

            <Item
              onClick={() => {
                onJoinOrCreateClick();
                if (!isPinned) setIsOpen(false);
              }}
            >
              <FaPlusCircle /> {intl.formatMessage(messages.joinOrCreate)}
            </Item>

            <Divider />
          </ItemList>

          <ItemList>
            {onlineUsers.map((user) => (
              <Item
                key={user.userid}
                onClick={(e) => handleUserClick(user, e)}
                onContextMenu={(e) => handleUserClick(user, e)}
                title={user.usertrip || ''}
                $userColor={
                  user.nickColor ? `#${user.nickColor}` : 'transparent'
                }
              >
                {renderUserIcon(user)}
                {user.username}
              </Item>
            ))}
          </ItemList>

          <MenuFooter>
            <ItemList>
              <Divider />
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

              {renderWalletItem()}
            </ItemList>
          </MenuFooter>
        </MenuContent>
      </MenuWrapper>

      <UserContextMenu
        contextMenu={contextMenu}
        closeContextMenu={closeContextMenu}
        onCommandClick={onCommandClick}
        myPermissionLevel={myPermissionLevel}
        isWalletConnected={isWalletConnected}
      />
    </>
  );
}

MainMenu.propTypes = {
  channel: PropTypes.string,
  channelData: PropTypes.object,
  intl: PropTypes.object.isRequired,
  isSimpleSearchOpen: PropTypes.bool,
  toggleSimpleSearch: PropTypes.func,
  onJoinOrCreateClick: PropTypes.func,
  onCommandClick: PropTypes.func,
  onOpenLocaleModal: PropTypes.func,
  onOpenWalletModal: PropTypes.func,
  isWalletConnected: PropTypes.bool,
  walletAddress: PropTypes.string,
  onDisconnectWallet: PropTypes.func,
  onLeaveChannel: PropTypes.func,
  isMobile: PropTypes.bool,
  largeMode: PropTypes.bool,
  unreadCounts: PropTypes.object,
};

export default compose(injectIntl)(MainMenu);

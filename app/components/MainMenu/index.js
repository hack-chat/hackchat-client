/**
 * MainMenu provides navigation for channels, a user list for the current
 * channel, and global actions like settings.
 */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
  FaChevronLeft,
} from 'react-icons/fa';
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md';
import { SiSolana } from 'react-icons/si';
import { GiToken } from 'react-icons/gi';
import { RiNftLine } from 'react-icons/ri';

import { SHOW_TOAST } from 'containers/ToastNotifier/constants';
import CurrentChannelInfo from './CurrentChannelInfo';
import MenuFooter from './MenuFooter';
import { MenuWrapper, MenuContent } from './MenuWrapper';
import MenuToggle from './MenuToggle';
import PinButton from './PinButton';
import { ItemList, Item } from './Section';
import {
  ContextMenuOverlay,
  MenuPanel,
  ContextMenuItem,
  ContextMenuSeparator,
  SubMenu,
  SubMenuHeader,
} from './UserContextMenu';

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
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

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
    setOpenSubMenu(null);
  };

  const closeContextMenu = () => {
    setContextMenu(null);
    setOpenSubMenu(null);
  };

  const handleContextMenuClick = (command) => {
    if (!contextMenu || !contextMenu.user) return;
    const { username } = contextMenu.user;

    let commandString = '';
    switch (command) {
      case 'mention':
        commandString = `@${username} `;
        break;
      case 'whisper':
        commandString = `/whisper @${username} `;
        break;
      case 'invite':
        commandString = `/invite @${username}`;
        break;
      case 'kick':
        commandString = `/kick @${username}`;
        break;
      case 'ban':
        commandString = `/ban @${username}`;
        break;
      case 'muzzle':
        commandString = `/muzzle @${username}`;
        break;
      case 'unmuzzle':
        commandString = `/unmuzzle @${username}`;
        break;
      case 'uwuify':
        commandString = `/uwuify @${username}`;
        break;
      case 'ignore':
        commandString = `/ignore @${username}`;
        break;
      case 'setlevel':
        commandString = `/setlevel @${username} `;
        break;
      case 'change-color':
        commandString = `/forcecolor @${username} `;
        break;
      case 'change-flair':
        commandString = `/forceflair @${username} `;
        break;
      case 'send-solana':
        commandString = `/sendsol @${username} `;
        break;
      case 'send-token':
        commandString = `/sendtoken @${username} `;
        break;
      case 'send-nft':
        commandString = `/sendnft @${username} `;
        break;
      default:
        commandString = `/${command} @${username}`;
    }

    onCommandClick(commandString);
    closeContextMenu();
  };

  /**
   * Renders the "Manage" submenu content.
   * Includes a "Back" button for mobile.
   */
  const renderManageMenu = () => (
    <>
      {isMobile && (
        <SubMenuHeader onClick={() => setOpenSubMenu(null)}>
          <FaChevronLeft />
          <span>{intl.formatMessage(messages.manage)}</span>
        </SubMenuHeader>
      )}
      <ContextMenuItem onClick={() => handleContextMenuClick('kick')}>
        {intl.formatMessage(messages.kick)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('ban')}>
        {intl.formatMessage(messages.ban)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('muzzle')}>
        {intl.formatMessage(messages.muzzle)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('unmuzzle')}>
        {intl.formatMessage(messages.unmuzzle)}
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={() => handleContextMenuClick('setlevel')}>
        {intl.formatMessage(messages.setLevel)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('change-color')}>
        {intl.formatMessage(messages.changeColor)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('change-flair')}>
        {intl.formatMessage(messages.changeFlair)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('uwuify')}>
        {intl.formatMessage(messages.uwuify)}
      </ContextMenuItem>
    </>
  );

  /**
   * Renders the "Send" submenu content.
   * Includes a "Back" button for mobile.
   */
  const renderSendMenu = () => (
    <>
      {isMobile && (
        <SubMenuHeader onClick={() => setOpenSubMenu(null)}>
          <FaChevronLeft />
          <span>{intl.formatMessage(messages.send)}</span>
        </SubMenuHeader>
      )}
      <ContextMenuItem onClick={() => handleContextMenuClick('send-solana')}>
        <SiSolana />
        <span>{intl.formatMessage(messages.sendSolana)}</span>
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('send-token')}>
        <GiToken />
        <span>{intl.formatMessage(messages.sendToken)}</span>
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('send-nft')}>
        <RiNftLine />
        <span>{intl.formatMessage(messages.sendNft)}</span>
      </ContextMenuItem>
    </>
  );

  /**
   * Renders the main context menu items.
   * Handles logic for displaying desktop submenus.
   */
  const renderMainMenu = () => (
    <>
      <ContextMenuItem onClick={() => handleContextMenuClick('mention')}>
        {intl.formatMessage(messages.mention)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('ignore')}>
        {intl.formatMessage(messages.ignore)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('invite')}>
        {intl.formatMessage(messages.invite)}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => handleContextMenuClick('whisper')}>
        {intl.formatMessage(messages.whisper)}
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem
        onClick={
          isMobile ? () => setOpenSubMenu('manage') : (e) => e.stopPropagation()
        }
        onMouseEnter={!isMobile ? () => setOpenSubMenu('manage') : null}
      >
        <FaChevronLeft />
        <span>{intl.formatMessage(messages.manage)}</span>
        {!isMobile && openSubMenu === 'manage' && (
          <SubMenu>{renderManageMenu()}</SubMenu>
        )}
      </ContextMenuItem>

      <ContextMenuItem
        onClick={
          isMobile ? () => setOpenSubMenu('send') : (e) => e.stopPropagation()
        }
        onMouseEnter={!isMobile ? () => setOpenSubMenu('send') : null}
      >
        <FaChevronLeft />
        <span>{intl.formatMessage(messages.send)}</span>
        {!isMobile && openSubMenu === 'send' && (
          <SubMenu>{renderSendMenu()}</SubMenu>
        )}
      </ContextMenuItem>
    </>
  );

  /**
   * Main render function for the context menu.
   * Decides which panel to show based on `isMobile` and `openSubMenu`.
   */
  const renderContextMenu = () => {
    if (!contextMenu) return null;

    let panelContent;
    if (isMobile) {
      switch (openSubMenu) {
        case 'manage':
          panelContent = renderManageMenu();
          break;
        case 'send':
          panelContent = renderSendMenu();
          break;
        default:
          panelContent = renderMainMenu();
      }
    } else {
      panelContent = renderMainMenu();
    }

    return (
      <ContextMenuOverlay
        $isMobile={isMobile}
        onClick={closeContextMenu}
        onContextMenu={(e) => {
          e.preventDefault();
          closeContextMenu();
        }}
      >
        <MenuPanel
          $isMobile={isMobile}
          $top={contextMenu.y}
          $left={contextMenu.x}
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={!isMobile ? () => setOpenSubMenu(null) : null}
        >
          {panelContent}
        </MenuPanel>
      </ContextMenuOverlay>
    );
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
                  if (!isPinned) setIsOpen(false);
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
              {/* <Item onClick={() => navigate('/settings')}>
                <FaCog /> {intl.formatMessage(messages.settings)}
              </Item> */}
              <Item
                onClick={() => {
                  dispatch({
                    type: SHOW_TOAST,
                    payload: {
                      message: 'Settings are coming soon, lmao.',
                      type: 'warning',
                    },
                  });
                  if (!isPinned) setIsOpen(false);
                }}
              >
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

      {renderContextMenu()}
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
};

export default compose(injectIntl)(MainMenu);

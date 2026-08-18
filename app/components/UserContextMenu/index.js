/**
 * User context menu is, of course, the context menu for user interactions
 */
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { FaChevronLeft } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';
import { GiToken } from 'react-icons/gi';
import { RiNftLine } from 'react-icons/ri';

import ContextMenuOverlay from './ContextMenuOverlay';
import MenuPanel from './MenuPanel';
import ContextMenuItem from './ContextMenuItem';
import ContextMenuSeparator from './ContextMenuSeparator';
import SubMenu from './SubMenu';
import SubMenuHeader from './SubMenuHeader';

import messages from './messages';

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

export function UserContextMenu({
  contextMenu,
  closeContextMenu,
  onCommandClick,
  intl,
}) {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const menuPanelRef = useRef(null);
  const subMenuRef = useRef(null);

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  useEffect(() => {
    if (contextMenu) {
      setPos({ x: contextMenu.x, y: contextMenu.y });
    } else {
      setOpenSubMenu(null);
    }
  }, [contextMenu]);

  useLayoutEffect(() => {
    if (contextMenu && menuPanelRef.current && !isMobile) {
      const rect = menuPanelRef.current.getBoundingClientRect();
      let newX = pos.x;
      let newY = pos.y;
      let needsUpdate = false;

      if (newX + rect.width > window.innerWidth) {
        newX = window.innerWidth - rect.width - 8;
        needsUpdate = true;
      }
      if (newY + rect.height > window.innerHeight) {
        newY = window.innerHeight - rect.height - 8;
        needsUpdate = true;
      }
      if (newX < 8) {
        newX = 8;
        needsUpdate = true;
      }
      if (newY < 8) {
        newY = 8;
        needsUpdate = true;
      }

      if (
        needsUpdate &&
        (Math.abs(pos.x - newX) > 1 || Math.abs(pos.y - newY) > 1)
      ) {
        setPos({ x: newX, y: newY });
      }
    }
  }, [contextMenu, pos.x, pos.y, isMobile]);

  useLayoutEffect(() => {
    if (!isMobile && openSubMenu && subMenuRef.current) {
      subMenuRef.current.style.top = '-1px';

      const rect = subMenuRef.current.getBoundingClientRect();
      let shift = 0;

      if (rect.bottom > window.innerHeight) {
        shift = rect.bottom - window.innerHeight + 8;
      }
      if (rect.top - shift < 8) {
        shift = rect.top - 8;
      }

      if (shift > 0) {
        subMenuRef.current.style.top = `calc(-1px - ${shift}px)`;
      }
    }
  }, [openSubMenu, isMobile]);

  if (!contextMenu) return null;

  const isMenuOnLeft = pos.x < windowSize.width / 2;

  const handleContextMenuClick = (command) => {
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
          <SubMenu ref={subMenuRef} $openRight={isMenuOnLeft}>
            {renderManageMenu()}
          </SubMenu>
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
          <SubMenu ref={subMenuRef} $openRight={isMenuOnLeft}>
            {renderSendMenu()}
          </SubMenu>
        )}
      </ContextMenuItem>
    </>
  );

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

  return createPortal(
    <ContextMenuOverlay
      $isMobile={isMobile}
      onClick={closeContextMenu}
      onContextMenu={(e) => {
        e.preventDefault();
        closeContextMenu();
      }}
    >
      <MenuPanel
        ref={menuPanelRef}
        $isMobile={isMobile}
        $top={pos.y}
        $left={pos.x}
        onClick={(e) => e.stopPropagation()}
        onMouseLeave={!isMobile ? () => setOpenSubMenu(null) : null}
      >
        {panelContent}
      </MenuPanel>
    </ContextMenuOverlay>,
    document.body,
  );
}

UserContextMenu.propTypes = {
  contextMenu: PropTypes.shape({
    user: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  closeContextMenu: PropTypes.func.isRequired,
  onCommandClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default compose(injectIntl)(UserContextMenu);

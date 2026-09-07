/**
 * Shared context menu for message actions (Reply, Edit)
 */
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import ContextMenuOverlay from 'components/UserContextMenu/ContextMenuOverlay';
import MenuPanel from 'components/UserContextMenu/MenuPanel';
import ContextMenuItem from 'components/UserContextMenu/ContextMenuItem';

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

export function MessageContextMenu({
  contextMenu,
  closeContextMenu,
  onCommandClick,
  intl,
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const menuPanelRef = useRef(null);

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  useEffect(() => {
    if (contextMenu) {
      setPos({ x: contextMenu.x, y: contextMenu.y });
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

  if (!contextMenu) return null;

  const handleContextMenuClick = (command) => {
    onCommandClick(command, contextMenu.payload, contextMenu.user);
    closeContextMenu();
  };

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
      >
        <ContextMenuItem onClick={() => handleContextMenuClick('reply')}>
          {intl.formatMessage(messages.reply)}
        </ContextMenuItem>
        {contextMenu.payload.id && contextMenu.user.mine && (
          <ContextMenuItem onClick={() => handleContextMenuClick('edit')}>
            {intl.formatMessage(messages.edit)}
          </ContextMenuItem>
        )}
      </MenuPanel>
    </ContextMenuOverlay>,
    document.body,
  );
}

MessageContextMenu.propTypes = {
  contextMenu: PropTypes.shape({
    payload: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  closeContextMenu: PropTypes.func.isRequired,
  onCommandClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default compose(injectIntl)(MessageContextMenu);

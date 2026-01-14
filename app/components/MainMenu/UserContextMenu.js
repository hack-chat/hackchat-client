/**
 * Styled components for the responsive UserContextMenu.
 *
 * - On Desktop: A small pop-up at the cursor location. Submenus
 * fly out to the side.
 * - On Mobile: A full-screen overlay with a centered menu panel.
 * Submenus replace the main menu panel (drawer effect).
 */
import styled, { css } from 'styled-components';

/**
 * The full-screen overlay.
 * Handles click-away-to-close.
 * On mobile, it provides the dark background.
 */
export const ContextMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1099;

  ${(props) =>
    props.$isMobile &&
    css`
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

/**
 * The menu panel itself.
 * - Desktop: Positioned absolutely at the cursor (top/left).
 * - Mobile: Centered automatically by the overlay's flex container.
 */
export const MenuPanel = styled.div.attrs((props) => {
  if (props.$isMobile) {
    return { style: {} };
  }

  return {
    style: {
      top: `${props.$top}px`,
      left: `${props.$left}px`,
    },
  };
})`
  position: absolute;
  z-index: 1100;
  background-color: #2a2a2a;
  border: 1px solid #555;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  min-width: 200px;

  ${(props) =>
    props.$isMobile &&
    css`
      position: relative;
      width: 90vw;
      max-width: 320px;
    `}
`;

/**
 * A single item in the menu.
 * Uses flexbox to space text and icons.
 */
export const ContextMenuItem = styled.div`
  padding: 0.5rem 1rem;
  color: #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  position: relative;

  &:hover {
    background-color: #151513;
  }

  > svg:first-child:not(:last-child) {
    margin-right: 8px;
  }

  > svg:last-child:not(:first-child) {
    margin-left: 16px;
    font-size: 0.8em;
  }
`;

/**
 * The container for a desktop flyout submenu.
 */
export const SubMenu = styled.div`
  position: absolute;
  top: -1px;
  right: calc(100% - 1px);
  background-color: #2a2a2a;
  border: 1px solid #555;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  min-width: 200px;
  z-index: 1101;
`;

/**
 * A simple separator line.
 */
export const ContextMenuSeparator = styled.div`
  height: 1px;
  background-color: #444;
  margin: 0.25rem 0.5rem;
`;

/**
 * A special menu item for the mobile "Back" button.
 */
export const SubMenuHeader = styled(ContextMenuItem)`
  font-weight: bold;
  border-bottom: 1px solid #444;

  &:hover {
    background-color: #444;
  }
`;

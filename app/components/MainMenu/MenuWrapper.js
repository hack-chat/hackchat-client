/**
 * Exports a styled div
 */

import styled, { css } from 'styled-components';
import thinScrollbar from 'utils/thinScrollbar';

const getAlignment = (props) => {
  if (props.$menuLeft) {
    return css`
      left: 0;
      border-right: 1px solid ${({ theme }) => theme.palette.border.main};
    `;
  }

  return css`
    right: 0;
    border-left: 1px solid ${({ theme }) => theme.palette.border.main};
  `;
};

const getTransform = (props) => {
  if (props.$isOpen) return 'translateX(0)';

  return props.$menuLeft ? 'translateX(-100%)' : 'translateX(100%)';
};

const isExpanded = (props) => props.$isOpen || props.$isHovered;

const getDesktopTransform = (props) => {
  if (isExpanded(props)) return 'translateX(0)';

  return props.$menuLeft
    ? 'translateX(calc(-100% + 40px))'
    : 'translateX(calc(100% - 40px))';
};

const getDesktopFilter = (props) => {
  if (isExpanded(props)) return 'grayscale(0%)';

  return 'grayscale(70%)';
};

const getDesktopOpacity = (props) => {
  if (isExpanded(props)) return '1';

  return '0.5';
};

const getMenuWidth = (props) => (props.$largeMode ? '340px' : '280px');

const desktopStyles = css`
  width: ${getMenuWidth};
  transform: ${getDesktopTransform};

  & > * {
    filter: ${getDesktopFilter};
    opacity: ${getDesktopOpacity};
  }
`;

export default styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 85vw;
  background-color: ${({ theme }) => theme.palette.background.menu};
  ${getAlignment}
  transform: ${getTransform};
  z-index: 9;
  display: flex;
  flex-direction: column;
  ${thinScrollbar}

  @media (width >= 768px) {
    width: ${getMenuWidth};
  }

  ${(props) => (!props.$isMobile ? desktopStyles : '')}
`;

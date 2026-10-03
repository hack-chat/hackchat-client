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

// On desktop the menu also opens while hovered
const isExpanded = (props) => props.$isOpen || props.$isHovered;

const getMediaTransform = (props) => {
  if (isExpanded(props)) return 'translateX(0)';
  return props.$menuLeft
    ? 'translateX(calc(-100% + 40px))'
    : 'translateX(calc(100% - 40px))';
};

const getMediaFilter = (props) => {
  if (isExpanded(props)) return 'grayscale(0%)';
  return 'grayscale(70%)';
};

const getMediaOpacity = (props) => {
  if (isExpanded(props)) return '1';
  return '0.5';
};

export default styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 280px;
  background-color: ${({ theme }) => theme.palette.background.menu};
  ${getAlignment}
  transform: ${getTransform};
  transition: transform 0.3s ease-in-out;
  z-index: 9;
  display: flex;
  flex-direction: column;

  ${thinScrollbar}

  @media (width >= 768px) {
    transform: ${getMediaTransform};

    & > * {
      transition:
        filter 0.3s ease-in-out,
        opacity 0.3s ease-in-out;
      filter: ${getMediaFilter};
      opacity: ${getMediaOpacity};
    }
  }
`;

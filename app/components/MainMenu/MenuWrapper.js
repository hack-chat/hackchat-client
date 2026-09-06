/**
 * Exports a styled div
 */

import styled from 'styled-components';

const getTransform = (props) => {
  if (props.$isOpen) return 'translateX(0)';
  return 'translateX(100%)';
};

const getMediaTransform = (props) => {
  if (props.$isOpen) return 'translateX(0)';
  return 'translateX(calc(100% - 40px))';
};

const getMediaFilter = (props) => {
  if (props.$isOpen) return 'grayscale(0%)';
  return 'grayscale(70%)';
};

const getMediaOpacity = (props) => {
  if (props.$isOpen) return '1';
  return '0.5';
};

export default styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background-color: ${({ theme }) => theme.palette.background.menu};
  border-left: 1px solid ${({ theme }) => theme.palette.border.main};
  transform: ${getTransform};
  transition: transform 0.3s ease-in-out;
  z-index: 9;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.scrollbar.menuThumb}
    ${({ theme }) => theme.palette.background.menu};

  @media (width >= 768px) {
    transform: ${getMediaTransform};

    & > * {
      transition:
        filter 0.3s ease-in-out,
        opacity 0.3s ease-in-out;
      filter: ${getMediaFilter};
      opacity: ${getMediaOpacity};
    }

    &:hover {
      transform: translateX(0);

      & > * {
        filter: grayscale(0%);
        opacity: 1;
      }
    }
  }
`;

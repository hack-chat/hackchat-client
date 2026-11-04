/**
 * Exports a styled div
 */

import styled, { css } from 'styled-components';

const getColor = (props) => {
  if (props.$danger) return props.theme.palette.status.danger;
  return props.theme.palette.text.primary;
};

const getHoverBgColor = (props) => {
  if (props.$danger) return props.theme.palette.status.danger;
  return props.theme.palette.background.hover;
};

const getDangerHoverStyles = (props) => {
  if (props.$danger) {
    return css`
      color: ${props.theme.palette.text.white};
    `;
  }
  return '';
};

export default styled.div`
  padding: 0.75rem 1rem;
  color: ${getColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${getHoverBgColor};
    ${getDangerHoverStyles}
  }

  svg {
    margin-inline-end: 12px;
    font-size: 1.1em;
  }
`;

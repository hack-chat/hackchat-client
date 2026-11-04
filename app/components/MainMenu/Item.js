/**
 * Exports a styled li
 */

import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$isActive) return props.theme.palette.background.element;
  return 'transparent';
};

const getFontWeight = (props) => {
  if (props.$isActive) return 'bold';
  return 'normal';
};

export default styled.li`
  --user-color: ${(props) => props.$userColor || 'transparent'};

  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.padding.mainMenu.buttons};
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  border-radius: 4px;
  margin-top: 0.3rem;
  background-color: ${getBgColor};
  font-weight: ${getFontWeight};
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.2s ease;

  > * {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(15deg, var(--user-color) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 0;
    pointer-events: none;
  }

  [dir='rtl'] &::before {
    background: linear-gradient(-15deg, var(--user-color) 0%, transparent 60%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    inset-inline-start: 0;
    width: 1.5em;
    height: 0.5em;
    border-bottom: 1px solid var(--user-color);
    border-inline-start: 1px solid var(--user-color);
    border-end-start-radius: 4px;
    opacity: 0.5;
    transition: opacity 0.2s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.element};
  }

  &:hover::before {
    opacity: 0.15;
  }

  &:hover::after {
    opacity: 1;
  }

  svg {
    flex-shrink: 0;
    margin-inline-end: 8px;
  }
`;

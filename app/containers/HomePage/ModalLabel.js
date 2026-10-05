/**
 * Exports a styled label
 */

import styled from 'styled-components';

export default styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  margin-bottom: 12px;
  padding: 10px 15px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background.alt};
  border: 1px solid transparent;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.95em;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.element};
    border: 1px solid ${({ theme }) => theme.palette.border.subtle};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  input[type='checkbox'] {
    display: none;
  }
`;

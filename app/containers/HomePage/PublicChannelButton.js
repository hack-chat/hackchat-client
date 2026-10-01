/**
 * Exports a styled Link
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  margin-bottom: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.border.subtle};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.element};
    color: ${({ theme }) => theme.palette.text.white};
    border-color: ${({ theme }) => theme.palette.border.main};
    text-decoration: none;
  }

  b {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  i {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

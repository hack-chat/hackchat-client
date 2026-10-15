/**
 * Exports a styled select
 */

import styled from 'styled-components';

export default styled.select`
  width: 100%;
  min-height: 46px;
  padding-inline: 16px 42px;
  border-radius: 4px;
  font-size: inherit;
  font-family: ${(props) => props.theme.typography.primary};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.palette.background.menu};
  color: ${({ theme }) => theme.palette.text.primary};
  border: 1px solid ${({ theme }) => theme.palette.border.main};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a8a8a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1.5em;
  background-position: right 16px center;

  [dir='rtl'] & {
    background-position: left 16px center;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.hover};
    border-color: ${({ theme }) => theme.palette.border.focus};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.accent.main};
  }
`;

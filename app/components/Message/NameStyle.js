/**
 * Exports a styled div
 */

import styled from 'styled-components';

const NameStyle = styled.div`
  color: ${(props) => props.$color || props.theme.palette.text.white};
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  cursor: pointer;
  display: inline-block;
  vertical-align: top;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    color: ${({ theme }) => theme.palette.text.trip};
    content: ':';
  }

  @media (width >= 768px) {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &::after {
      content: '';
    }
  }
`;

export default NameStyle;

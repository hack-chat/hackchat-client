/**
 * Exports a styled div element, this wraps the nick/trip.
 */
import styled from 'styled-components';

const NameStyle = styled.div`
  font-family: 'DejaVu Sans Mono', monospace;
  color: ${(props) => (props.$color ? props.$color : '#fff')};
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    color: #6e6b5e;
    content: ':';
  }

  @media (min-width: 768px) {
    flex-shrink: 0;
    width: 220px;
    text-align: right;
    margin-right: 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &::after {
      content: '';
    }
  }
`;
export default NameStyle;

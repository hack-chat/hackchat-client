/**
 * Styled components for organizing content within the MainMenu,
 * including section titles and lists.
 */
import styled from 'styled-components';

export const SectionTitle = styled.h3`
  color: #a6a28c;
  font-size: 1.1em;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.3rem;
`;

export const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  padding: 0.4rem 0.2rem;
  color: #ddd;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;

  &.active {
    background-color: #333;
    font-weight: bold;
  }

  &:hover {
    background-color: #333;
  }

  svg {
    margin-right: 8px;
  }
`;

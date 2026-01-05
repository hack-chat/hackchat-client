/**
 * Wraps the entire MainMenu, handling its positioning, visibility,
 * and responsive behavior (desktop slide-out vs. mobile overlay).
 */
import styled from 'styled-components';

export const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background-color: #1e1e1e;
  border-left: 1px solid #444;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 9;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: #4f4d42 #1e1e1e;

  &.open {
    transform: translateX(0);
  }

  @media (min-width: 768px) {
    transform: translateX(calc(100% - 40px));

    &:hover,
    &.open {
      transform: translateX(0);
    }
  }
`;

export const MenuContent = styled.div`
  padding: 1rem;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

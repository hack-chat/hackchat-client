/**
 * Exports a collapsable section
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';

const Wrapper = styled.div`
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.palette.border.subtle};
  border-radius: 6px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  cursor: pointer;
  background: ${({ theme }) => theme.palette.background.element};
  font-weight: 600;
  user-select: none;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.palette.background.hover};
  }

  & > svg {
    margin-inline-end: 12px;
  }
`;

const Content = styled.div`
  padding: 16px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Header onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoChevronDown /> : <IoChevronForward />}
        {title}
      </Header>
      <Content $isOpen={isOpen}>{children}</Content>
    </Wrapper>
  );
};

export default CollapsibleSection;

/**
 * Exports a styled html span
 */
import styled from 'styled-components';
import { applyEffect } from './NameStyle';

export default styled.span`
  ${(props) => applyEffect(props.$effect)}
`;

/**
 * Exports a styled select
 */

import styled from 'styled-components';
import StyledInput from './StyledInput';

export default styled(StyledInput).attrs({
  as: 'select',
})`
  cursor: pointer;
  appearance: auto;
  margin-bottom: 0;
  width: auto;
  min-width: 150px;
  background-color: ${({ theme }) => theme.palette.background.modal};

  & option {
    background-color: ${({ theme }) => theme.palette.background.modal};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

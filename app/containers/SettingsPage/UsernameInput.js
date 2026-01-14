/**
 * Exports a restyled StyledInput
 */
import styled from 'styled-components';
import StyledInput from './StyledInput';

export default styled(StyledInput)`
  margin-bottom: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
`;

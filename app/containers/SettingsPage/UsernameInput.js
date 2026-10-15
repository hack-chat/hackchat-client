/**
 * Exports a restyled StyledInput
 */

import styled from 'styled-components';
import StyledInput from './StyledInput';

export default styled(StyledInput)`
  margin-bottom: 0;
  border-start-end-radius: 0;
  border-end-end-radius: 0;
  border-inline-end: none;
`;

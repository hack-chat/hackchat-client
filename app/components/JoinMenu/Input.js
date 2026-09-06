/**
 * Exports a styled input
 */

import styled from 'styled-components';

const getColor = (props) => {
  if (props.$invalid) return props.theme.palette.status.error;
  return props.theme.palette.text.primary;
};

const getPlaceholderColor = (props) => {
  if (props.$invalid) return props.theme.palette.status.errorAlpha;
  return props.theme.palette.text.muted;
};

export default styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  font-size: 1em;
  min-width: 0;
  color: ${getColor};

  &::placeholder {
    color: ${getPlaceholderColor};
  }
`;

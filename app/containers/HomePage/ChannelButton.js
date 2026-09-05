/**
 * Exports a styled html button
 */
import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$active) return '#a6a28c';
  return '#555';
};

const getColor = (props) => {
  if (props.$active) return '#1e1e1e';
  return '#ddd';
};

const getHoverBgColor = (props) => {
  if (props.$active) return '#b7b39d';
  if (props.$isDisabled) return '#333';
  return '#666';
};

const getCursor = (props) => {
  if (props.$isDisabled) return 'not-allowed';
  return 'pointer';
};

const getOpacity = (props) => {
  if (props.$isDisabled) return 0.5;
  return 1;
};

const getPointerEvents = (props) => {
  if (props.$isDisabled) return 'none';
  return 'auto';
};

export default styled.button.attrs({
  type: 'button',
})`
  font-family: monospace;
  min-height: 46px;
  padding-left: 23px;
  padding-right: 23px;
  border-radius: 4px;
  border: 1px solid transparent;
  background: #333;
  margin-top: 0.75rem;
  transition: all 0.2s ease;
  background-color: ${getBgColor};
  color: ${getColor};
  border-color: ${getBgColor};
  cursor: ${getCursor};
  opacity: ${getOpacity};
  pointer-events: ${getPointerEvents};

  & > svg {
    margin-left: 12px;
    margin-right: 12px;
  }

  &:hover {
    background-color: ${getHoverBgColor};
    border-color: ${getHoverBgColor};
    color: ${getColor};
  }
`;

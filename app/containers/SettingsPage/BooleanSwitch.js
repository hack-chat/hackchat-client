/**
 * Exports a styled html input
 */
import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  width: 50px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid rgba(125 122 104 / 50%);
  position: relative;
  transition: all 0.2s ease;

  background-color: ${(props) => (props.checked ? '#a6a28c' : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${(props) => (props.checked ? '25px' : '3px')};
    width: 20px;
    height: 20px;
    background-color: ${(props) => (props.checked ? '#1e1e1e' : '#8a8a8a')};
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  &:hover {
    border-color: #a6a28c;
  }
`;

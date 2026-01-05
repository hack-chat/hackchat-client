/**
 * Exports a styled `ColorChanger` Button
 */

import styled from 'styled-components';
import ColorChanger from 'components/ColorPicker';

export default styled(ColorChanger)`
  display: flex;
  width: 100%;
  height: 100%;

  & > div,
  & button {
    width: 100%;
    height: 100%;
  }

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent !important;
    border: none;
    font-size: 1.25em;
    padding: 0;
    border-radius: 0;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #444;
    }
  }
`;

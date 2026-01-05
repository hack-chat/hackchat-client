/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  min-width: 50px;
  min-height: 30px;
  margin-right: 10px;
`;

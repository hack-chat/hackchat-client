/**
 * Exports a styled html button
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCloseButton = styled.button`
  margin-left: auto;
`;

export function CloseButton(closeFunction) {
  return (
    <StyledCloseButton className="close" onClick={closeFunction}>
      &times;
    </StyledCloseButton>
  );
}

CloseButton.propTypes = {
  closeFunction: PropTypes.func,
};

export default CloseButton;

/**
 * Exports a styled html button
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBackButton = styled.button.attrs({
  type: 'button',
})`
  margin-top: 32px;
  margin-left: auto;
`;

export function BackButton({ onClick, text }) {
  return (
    <StyledBackButton className="float-end" onClick={() => onClick()}>
      {text}
    </StyledBackButton>
  );
}

BackButton.propTypes = {
  closeFunction: PropTypes.func,
};

export default BackButton;

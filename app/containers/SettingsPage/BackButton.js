/**
 * Exports a styled `reactstrap` Button
 * - https://reactstrap.github.io/components/input-group/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const StyledBackButton = styled(Button)`
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

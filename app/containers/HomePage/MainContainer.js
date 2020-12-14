/**
 * Exports a styled `reactstrap` Container
 * - https://reactstrap.github.io/components/layout/
 */

import { Container } from 'reactstrap';
import styled from 'styled-components';

export default styled(Container)`
  height: 100%;

  & > div {
    height: 100%;
  }
`;

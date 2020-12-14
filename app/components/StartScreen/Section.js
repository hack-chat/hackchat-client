/**
 * Exports a section button element to wrap each section of the StartScreen
 */

import styled from 'styled-components';

const Section = styled.section`
  max-width: 75%;
  margin: 0 auto;
  margin-bottom: 1rem;

  &:first-child {
    margin-top: 0;
  }
`;

export default Section;

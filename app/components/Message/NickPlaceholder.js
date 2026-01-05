/**
 * An invisible placeholder that occupies the same space as a Nick component
 * on desktop to ensure proper alignment for messages without a visible username.
 */
import styled from 'styled-components';

const NickPlaceholder = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 220px;
    margin-right: 1em;
    flex-shrink: 0;
  }
`;
export default NickPlaceholder;

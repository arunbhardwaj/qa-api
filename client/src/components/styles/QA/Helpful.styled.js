import styled from 'styled-components';
import Helpful from '../../QA/Helpful.jsx';

export const StyledSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: blue;

  &:hover {
    transform: scale(1.01)
  }

  &:active {
    transform: scale(1.00)
  }
`

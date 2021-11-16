import styled from 'styled-components';

export const QASectionContainer = styled.div`
  max-height: 100vh;
`

export const AddQuestionButton = styled.button`
  background: none;
  border: 2px solid black;
  margin-top: 5px;
  font-weight: 500;
  font-size: 1rem;
  padding: 10px 25px;
  box-shadow: 1px;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(1.0);
  }
`
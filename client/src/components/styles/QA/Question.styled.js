import styled from 'styled-components';

export const QuestionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  /* max-width: 100%; */
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  /* border: 1px solid red; */
`

export const StyledDiv = styled.div`
  position: relative;
  font-weight: bold;
  font-size: 1.2rem;
`

export const HelpfulContainer = styled.div`
  position: relative;
  font-size: 1rem;
`

export const AddAnswerBtn = styled.button`
  display: inline;
  border: none;
  background: none;
  outline: none;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1rem;
`
import styled from 'styled-components';
import Helpful from '../../QA/Helpful.jsx';

export const AnswersContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 0.5rem;
`

export const ABlock = styled.div`
  display: inline;
  font-weight: bold;
  font-size: 1.2rem;
  padding-right: 0.5rem;
`

export const LoadMoreAnswersBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;
  padding: 1em 1em 1em 0;
  font-size: 0.9rem;
  font-weight: 700;
`

// Override in case I want to make different styling
export const CollapseAnswersBtn = styled(LoadMoreAnswersBtn)`

`

export const ResponsesContainer = styled.div`
  max-width: 100%;
  display: inline-block;
  flex-shrink: 0;
`

export const SingleResponseContainer = styled.div`
  display: block;
  padding-bottom: 0.5rem;
`

export const AnswerBody = styled.div`
  font-size: 1.1rem;
`

export const SubAnswerBody = styled.div`
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  color: #676767;
  font-size: 0.95em;
`

export const StyledBy = styled.span`
  color: #979797;
`

export const Spacer = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`
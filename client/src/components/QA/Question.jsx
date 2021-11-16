import React, { useContext, useState } from 'react';
import { QAContext } from './QAContext.jsx';
import Helpful from './Helpful.jsx';
import { Spacer } from '../styles/QA/Spacer.styled';
import {
  StyledDiv,
  QuestionContainer,
  HelpfulContainer,
  AddAnswerBtn
} from '../styles/QA/Question.styled';
import { updateQuestionHelpfulCount } from '../../request.js';

const Question = props => {
  const { toggleModal, setQuestionId } = useContext(QAContext);

  return (
    <QuestionContainer className="q-container">
      <StyledDiv className={props.className}>
        Q: {props.question.question_body}
      </StyledDiv>
      <HelpfulContainer>
        <Helpful type={'question'} id={props.question_id} count={props.question.question_helpfulness} /> |
        <AddAnswerBtn onClick={() => {setQuestionId(props.question_id); toggleModal('showAnswerModal')}}>Add answer</AddAnswerBtn>
      </HelpfulContainer>
    </QuestionContainer>
  );
};

export default Question;

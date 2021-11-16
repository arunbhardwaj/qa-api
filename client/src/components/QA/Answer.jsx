import React, { useState } from 'react';
import {
  ResponsesContainer,
  AnswersContainer,
  SingleResponseContainer,
  ABlock,
  AnswerBody,
  SubAnswerBody,
  LoadMoreAnswersBtn,
  CollapseAnswersBtn,
  StyledBy,
  Spacer,
} from '../styles/QA/Answer.styled';
import Helpful from './Helpful.jsx';
import Report from './Report.jsx';

const formatString = dateString => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Answer = ({ answers }) => {
  const keys = Object.keys(answers);
  const [loadFactor, setLoadFactor] = useState(2);
  let moreAnswers = keys.length - loadFactor;

  return (
    <AnswersContainer className="outer-answers-container">
      {keys.length > 0 && <ABlock className="a-block">A:</ABlock>}
      {keys.length > 0 && (
        <ResponsesContainer className="inner-answers-container">
          {keys.map((answer, idx) => {
            // 'answer' is the id of the answer
            return idx < loadFactor ? (
              <SingleResponseContainer
                key={answer}
                id={answer}
                className="answer-container"
              >
                <AnswerBody className="answer-text">
                  {answers[answer].body}
                </AnswerBody>
                <SubAnswerBody className='answer-sub-text'>
                  <By answer={answers[answer]} />
                  <Spacer>|</Spacer>
                  <Helpful id={answer} type={'answer'} count={answers[answer].helpfulness} />
                  <Spacer>|</Spacer>
                  <Report />
                </SubAnswerBody>
              </SingleResponseContainer>
            ) : null;
          })}
          {moreAnswers > 0 && (
            <LoadMoreAnswersBtn onClick={() => setLoadFactor(loadFactor + 2)}>
              See more answers ({moreAnswers})
            </LoadMoreAnswersBtn>
          )}
          {loadFactor > 2 && (
            <CollapseAnswersBtn onClick={() => setLoadFactor(2)}>
              Collapse answers
            </CollapseAnswersBtn>
          )}
        </ResponsesContainer>
      )}
    </AnswersContainer>
  );
};

const By = ({ answer }) => {
  return (
    <StyledBy>
      by {answer.answerer_name}, {formatString(answer.date)}{' '}
    </StyledBy>
  );
};

export default Answer;

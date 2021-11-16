import React, { useState } from 'react';
import QAItem from './QAItem.jsx';
import { QuestionsListContainer } from '../styles/QA/QuestionsListContainer.styled';

const QuestionsList = ({ questions, searchResults }) => {
  const [loadFactor, setLoadFactor] = useState(4); // Determines the default number of questions to display
  let isSearching = (searchResults.length) || false;
  let responses = isSearching ? searchResults : questions;
  let remainingResponses = responses.length - loadFactor;

  return (
    <QuestionsListContainer className='questions-list'>
      {responses.map((q, idx) =>
        idx < loadFactor ? <QAItem key={q.question_id} id={q.question_id} question={q} className={"qa-item"} /> : null
      )}
      {remainingResponses > 0 &&  <button onClick={() => setLoadFactor(loadFactor + 2)} className="load-questions">
            Load more answered questions ({remainingResponses})
          </button>}
      {loadFactor > 4 && <button onClick={() => setLoadFactor(4)} className="collapse-questions">Collapse all questions</button>}
    </QuestionsListContainer>
  );
};

export default QuestionsList;

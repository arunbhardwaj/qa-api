import React, { useState, useEffect, useReducer, useContext } from 'react';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import { getAllQuestions } from '../../request.js';
import { QAContext } from './QAContext.jsx';
import AddQuestionModal from './AddQuestionModal.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';
import { QASectionContainer, AddQuestionButton } from '../styles/QA/QASection.styled';

const QASection = ({productId}) => {
  const [questions, setQuestions] = useState([]); // keep track of the questions
  const [searchResults, setSearchResults] = useState([]); // keep track of searchResults
  const { search, product_id, setProductId, toggleModal, reload, question_id, showQuestionModal, showAnswerModal } = useContext(QAContext);

  useEffect(() => {
    setProductId(productId);
  }, [productId])

  useEffect(() => {
    console.log(product_id)
    getAllQuestions(productId)
      .then(results => {
        setQuestions(results.data.results); // Already sorted by Question Helpfulness
      })
      .catch(err =>
        console.error(
          'There was an error retrieving questions for product >>>',
          err
        )
      );
  }, [reload]);

  useEffect(() => {
    search.length >= 3 ? getSearchResults() : clearSearchResults(); // Clear the searchResults if we don't want to search
  }, [search]);

  const getHighlightedText = (text, highlight) => {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, idx) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={idx} style={{ backgroundColor: '#E3CFC6' }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // This handles finding and highlighting questions with matching text from search box;
  const getSearchResults = () => {
    let results = [];

    // Search question body for the search string and highlight
    for (let q of questions) {
      let text = q.question_body.substring();
      let copy = JSON.parse(JSON.stringify(q));
      let wasModified = false;
      if (text.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        text = getHighlightedText(text, search);
        copy.question_body = text;
        wasModified = true;
      }

      // Search answer body for the search string and highlight
      for (let ansKey in q.answers) {
        text = q.answers[ansKey].body;
        if (text.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          text = getHighlightedText(text, search);
          copy.answers[ansKey].body = text;
          wasModified = true;
        }
      }

      if (wasModified) results.push(copy);
    }

    setSearchResults(results);
  };

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  return (
    <QASectionContainer>
      {/* we want it to have font color #525252 */}
      {/* Putting in a span tag so that childrens listed on the context is just the span as opposed to Question, Answers, &*/}
      <span style={{ fontSize: '1.5rem' }}>QUESTIONS {'&'} ANSWERS</span>
      <Search />
      <QuestionsList questions={questions} searchResults={searchResults} />
      <AddQuestionButton onClick={() => toggleModal('showQuestionModal')} className="add-question">ADD A QUESTION</AddQuestionButton>
      {showQuestionModal && <AddQuestionModal />}
      {showAnswerModal && <AddAnswerModal question_id={question_id} />}
    </QASectionContainer>
  );
};

export default QASection;

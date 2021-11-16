import React, { useState, useContext, useRef } from 'react';
import { StyledSpan } from '../styles/QA/Helpful.styled';
import { QAContext } from './QAContext.jsx';
import {
  updateQuestionHelpfulCount,
  updateAnswerHelpfulCount,
} from '../../request.js';

// TODO: all helpful components are re-rendering even when only one is clicked, (bc of the useEffect api call most likely)
const Helpful = React.memo(({ count, id, type }) => {
  // const [localCount, setLocalCount] = useState(count);
  const [wasIncremented, setWasIncremented] = useState(false);
  const { triggerReload } = useContext(QAContext);
  const renders = useRef(0)

  const handleOnClick = e => {
    if (!wasIncremented) {
      if (type === 'question') {
        updateQuestionHelpfulCount(id)
          .then(results => {
            setWasIncremented(true);
            // setLocalCount(localCount => localCount + 1);
            triggerReload();
          })
          .catch(err => console.error(err));
      } else if (type === 'answer') {
        updateAnswerHelpfulCount(id)
          .then(results => {
            setWasIncremented(true);
            // setLocalCount(localCount => localCount + 1);
            triggerReload();
          })
          .catch(err => console.error(err));
      }
    }
  };

  return (
    <span>
      Helpful? <StyledSpan onClick={e => {handleOnClick(e); console.log(id, 'was clicked.')}}>Yes</StyledSpan> (
      {count})
      {console.log("I", id, "have rendered", renders.current++, "times.")}
    </span>
  );
});

export default Helpful;

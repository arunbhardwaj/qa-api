import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';

const Star = ({ marked, starId }) => {
  return (
    <span value={starId} className="star" name="stars" role="button">
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
};

const StarRating = ({ value, handleInputChange }) => {
  const [rating, setRating] = React.useState(parseInt(value) || 0);
  const [selection, setSelection] = React.useState(0);

  const multiFunc = event => {
    setRating(event.target.getAttribute('value'));
    handleInputChange(event);

  }

  const hoverOver = event => {
    let val = 0;
    if (event && event.target && event.target.getAttribute('value'))
      val = event.target.getAttribute('value');
    setSelection(val);
  };
  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={e => multiFunc(e)}
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
};

export default StarRating;
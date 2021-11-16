import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';





const MoreReviews = ({ total, visible, showMoreReviews }) => {

  if (total > visible) {
    return (
      <div>
      <button style={{cursor: 'pointer'}} onClick={showMoreReviews}>More Reviews</button>
      </div>
    )
  } else {
    return null;
  }
}


export default MoreReviews;

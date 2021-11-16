import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx';



const ReviewList = ({ reviews, visible, updateReviews }) => {

  const visibleReviews = reviews && reviews.slice(0, visible);

    return (<Scroll>
      {visibleReviews && visibleReviews.map((review, key) => (
        <ReviewTile review={review} key={key} updateReviews={updateReviews}/>
      ))}
    </Scroll>
    )
}

const Scroll = styled.div`
max-height: 70vh;
overflow-y: scroll;
`

export default ReviewList;

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../Shared/reviewhandler.js';
import ReviewsSort from './ReviewsSort.jsx';
import ReviewList from './ReviewList.jsx';
import MoreReviews from './MoreReviews.jsx';
import NewReview from './NewReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviewsData.results,
      visible: 2
    }
    this.showMoreReviews = this.showMoreReviews.bind(this);
  }

  componentDidMount() {
    this.setState(
      { reviews: this.props.reviewsData.results }
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters !== this.props.filters) {
      this.applyFilters();
    }
    if (prevProps.reviewsData !== this.props.reviewsData){
      this.setState({
        reviews: this.props.reviewsData.results,
        visible: 2
      })
    }
  }

  showMoreReviews() {
    this.setState({
      visible: this.state.visible + 2
    })
  }

  applyFilters() {
    let result = [];
    if (this.props.filters.length > 0) {
      this.props.reviewsData.results.forEach((review) => {
        if (this.props.filters.indexOf(JSON.stringify(review.rating)) !== -1) {
          result.push(review);
        }
      })
      this.setState({ reviews: result});
    } else {
      this.setState({ reviews: this.props.reviewsData.results, visible: 2 });
    }
  }

  // stars, loading more questions/reviews, adding a question/review,
  // styled-components
  // All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

  render () {
    const { reviewsData, characteristics, pid } = this.props;

    return (<div>
        <ReviewsSort total={this.state.reviews && this.state.reviews.length} getReviews={this.props.getReviews}/>
        <ReviewList reviews={this.state.reviews} visible={this.state.visible} updateReviews={this.props.updateReviews}/>
        <br/>
        <ButtonsStyle>
          <MoreReviews total={this.state.reviews && this.state.reviews.length} visible={this.state.visible} showMoreReviews={this.showMoreReviews}/>
          <NewReview name={this.props.name} characteristics={characteristics} pid={pid}/>
        </ButtonsStyle>
    </div>)
  }
}



const ButtonsStyle = styled.div`
display: flex;
justify-content: flex-start;
gap: 5px;
`

export default Reviews;


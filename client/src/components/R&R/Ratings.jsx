import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import handler from '../Shared/reviewhandler.js';
import Stars from "../Shared/Stars.jsx";
import Bars from "../Shared/Bars.jsx";
import Characteristics from './Characteristics.jsx';



const Ratings = ({ reviewsMetaData, updateFilters, filters, clearFilters }) => {

  let { ratings, recommended, characteristics } = reviewsMetaData;

  console.log('ratings', characteristics);

  const getTotal = () => {
    let total = 0;
    for (let key in ratings) {
      total += Number(ratings[key]);
    }
    return total;
  }

  const getAverageRating = () => {
    let sum = 0;
    for (let key in ratings) {
      sum += Number(key) * Number(ratings[key]);
    }
    if (ratings !== undefined){

    }
    return (sum / getTotal()).toFixed(1);
  };

  const getRecPercentage = () => {
    if (!recommended.true) {
      return 0;
    }
    if (!recommended.false) {
      return 100;
    }
    return Math.round((Number(recommended.true) / (Number(recommended.true) + Number(recommended.false)) * 100));
  }


  return (
     <div>
        <div style={{fontSize: '50px', textDecoration: 'bold', display: 'inline'}}>{getAverageRating()}</div><div style={{display: 'inline'}}><Stars rating={getAverageRating()}/></div>
        {recommended && <div>{getRecPercentage()}% of Users recommend this product</div>}
        <br />
        {ratings && Object.entries(ratings).map((rating) => {
          if (filters.indexOf(rating[0]) === -1) {
            return (
            <div>
              <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={updateFilters} value={rating[0]}>{rating[0]} stars </span>
              <Bars count={rating[1]} total={getTotal()} />
            </div>
            )
          } else {
            return (
              <div>
                <span style={{textDecoration: 'underline', cursor: 'pointer', backgroundColor: 'black', color: 'white'}} onClick={updateFilters} value={rating[0]}>{rating[0]} stars </span>
                <Bars count={rating[1]} total={getTotal()} />
              </div>
            )
          }
        })}
        {filters.length > 0
          ? <div>
              <br/>
              Current Filters: {filters.join('/')} star reviews
              <br/>
              <button onClick={clearFilters}>Remove Current Filters</button>
          </div>
          : ''}
        <br />
        {characteristics && Object.entries(characteristics).map((entry) => (
          <Characteristics entry={entry}/>
        ))}
     </div>
  )
}


const barStyle = styled.div`
  display: flex;
  align-items: left;
`

export default Ratings;


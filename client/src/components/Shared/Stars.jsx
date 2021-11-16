import React from 'react';

const Stars = ({rating}) => {
  const percentage = rating / 5 * 100;

  const containerStyle = {
    'position': 'relative'
  }

  const starStyle = {
    'position': 'absolute',
    'fontSize': 'large',
    'backgroundImage': `-webkit-linear-gradient(0deg, black ${percentage}%, transparent ${percentage}% 100%)`,
    'WebkitBackgroundClip': 'text',
    'WebkitTextFillColor': 'transparent'
  }

  const emptyStarStyle = {
    'zIndex': '-1',
    'color': 'black',
    'position': 'absolute',
    'fontSize': 'large'
  }

  return (
    <span style={containerStyle}>
      <span style={starStyle}>★★★★★</span>
      <span style={emptyStarStyle}>☆☆☆☆☆</span>
    </span>
  )
}



export default Stars;
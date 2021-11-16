import React from 'react';

const Bars = ({count, total}) => {
  const percentage = count / total;


  const backgroundStyle = {
    width: '12%',
    height: '0.8%',
    backgroundColor: '#cccccc',
    marginLeft: '0.5%',
    marginTop: '6px',
    position: 'absolute',
  }

  const filledStyle = {
    backgroundColor: '#0d7012',
    height: '0.8%',
    width: `${12 * percentage}%`,
    position: 'absolute',
    marginLeft: '0.5%',
    marginTop: '6px',
  }

  return (
    <span>
      <span style={backgroundStyle}></span>
      <span style={filledStyle}></span>
    </span>
  )
}



export default Bars;
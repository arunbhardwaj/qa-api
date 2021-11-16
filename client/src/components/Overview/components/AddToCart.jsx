import React from "react";

import _ from "underscore";


const AddToCart = (props) => {
  // console.log("Cart Adding System");
//   console.log(props.styleInfo);

//   let handleNewStyle = (event) => {
//     console.log(event.target.getAttribute("id"));

//   }
  let sizeDetails = {default: {quantity: 0, size: 'unfathomable'}};
  let sizes = [props.styleInfo];
  if (props.styleInfo !== 'default') {
    sizeDetails = props.styleInfo.skus
    sizes = Object.keys(sizeDetails);
    // console.log('sizes', sizes);
  } 
  
  let arr = [0]
  for (var i = 0; i < props.quantity; i++) {
    arr.push(i+1);
  }

  return (<div>
    <h2>Purchase this item?</h2>
    <p>Cost: ${props.price}</p>
    <h3>Select Size</h3>
    <select onChange={(e) => {props.sizeHandler(e.target.options[e.target.selectedIndex])}}>
    <option value={0} quant={[0]} > Choose Size </option>
      {_.map(sizes, (k) => {
        
        return (<option value={"" + k} quant={sizeDetails[k].quantity} >{sizeDetails[k].size}</option>)
      })}
    </select>
    <h3>Select Quantity</h3>
    <select onChange={(e) => {props.priceHandler(e.target.options[e.target.selectedIndex].value)}}>
      {_.map(arr, (q) => {
        return (<option value={"" + q}>{q}</option>)
      })}
    </select>
    
  </div>)
}



export default AddToCart;
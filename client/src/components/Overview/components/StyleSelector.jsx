import React from "react";

import _ from "underscore";

import AddToCart from "./AddToCart.jsx";
import ImageGallery from "./ImageGallery.jsx";
import GalleryModal from "./GalleryModal.jsx";
import styled from "styled-components";



const StyleSelector = (props) => {
  // console.log(props.styles);

  let num = -1;
  let photos = null;
  if (props.styles[props.currentStyle].photos) {
    photos = props.styles[props.currentStyle].photos;
  }

  return (<div>
  {props.openModal &&
    <GalleryModal closeModal={props.modalHandler} url={photos[props.picIndex].url}/>
  }
  <SuperContainer>
    <ImageGallery 
      pics={photos || null} 
      picIndex={props.picIndex}
      handlePictureChange={props.picHandler}
      modalHandler={props.modalHandler}
    />
    <Cart>
      <AddToCart 
        styleInfo={props.styles[props.currentStyle]} 
        quantity={props.quantity} 
        sizeHandler={props.sizeHandler} 
        priceHandler={props.priceHandler}
        price={props.price}
      />
    <p>Total is: {props.totalPrice}</p>
        
    <CartAdd onClick={(e) => {props.cartHandler()}}>Add to Cart</CartAdd>
  </Cart>
  </SuperContainer>
    <StyleContainer>
      {_.map(props.styles, (s) => {
          num = num + 1;
          // let url =  || ;
          console.log('s', s);
          if (s !== 'default') {
           return (<Style id={num} url={s.photos[0].thumbnail_url} onClick={(e) => {props.styleHandler(e)}} />)
          } else {
            return (<li key={s.style_id} id={num} onClick={(e) => {props.styleHandler(e)}}>{s.name}</li>)
          }
      })}
    </StyleContainer>
  </div>)
}

const Cart = styled.div`
display: flex;
width: 30%;
height: 100%;
box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
border-radius: 0.25rem;
margin: 8px;
border: 1px solid grey;
float: right;
flex-direction: column;
`;

const CartAdd = styled.button`
display: flex;
width: 90px;
height: 20px;
margin: 4px;
float: left;
cursor: pointer;
align-items: center;
`

const StyleContainer = styled.div`
display: flex;
width: 70%;
height: 125px;
margin-top: 10px;
float: left;
flex-wrap: wrap;
`;

const Style = styled.div`
display: flex;
width: 50px;
height: 50px;
border: solid;
border-radius: 20rem;
background-image: url(${props => props.url});
background-repeat: no-repeat;
background-size: 100% 100%;
margin: 10px;
float: left;
`;

const SuperContainer = styled.div`
  display: flex;
  width: 100%;
  height: 350px;
  float: left;
`

export default StyleSelector;
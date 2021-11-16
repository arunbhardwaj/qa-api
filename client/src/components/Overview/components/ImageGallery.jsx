import React from "react";
import _ from "underscore";
import styled from "styled-components";


const ImageGallery = (props) => {
  // console.log(props.styles);
  let arrowRight = '>>';
  let arrowLeft = '<<';




  if (props.pics === null) {
    // console.log('images', props.pics);
      return (<div>
        <h2>Images</h2>
        <Gallery>

        </Gallery>
    </div>)
  } else {
    console.log('images', props.pics[0]);
    return (<Gallery>
          <LeftButton onClick={(e) => {props.handlePictureChange(false)}} > {arrowLeft} </LeftButton>
          <Image url={props.pics[props.picIndex].url} onClick={(e) => {props.modalHandler(true)}} />

          <RightButton onClick={(e) => {props.handlePictureChange(true)}} > {arrowRight} </RightButton>  
        </Gallery>)
  }
}

const Image = styled.img`
  display: flex;
  height: 95%;
  width: 300px;
  // border: solid;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;

`;

const LeftButton = styled.button`
  display: flex;
  width: 30px;
  height: 95%;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
  float: left;
  align-items: center;
`

const RightButton = styled.button`
  display: flex;
  width: 30px;
  height: 95%;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
  float: right;
  align-items: center;
`

const Gallery = styled.div`
  display: flex;
  width: 70%;
  height: 100%;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
  align-items: center;
`;

const ButtonDisplay = styled.div`
display: flex;
width: 300px;
height: 300px;
box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
border-radius: 0.25rem;
margin: 8px;
border: 1px solid grey;
`;


export default ImageGallery;
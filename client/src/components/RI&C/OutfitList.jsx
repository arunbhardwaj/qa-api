import React, { useState, useEffect, useRef } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import $ from "jquery";
import axios from "axios";
import styled from "styled-components";
import ProductCard from "./ProductCard.jsx";


const OutfitList = (props) => {

  const [storageOutfits, setStorageOutfits] = useLocalStorageState("storageOutfits", [])
  const [outfits, setOutfits] = useState(storageOutfits)
  const [leftCount, setLeftCount] = useState(0)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const ref = useRef()

  useEffect(() => { showArrow() })
  useEffect(() => { moveToNext() })
  useEffect(() => { moveToPrev() })

  const handlePlusButtonClick = () => {
    let copy = outfits;
    if (!copy.includes(props.productId)) {
      copy.push(props.productId);
    }
    setOutfits(copy)
    setStorageOutfits(outfits)
  }

  const deleteOutfit = (id) => {
    let copy = storageOutfits;
    let index = copy.indexOf(id);
    copy.splice(index, 1)
    setOutfits(copy)
    setStorageOutfits(outfits)
  }

  const moveToNext = () => {
    setLeftCount(leftCount => leftCount + 1)
    showArrow()
  }

  const moveToPrev = () => {
    setLeftCount(leftCount => leftCount - 1)
    showArrow()
  }

  const showArrow = () => {
    //right arrow
    if (ref.current) {
     let containerWidth = ref.current.offsetWidth;
     let cardWidth = (storageOutfits.length - leftCount) * 200
     if (containerWidth > cardWidth) {
      setShowRight(false)
     } else if (containerWidth <= cardWidth) {
      setShowRight(true)
     }
    }
    //left arrow
    if (leftCount > 0) {
      setShowLeft(true)
    } else if (leftCount < 1) {
      setShowLeft(false)
    }
  }

  //render() {
    return(
      <div id="OutfitList">
        <Title>YOUR OUTFIT</Title>
        <ListContainer>
        <ButtonContainer>{showLeft && <LeftArrow onClick={moveToPrev}>˱</LeftArrow>}</ButtonContainer>
          <Card><PlusButton onClick={handlePlusButtonClick}>+</PlusButton></Card>
          <CarouserContainerInner ref={ref}>
            {storageOutfits.slice(leftCount).map((id, i) => {
              return <ProductCard relatedProductId={id} key={i} outfit={true} deleteOutfit={deleteOutfit}/>
            })}
        </CarouserContainerInner>
        <ButtonContainer>{showRight && <RightArrow onClick={moveToNext}>˲</RightArrow>}</ButtonContainer>
        </ListContainer>
      </div>

    )
  //}
}

export default OutfitList;

const Title = styled.h3`
  color: grey;
  margin-left: 50px;
`

const ListContainer = styled.div`
  margin-bottom: 30px;
  height: 320px;
  width: 71%;
  display: flex;
  align-items: center;
`


const CarouserContainerInner = styled.div`
  //overflow-x: scroll;
  overflow: hidden;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  width: 71%;
`

const Card = styled.div`
  min-width: 180px;
  height: 300px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
`;

const ButtonContainer = styled.div`
  width: 40px;
  height: 100px;
`

const PlusButton = styled.button`
  margin-top: 115px;
  margin-left: 65px;
  font-size: 70px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`

const LeftArrow = styled.button`
  left:0;
  margin-top: -70px;
  font-size: 90px;
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: grey;
  &:hover{
    color: black;
  }
`

const RightArrow = styled(LeftArrow)`
  right:0;
`
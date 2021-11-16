import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import ProductCard from "./ProductCard.jsx"
import styled from 'styled-components'

class RPList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductId: [],
      currentProductInfo: {},
      leftCount:0,
      showLeft: false,
      showRight: true
    };
    this.myRef = React.createRef();
    this.moveToPrev = this.moveToPrev.bind(this);
    this.moveToNext = this.moveToNext.bind(this);
    this.showArrow = this.showArrow.bind(this);
  }

  componentDidMount() {
    this.getRelatedProductId(),
    this.getCurrentProductInfo()
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.getRelatedProductId()
      this.getCurrentProductInfo()
    }
  }

  getRelatedProductId() {
    let id = this.props.productId;
    axios.get(`products/${id}/related`)
      .then((results) => {
        this.setState({
          relatedProductId: results.data
        })
      })
      .catch((err) => {
        console.log('Error in getProductInfo')
      })
  }

  getCurrentProductInfo() {
    const id = this.props.productId;
    axios
      .get(`products/${id}`)
      .then((results) => {
        this.setState({
          currentProductInfo: results.data,
        });
      })
      .catch((err) => {
        console.log("Error in currentProductInfo");
      });
  }

  moveToNext() {
    this.setState({leftCount: this.state.leftCount + 1}, this.showArrow)
  }

  moveToPrev() {
    this.setState({leftCount: this.state.leftCount - 1}, this.showArrow)
  }


  showArrow() {
    //right arrow
    if (this.myRef.current) {
     let containerWidth = this.myRef.current.offsetWidth;
     let cardWidth = (this.state.relatedProductId.length - this.state.leftCount) * 200
     if (containerWidth > cardWidth) {
       this.setState({ showRight: false })
     } else if (containerWidth <= cardWidth) {
      this.setState({ showRight: true })
     }
    }
    //left arrow
    if (this.state.leftCount > 0) {
      this.setState({ showLeft: true})
    } else if (this.state.leftCount < 1) {
      this.setState({ showLeft: false})
    }
  }


  render() {
    let leftCount = this.state.leftCount
    let relatedProductId = [];
    this.state.relatedProductId.forEach((id) => {
      if (!relatedProductId.includes(id)) {
        relatedProductId.push(id);
      }
    })
    return (
      <div id="RPList">
        <Title>RELATED PRODUCTS</Title>
        <ListContainer id="rplist">
        <ButtonContainer>{this.state.showLeft && <LeftArrow onClick={this.moveToPrev}>˱</LeftArrow>}</ButtonContainer>
          <CarouserContainerInner ref={this.myRef}>
        {relatedProductId.slice(leftCount).map((id, i) => {
          return <ProductCard relatedProductId={id} key={id} productInfo={this.state.currentProductInfo} rp={true} handleProductChange={this.props.handleProductChange}/>
        })}
        </CarouserContainerInner>
        <ButtonContainer>{this.state.showRight && <RightArrow onClick={this.moveToNext}>˲</RightArrow>}</ButtonContainer>
        </ListContainer>
      </div>
    );
  }
}

const Title = styled.h3`
  color: grey;
  margin-left: 50px;
`

const ListContainer = styled.div`
  height: 320px;
  width: 80%;
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
  left: 0px;
  width: 80%;
`

const ButtonContainer = styled.div`
  width: 40px;
  height: 100px;
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


export default RPList;

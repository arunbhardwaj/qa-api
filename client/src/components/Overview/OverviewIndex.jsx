// Overview

import React from "react";
import _ from "underscore";
import styled from "styled-components";
import axios from "axios";
import StyleSelector from "./components/StyleSelector.jsx";
import handler from '../Shared/reviewhandler.js';
import Stars from "../Shared/Stars.jsx";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.product_id,
      productSelected: {name: null, features: []},
      productStyles: ["default"],
      productPrice: 0,
      totalPrice: 0,
      styleSelected: 0,
      quantity: [0],
      chosenAmount: 0,
      picIndex: 0,
      picMax: 0,
      sku: 0,
      size: null,
      starRating: 0,
      openModal: false
    }
    this.productGetter = this.productGetter.bind(this);
    this.getReviewsMeta = this.getReviewsMeta.bind(this);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.retrieveCart = this.retrieveCart.bind(this);
    this.sendToCart = this.sendToCart.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.productGetter(this.props.product_id);
    this.getReviewsMeta();
  }

  productGetter (id) {
    console.log('Getting products...', id);
    let store = null;
    axios.get(`/products/${id}`).then((productData) => {
      // Grabbing product information, including current style
      // console.log(productData.data);
      store = productData.data;
      axios.get(`/products/${id}/styles`).then((styleData) => {
        // console.log(styleData.data);
        this.setState({
          productSelected: store, 
          productStyles: styleData.data.results, 
          productPrice: store.default_price,
          picIndex: 0,
          picMax: (styleData.data.results[0].photos.length - 1)
        });
      })
      
    });
  }

  getReviewsMeta() {
    handler.getMeta(this.props.product_id, (responseData) => {
      // console.log('client metaData >>>>', responseData);
      
      let ratings = responseData.ratings;
 
      let sum = 0;
      for (let key in ratings) {
        sum += Number(key) * Number(ratings[key]);
      }
      let total = 0;
      for (let key in ratings) {
        total += Number(ratings[key]);
      }

      let average = (sum / total).toFixed(1);
      // console.log('average', average);
      this.setState({ starRating: average });
    })
  }

  handleStyleChange (e) {
    let ind = e.target.getAttribute("id");
    let style = this.state.productStyles[ind];
    let size_ids = Object.keys(style.skus);
    let newSku = 0;
    for (var i = 0; i < size_ids.length; i++) {
      if (style.skus[size_ids[i]].size === this.state.size) {
        newSku = size_ids[i];
      }
    }
    this.setState({
      styleSelected: ind, 
      productPrice: style.original_price, 
      picIndex: 0,
      picMax: (style.photos.length - 1),
      sku: newSku
    });
  }

  handleSizeChange (e) {
    // e is an html element
    let q = Number(e.getAttribute("quant"));
    let s = Number(e.value);
    let text = e.innerText;
    if (this.state.chosenAmount <= q) {
      this.setState({quantity: q, sku: s, size: text});
    } else {
      this.setState({quantity: q, chosenAmount: 0, sku: s, size: text});
    }
  }

  handlePriceChange (q) {
    this.setState({chosenAmount: q});
  }

  handlePictureChange (direction) {
    if (direction && this.state.picIndex < this.state.picMax) {
      this.setState({picIndex: (this.state.picIndex + 1)})
    } else if (!direction && this.state.picIndex > 0) {
      this.setState({picIndex: (this.state.picIndex - 1)})
    }
  }

  retrieveCart () {
  }

  sendToCart () {
    let id = this.state.sku;
    // console.log(id);
    if (id !== 0) {
      axios.post(`/cart/${id}`)
    }
  }

  toggleModal (boo) {
    this.setState({openModal: boo});
  }

  render () {
    return (
      <OverDiv>
        <Top>
          <h1>{this.state.productSelected.name}</h1>
          <StarsDiv>
            <Stars rating={this.state.starRating} />
          </StarsDiv>
        </Top>
        <h3> {this.state.productSelected.slogan}</h3>

        
        <StyleSelector 
        styles={this.state.productStyles} 
        styleHandler={this.handleStyleChange} 
        sizeHandler={this.handleSizeChange} 
        priceHandler={this.handlePriceChange}
        currentStyle={this.state.styleSelected} 
        quantity={this.state.quantity} 
        price={this.state.productPrice}
        totalPrice={this.state.chosenAmount * this.state.productPrice}
        cartHandler={this.sendToCart}
        picHandler={this.handlePictureChange}
        picIndex={this.state.picIndex}
        openModal={this.state.openModal}
        modalHandler={this.toggleModal}
        />
        <ProductInfo>
          <div>
          <p><b>Style</b>: {this.state.productStyles[this.state.styleSelected].name}</p>
          <p>{this.state.productSelected.description}</p>
          </div>
          <Features>
            <b>Features</b>
            {_.map(this.state.productSelected.features, (feature) => {
              if (feature.value === null) {
                return (<li>{feature.feature}</li>)
              } else {
                return (<li>{feature.feature}: {feature.value}</li>)
              }
            })}
          </Features>
        </ProductInfo>
      </OverDiv>
      
    )
  }
}

const OverDiv = styled.div`
  display: flex;
  width: 100%;
  height: 1000px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
  float: left;
  flex-direction: column;
`

const Top = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin: 8px;
  align-items: center;
  float: left;
`

const StarsDiv = styled.div`
  display: flex;
  width: 80px;
  height: 25px;
  margin: 8px;
  float: left;
`

const ProductInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  margin: 8px;
`

const Features = styled.div`
  display: flex;
  width: 35%;
  height: 100px;
  border-left: 1px solid grey;
  flex-direction: column;
`



export default Overview;


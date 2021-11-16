import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import styled from "styled-components";
import ComparisonModal from "./ComparisonModal.jsx";
import Stars from "../Shared/Stars.jsx";
import no_img from "./no_img.png"

class RPEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      productStyle: {},
      productRatings: {},
      openModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.getAvgRating = this.getAvgRating.bind(this);
  }

  componentDidMount() {
    this.getProductInfo(),
    this.getProductStyle(),
    this.getProductRating();
  }

  componentDidUpdate(prevProps) {
    if (this.props.relatedProductId !== prevProps.relatedProductId) {
      this.getProductInfo(),
      this.getProductStyle(),
      this.getProductRating();
    }
  }


  //////////////////////////////////////////////////////////////////////////////////
  getProductInfo() {
    const id = this.props.relatedProductId;
    axios
      .get(`products/${id}`)
      .then((results) => {
        //console.log('Results in getProductInfo: ', results.data)
        this.setState({
          productInfo: results.data,
        });
      })
      .catch((err) => {
        console.log("Error in getProductInfo");
      });
  }

  getProductStyle() {
    const id = this.props.relatedProductId;
    axios
      .get(`products/${id}/styles`)
      .then((results) => {
        //console.log('Results in getProductInfo: ', results.data)
        this.setState({
          productStyle: results.data,
        });
      })
      .catch((err) => {
        console.log("Error in getProductInfo");
      });
  }

  getProductRating() {
    const id = this.props.relatedProductId;
    axios
      .get(`reviews/meta/${id}`)
      .then((results) => {
        //console.log('Results in productRatings: ', results.data.ratings)
        this.setState({
          productRatings: results.data,
        });
      })
      .catch((err) => {
        console.log("Error in getProductInfo");
      });
  }


  //////////////////////////////////////////////////////////////////////////////////

  toggleModal() {
    this.setState({
      openModal: !this.state.openModal,
    });
  }

  getAvgRating() {
    const ratings = this.state.productRatings.ratings;
    let avgRating = 0;
    let length = 0;
    if (ratings) {
      let sum = 0;
      for (let key in ratings) {
        sum += key * ratings[key];
        length += Number(ratings[key]);
      }
      avgRating = sum / length;
    }
    return avgRating;
  }

  //////////////////////////////////////////////////////////////////////////////////

  render() {
    const { category, name, default_price } = this.state.productInfo;
    const results = this.state.productStyle.results;
    const salePrice = results && results.sale_price;
    const avgRating = this.getAvgRating();

    return (
      <div>
        {this.state.openModal &&
        <ComparisonModal closeModal={this.toggleModal} rpInfo={this.state.productInfo} cpInfo={this.props.productInfo}/>
        }
        <Card>
          <Image url={results && this.state.productStyle.results[0].photos[0].thumbnail_url}>
          <ButtonContainer>
            {this.props.rp && <Button onClick={this.toggleModal}>★</Button>}
            {this.props.outfit && <Button onClick={() => {this.props.deleteOutfit(this.state.productInfo.id)}}>ⓧ</Button>}
          </ButtonContainer>
          {this.props.rp && <Click onClick={() => this.props.handleProductChange(this.state.productInfo.id)}> </Click>}
          </Image>
          <Content>
            <p>
              {category} <br></br>
              {name} <br></br>
              {salePrice ? "$" + salePrice : "$" + default_price} <br></br>
              {avgRating ? <Stars rating={avgRating}/> : ''}
            </p>
          </Content>
        </Card>

      </div>
    );

  }
}

const Card = styled.div`
  width: 180px;
  height: 300px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
`;

const Content = styled.div`
  width: 200px;
  height: 80px;
  padding: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  border: none;
  color: black;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`


const Image = styled.div`
  width: 100%;
  height: 200px;
  // border: solid;
  background-image: url(${props => props.url || no_img });
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const Click = styled.div`
  width: 100%;
  height: 170px;
  //border: solid;
`

export default RPEntry;

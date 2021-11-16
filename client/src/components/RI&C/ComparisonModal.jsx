import ReactDOM from "react-dom";
import React from "react";
import $ from "jquery";
import axios from "axios";
import styled from "styled-components";


class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: {},
    };
  }

  componentDidMount() {
    this.getProductFeatures()
  }

  getProductFeatures() {
    const currentProductFeatures = this.props.cpInfo.features;
    const relatedProductFeatures = this.props.rpInfo.features;
    let features = {}
    //get features value for current product
    currentProductFeatures.forEach((item) => {
      features[item.feature] = {
        'product1': item.value,
        'product2': null
      }
    })
    //get features value for related product
    relatedProductFeatures.forEach((item) => {
      features[item.feature] = {
        'product1': null,
        'product2': item.value
      }
    })
    //update state
    this.setState({
      features: features
    })

  }

  render() {
    //console.log(this.state.features)
    const festures = this.state.features
    return (
      <div>
        <Background>
          <ModalWrapper>
            <CloseButton>
              <button onClick={() => { this.props.closeModal(); }}> X </button>
            </CloseButton>
            <Table>
              <thead>
                <TR>
                  <TH>{this.props.cpInfo.name}</TH>
                  <TH>Characteristics</TH>
                  <TH>{this.props.rpInfo.name}</TH>
                </TR>
              </thead>
              <tbody>
               {Object.keys(festures).map((key, i) => {
                 //console.log(`${key} : ${festures[key].product1}`)
                 let f1 = festures[key].product1 ? festures[key].product1 : " ";
                 let f2 = festures[key].product2 ? festures[key].product2 : " ";
                 return (
                   <TR key={i}>
                     <TD>{f1}</TD>
                     <TD>{`${key}`}</TD>
                     <TD>{f2}</TD>
                  </TR>
                 )
                 })
               }
              </tbody>
            </Table>
          </ModalWrapper>
        </Background>
      </div>
    );
  }
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(200, 200, 200, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999
`;

const ModalWrapper = styled.div`
  width: 900px;
  height: 400px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  z-index: 9999
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Table = styled.table`
  border-collapse: collapse;
  overflow-y: scroll;
`;

const TR = styled.tr`
  border: 1px solid #ddd;
`

const TD = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  padding: 5px;
`

const TH = styled.th`
  border: 1px solid #ddd;
  padding: 5px;
  background-color: #ddd;
`

export default ComparisonModal;

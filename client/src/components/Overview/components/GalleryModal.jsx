
import React from "react";
import styled from "styled-components";

class GalleryModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: this.props.url,
        closeModal: this.props.closeModal
      };
    }
  
    componentDidMount() {

    }
  
    render() {
      return (

            <Background>
            <ModalWrapper>
                <CloseButton>
                    <button onClick={(e) => {this.state.closeModal(false)}}>X</button>
                </CloseButton>
                <ModalImage url={this.state.url} />
            </ModalWrapper>
            </Background>

      );
    }
  }

const ModalWrapper = styled.div`
  width: 900px;
  height: 400px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  z-index: 9999;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalImage = styled.img`
  display: flex;
  height: 95%;
  width: 600px;
  // border: solid;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
`;

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

export default GalleryModal;
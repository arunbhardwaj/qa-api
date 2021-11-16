import React from 'react';
import axios from 'axios';
import styled from "styled-components";

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      nickname: "",
      email: "",
      product_id: this.props.product_id,
      showModal: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onClose() {
    this.setState({ showModal: !this.state.showModal })
  }

  updateQuestions(e) {
    e.preventDefault();
    axios.post('/qa/questions', {
      body: this.state.body,
      name: this.state.nickname,
      email: this.state.email,
      product_id: this.state.product_id
    })
    .then((res) => {
      this.props.updateQuestions()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <Background>
          <ModalWrapper>
            <CloseButton><button onClick={()=> {this.props.show()}}>X</button></CloseButton>
        <form onSubmit={(e) => {this.updateQuestions(e); this.props.show()}}>
          <input type="text" value={this.state.body} name="body" onChange={this.handleChange} placeholder= "Why did you like the product or not?"></input>
          <input type="text" value={this.state.nickname} placeholder="Example: jacskon11!" name="nickname" onChange={this.handleChange}></input>
          <input type="text" value={this.state.email} name="email"
           placeholder="Example: gman@gmail.com" onChange={this.handleChange}></input>
          <input type="submit" value="submit Question"></input>
        </form>
        </ModalWrapper>
        </Background>
      </div>
    )
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

export default AddQuestion;
import React from 'react';
import axios from 'axios';
import styled from "styled-components";

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      nickname: "",
      email: "",
      photos: [],
      question_id: null,
      showModal: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.updateAnswers = this.updateAnswers.bind(this);
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

  updateAnswers(e, question_id) {
    e.preventDefault();
    let question_id = question_id;
    axios.put('/qa/questions', {
      question_id: question_id
    })
    .then((res) => {
      this.props.updateAnswers()
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
        <form onSubmit={(e) => {this.updateAnswers(e); this.props.show()}}>
          <input type="text" value={this.state.body} name="body" onChange={this.handleChange} placeholder= "What is your answer?"></input>
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

export default AddAnswer;
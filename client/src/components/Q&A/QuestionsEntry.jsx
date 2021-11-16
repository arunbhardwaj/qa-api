import React from 'react';
import AnswersEntry from './Q&AnswersEntry.jsx';
import AddQuestion from './AddQuestion.jsx';
import axios from 'axios';
import styled from 'styled-components';


class QuestionEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayedQuestions: [],
      indexDisplayed: 0,
      helpfulButtonClicked: false,
      addAnswerButtonClicked: false,
      showQuestionModal: false,
      showAddAnswerModal: false,
      isReported: false,
      product_id: this.props.product_id
    }
    this.showNextQuestions = this.showNextQuestions.bind(this);
    this.onHelpfulClick = this.onHelpfulClick.bind(this);
    this.showQuestionModal = this.showQuestionModal.bind(this);
    this.handleReportButtonClick = this.handleReportButtonClick.bind(this);
    this.renderOnSearchTerm = this.renderOnSearchTerm.bind(this);
  }

  componentDidMount() {
    this.showNextQuestions();
  }

  // function that displays 2 more questions
  showNextQuestions () {
    let displayedQuestions = this.state.displayedQuestions;
    let indexDisplayed = this.state.indexDisplayed;
    let questions = [...this.props.questions];
    if (questions.length <= 4) {
      for (let i = indexDisplayed; i <= questions.length; i++) {
        displayedQuestions.push(questions[i]);
      }
    } else {
      for (let i = indexDisplayed; i <= indexDisplayed + 3; i++) {
        if (displayedQuestions.length < questions.length) {
          displayedQuestions.push(questions[i]);
        }
      }
    }
    this.setState({
      indexDisplayed: this.state.indexDisplayed + 4,
      displayedQuestions: displayedQuestions
    })
  }

  // on click, updates the helpfulness of the question
  onHelpfulClick(question_id) {
    axios.put(`/qa/questions/${question_id}/helpful`)
    .then((response) => {
      this.props.updateHelpfulness(question_id)
    })
    .catch((err) => {
      console.log(err, "err")
    })
  }

  // toggles the show state to either show the question modal or not
  showQuestionModal() {
    this.setState({showQuestionModal: !this.state.showQuestionModal});
  }
  // toggles the state to either show the answer modal or not
  showAddAnswerModal() {
    this.setState({showAddAnswerModal: !this.state.showAddAnswerModal})
  }
  // sends the question ID to the Q&AIndex and then updates the state and API. Also sets the reported button to true
  handleReportButtonClick(question_id) {
    this.props.updateQuestionReport(question_id)
    this.setState({isReported: true});
  }

  renderOnSearchTerm(reportButtonText) {
    if (this.props.searchedTerm.length < 3) {
      return (
        null
      )
      this.state.questions.filter((question) => {
        if (question.question_body.toLowerCase().split('').includes(this.props.searchedTerm.toLowerCase())) {
          return (
            <>
            <h1> Q: {question.question_body}</h1>
            <h4> helpful? <button onClick={() => {this.onHelpfulClick(question.question_id)}}>YES</button>{question.question_helpfulness} || <button onClick={() => {this.handleReportButtonClick(question.question_id)}}>{reportButtonText}</button></h4>
            <AnswersEntry answer={question.answers}
            updateAnswerReport={this.props.updateAnswerReport}
            updateAnswerHelpfulness={this.props.updateAnswerHelpfulness}/>
            <button onClick={() => {this.showAddAnswerModal()}}>Add Answer</button>
            </>
          )
        }
      })
    }
  }

  render() {
    const reportButtonText = this.state.isReported ? "Reported" : "Report"
    return (
      <div>
      <AccordianSection>
        {this.state.displayedQuestions.map(indQuestion => {
          return (
            <>
            <QuestionWords>
            <h1> Q: {indQuestion.question_body}</h1>
            <h4> helpful? <button onClick={() => {this.onHelpfulClick(indQuestion.question_id)}}>YES</button>{indQuestion.question_helpfulness} || <button onClick={() => {this.handleReportButtonClick(indQuestion.question_id)}}>{reportButtonText}</button></h4>
            </QuestionWords>
            <AnswersEntry answer={indQuestion.answers}
            updateAnswerReport={this.props.updateAnswerReport}
            updateAnswerHelpfulness={this.props.updateAnswerHelpfulness}/>
            <button onClick={() => {this.showAddAnswerModal()}}>Add Answer</button>
            </>
          )
        })}
        </AccordianSection>
        {this.props.questions.length > 2 &&
        <>
        <ButtonStyles>
        <button onClick={this.showNextQuestions}>More Answered Questions</button>
        <button onClick={this.showQuestionModal}>Add Question</button>
        </ButtonStyles>
        { this.state.showQuestionModal &&
        <AddQuestion updateQuestions={this.props.updateQuestions}showNextQuestions={this.showNextQuestions}displayedQuestions={this.state.displayedQuestions} getQuestions={this.props.getQuestions}
        product_id={this.props.product_id}
        show={this.showQuestionModal}/>}
        </>}
        </div>
    )
  }
}

const AccordianSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  background: rgba(200, 200, 200, 0.5)
  width: 75%
  border: solid;
  font-size: 15px;
  outline: none;
  overflow-y: scroll;
  overflox-x: scroll;
`;

const ImageSize = styled.div`
  max-height: 150px;
  max-width: 200px;
  width: 120px;
  height: 120px;

`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center
  padding: 5px;
  align-items: center;
`;

const ButtonStyles = styled.button`
  background-color: #555555;
  font-size: 12px;
  display: flex;
  justify-content: center
  padding: 5px;
  align-items: center;
`;

const QuestionWords = styled.div`
  text-align: left;
  width: 800px;
  border: none;
`;




export default QuestionEntry;
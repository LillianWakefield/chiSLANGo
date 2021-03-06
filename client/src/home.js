import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import axios from 'axios'
import EndGame from './endGame.js'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      phrase: [],
      literal_translation: [],
      answer1: [],
      answer2: [],
      answer3: [],
      answer4: [],
      score: 0,
      answerStatus: "",
      correctAnswer: "",
      isButton1Disabled: false,
      isButton2Disabled: false,
      isButton3Disabled: false,
      isButton4Disabled: false,
      questionsRemaining: 0,
    }
  }
//sets state when page loads for first question
  componentDidMount() {
    axios.post('/indexRouter/getquestions').then(({ data }) => {
      this.setState(data)
    })
  }

//sends answer to backend
answer(e){
  e.preventDefault();
  if(e.target.id === "button1"){
    this.setState({
      isButton1Disabled: true});
      var answer = this.state.answer1
  }  
  else if(e.target.id === "button2"){
    this.setState({
      isButton2Disabled: true});
    var answer = this.state.answer2
  }
  else if(e.target.id === "button3"){
    this.setState({
      isButton3Disabled: true});
    var answer = this.state.answer3
  }
  else if(e.target.id === "button4"){
    this.setState({
      isButton4Disabled: true});
    var answer = this.state.answer4
  } 

  if (answer === this.state.correctAnswer) {
    //sends user response to backend and sets state depending on if answer if correct or not
    axios.post('/indexRouter/answer', {answer: answer}).then(({ data }) => {
      this.setState({
      answerStatus: data.answerStatus,
      score: data.score 
    })
      })
  } else {
    this.setState({
      answerStatus: 'Incorrect'
    })
  }
  }
  //sets state for next question
  continue(){
      axios.post('/indexRouter/continue').then(({ data }) => {
      this.setState(data);
    })
}
  render() {
    console.log(this.state.questionsRemaining)
    if (this.state.questionsRemaining === 1){
      return (
        <EndGame/>
      )
    }
    else {
    return (
      <div>
        <div className="container">
          <div className="card text-center">
            <div className="card-body">
              <h3>Phrase in Spanish: {this.state.phrase}</h3>
              <h3>Literal translation: {this.state.literal_translation}</h3>
              <h3>What you think it means:</h3>
              <form className="answers">
                <button id="button1" onClick={this.answer.bind(this)} disabled={this.state.isButton1Disabled} className="btn btn-lg hvr-grow large">{this.state.answer1}</button>
                <button id="button2" onClick={this.answer.bind(this)} disabled={this.state.isButton2Disabled} className="btn btn-lg hvr-grow large">{this.state.answer2}</button>
                <button id="button3" onClick={this.answer.bind(this)} disabled={this.state.isButton3Disabled} className="btn btn-lg hvr-grow large">{this.state.answer3}</button>
                <button id="button4" onClick={this.answer.bind(this)} disabled={this.state.isButton4Disabled} className="btn btn-lg hvr-grow large">{this.state.answer4}</button>
              </form>
              <button id="nextQuestion" name="continueButton" onClick={this.continue.bind(this)} className="btn btn-lg hvr-grow small">Continue</button>
              <h1>SCORE: {this.state.score}</h1>
              <h3>{this.state.answerStatus}</h3>
              <Link to="/" className="btn btn-lg hvr-grow large">Log Out</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
}

  export default Home;
import React, { useState } from 'react';
import QuizData from '../Data/QuizData'
import QuizResult from './QuizResult';
import Img1 from '../Images/Image.gif'

const getOptionClass = (qid, op, attempts) => {
  let found = attempts.find(attempt => attempt.qid === qid && attempt.op === op);
  if (found) return found.isCorrect ? "list-group-item active correct" : "list-group-item active wrong";
  else return "list-group-item";
}

export default function Quiz() {
  const [attempts, setattempts] = useState([]);
  const [currentquestion, setCurrentQuestion] = useState(0);
  const [score, setscore] = useState(0);
  const [ClickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);


  const changequestion = () => {
    updatescore();
    if (currentquestion < QuizData.length - 1) {
      setCurrentQuestion(currentquestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true)
    }
  }


  const updatescore = () => {
    if (ClickedOption === QuizData[currentquestion].answerIndex)
      setscore(score);
  }


  const handloptionselection = (qid, op, answerIndex) => {
    const attemptExists = attempts.find(attempt => attempt.qid === qid);
  
    if (attemptExists) {
      const updatedAttempts = attempts.map(attempt => {
        if (attempt.qid === qid) {
          return { ...attempt, op: op, isCorrect: answerIndex === QuizData[currentquestion].Options.indexOf(op) };
        }
        return attempt;
      });
  
      setattempts(updatedAttempts);
      setscore(updatedAttempts.filter(attempt => attempt.isCorrect).length);
    } else {
      const isCorrect = answerIndex === QuizData[currentquestion].Options.indexOf(op);
      const attempt = { qid: qid, op: op, isCorrect: isCorrect };
      setattempts([...attempts, attempt]);
  
      if (isCorrect) {
        setscore(score + 1);
      }
    }
  };
  const resetAll=()=>{
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setscore(0);
    setattempts([0]); 
  }


  return (
    <div>
      
      <p className="heading-txt" style={{ color: "#1DDFD1" }}  > <img src={Img1} alt="Logo" className="logo"/> Quiz App</p>
      <div className="container">
        {showResult ? (
          <QuizResult score={score} totalscore={QuizData.length} tryagain = {resetAll} />
        ) : (
          <>
            <div className="question">
              <span id="question-txt">{QuizData[currentquestion].id}. {QuizData[currentquestion].question}</span>
            </div>

            <div className="Options-container">
              <ul className="list-group" >
                {QuizData[currentquestion].Options.map(op => (
                  <button

                    style={{
                      background:
                        getOptionClass(QuizData[currentquestion].id, op, attempts) === "list-group-item active correct" ? "green" :
                          getOptionClass(QuizData[currentquestion].id, op, attempts) === "list-group-item active wrong" ? "red" :
                            "white"
                    }}
                    className={getOptionClass(QuizData[currentquestion].id, op, attempts)}
                    key={op}
                    onClick={() => handloptionselection(QuizData[currentquestion].id, op, QuizData[currentquestion].answerIndex)}
                  >
                    {op}
                  </button>
                ))}
              </ul>
            </div>
            <input type="button" value="Next" id="next-button" onClick={changequestion}></input>
          </>)}
      </div>
    </div>
  )
}
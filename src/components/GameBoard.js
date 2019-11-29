import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import { getQuestionsHook } from './Questions';
import { TeamScore } from './TeamScore';
import { UseGlobalStateContext } from '../context/globalStateContext';
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const GameBoard = () => {
    document.title = 'Irving Family Feud';
    const { loading, questions, error } = getQuestionsHook()

    const { setScoreAmount } = UseGlobalStateContext().globalContext
    const [questionIndex, setquestionIndex] = useState(getRandomInt(1977))
    const [questionNumber, setquestionNumber] = useState(0)

    const [countdown, setcountdown] = useState(10)

    if (loading || error) return null
    else {
        function handleNext() {
            let currentQIndex = questionNumber;

            if (currentQIndex !== questions.length - 1) {
                currentQIndex++;
                setquestionNumber(currentQIndex)
                setquestionIndex(getRandomInt(1977))
            }
        }

        const currentQuestion = questions[questionIndex];
        function runTimer() {
            let timeleft = 10;

            const downloadTimer = setInterval(function () {
                document.getElementById("countdown").innerHTML = timeleft;
                timeleft -= 1;
                if (timeleft <= 0) {
                    clearInterval(downloadTimer);
                    document.getElementById("countdown").innerHTML = "Finished"
                    setTimeout(() => {
                        document.getElementById("countdown").innerHTML = ""
                    }, 1500);
                }
            }, 1000);
        }


        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title"><span>Family</span> Irving Feud</h1>
                </header>
                <h1>Question {questionNumber + 1}</h1>
                <h2>id: {questionIndex}</h2>
                <h2 className='question'>{currentQuestion.question}</h2>

                <div className='choices-container'>
                    {currentQuestion.choices.map((choice, i) => {
                        const scoreRegex = choice.replace(/\D/g, '')
                        return (
                            <div onClick={() => setScoreAmount(Number(scoreRegex))} key={choice} className='choice-container'>
                                <input className="checkbox" type='checkbox' id={i} />
                                <label htmlFor={i} className='cover'>{i + 1}</label>
                                <div className='choice'>{choice}</div>
                            </div>
                        )
                    })}
                </div>

                <div className='buttons'>
                    <button className="question-button" onClick={handleNext}>Next Question</button>
                </div>
                <h1 className="timer" onClick={runTimer}>Timer</h1>

                <h1 id="countdown" />
                <TeamScore team1 />
                <TeamScore />
            </div>
        )
    }

}

export default GameBoard;

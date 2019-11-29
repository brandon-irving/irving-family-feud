import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import { getQuestionsHook } from './Questions';
import { TeamScore } from './TeamScore';
import { UseGlobalStateContext } from '../context/globalStateContext';
import { LeftArrow, RightArrow } from './arrow/arrows';
import { CountDownTimer } from './CountDownTimer/CountDownTimer';
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const GameBoard = () => {
    document.title = 'Irving Family Feud';
    const { loading, questions, error } = getQuestionsHook()
    const { setFirstScore, setSecondScore, setScoreAmount, scoreAmount, firstScore, secondScore } = UseGlobalStateContext().globalContext
    const [questionIndex, setquestionIndex] = useState(getRandomInt(1977))
    const [questionNumber, setquestionNumber] = useState(0)
    const [roundPoints, setRoundPoints] = useState(0)

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

        function stealFromTeamOne() {
            const stolenAmount = secondScore + scoreAmount
            const newFistScore = firstScore - scoreAmount < 1 ? 0 : firstScore - scoreAmount
            setFirstScore(newFistScore)
            setSecondScore(stolenAmount)
        }
        function stealFromTeamTwo() {
            const stolenAmount = firstScore + scoreAmount
            const newSecondScore = secondScore - scoreAmount < 1 ? 0 : secondScore - scoreAmount
            setSecondScore(newSecondScore)
            setFirstScore(stolenAmount)
        }
        const handleAnswerClick = (score) => {
            const newScore = score + roundPoints

            setTimeout(() => {
                setRoundPoints(newScore)
                setScoreAmount(newScore)
            }, 100);


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
                            <div onClick={() => handleAnswerClick(Number(scoreRegex))}
                                key={choice} className='choice-container'>
                                <input className="checkbox" type='checkbox' id={i} />
                                <label htmlFor={i} className='cover'>{i + 1}</label>
                                <div className='choice'>{choice}</div>
                            </div>
                        )
                    })}
                </div>


                <div className="game-dynamics">
                    <div>
                        <h1 className="timer" onClick={runTimer}>Timer</h1>
                        <CountDownTimer />
                    </div>
                    <div className='buttons'>
                        <button className="question-button" onClick={handleNext}>Next Question</button>
                    </div>
                    <div>
                        <h1>Steal Points!</h1>
                        <div className="steal-points-container">
                            <LeftArrow onClick={stealFromTeamOne} />
                            <RightArrow onClick={stealFromTeamTwo} />
                        </div>
                        <h1 id="countdown" />
                    </div>
                    <TeamScore team1 />
                    <TeamScore />
                </div>
            </div>
        )
    }

}

export default GameBoard;

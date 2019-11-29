import React, { useState } from 'react'
import './AnswerBoard.css'
import { getQuestionsHook } from './Questions';

const AnswerBoard = () => {
    const [searchInput, setSearchInput] = useState('')
    const { loading, questions, error } = getQuestionsHook()
    if (loading) return null
    else {
        const questionIndex = Object.keys(questions)
        console.log("log: questions", questions[searchInput])
        const foundQuestion = questions[searchInput] ? questions[searchInput] : { question: 'Not Found', choices: ['0'] }
        return (
            <div>
                <input onChange={e => setSearchInput(e.target.value)} className="search-bar" type="number" placeholder="Search..." />
                <div className="answer-board">
                    <h2>{foundQuestion.question}</h2>
                    {foundQuestion.choices.map(choice => {
                        return (<h3>{choice}</h3>)
                    })}
                </div>
            </div>

        )
    }

}

export default AnswerBoard
import React, { useState } from 'react'
import { UseGlobalStateContext } from '../context/globalStateContext';

/**
 * 
 * wait time 30 seconds
 * https://www.youtube.com/watch?v=IkdmOVejUlI
 * https://www.youtube.com/watch?v=5Q_2nrp9OTg
 * https://www.youtube.com/watch?v=WGIJh1qXXPA
 * https://www.youtube.com/watch?v=cUlPZN5ZzU4
 */
export const TeamScore = (props) => {
    const { score, team1, teamName } = props
    const { setFirstScore, setSecondScore, scoreAmount, firstScore, secondScore } = UseGlobalStateContext().globalContext
    const [firstTeamName, setfirstTeamName] = useState('Team 1')
    const [secondTeamName, setsecondTeamName] = useState('Team 2')
    const team1Style = {
        right: '80%',
        position: 'absolute',
        bottom: ' 60%',

    }
    const team2Style = {
        left: '80%',
        position: 'absolute',
        bottom: ' 60%',

    }
    const style = team1 ? team1Style : team2Style
    function handleAdd() {

        team1 && setFirstScore(scoreAmount + firstScore)
        !team1 && setSecondScore(scoreAmount + secondScore)
    }
    function handleChange(e) {
        team1 && setfirstTeamName(e.target.value)
        !team1 && setsecondTeamName(e.target.value)
        console.log("log: e", e.target.value)
    }
    return (
        <div style={style}>
            <input onChange={handleChange} type="text"></input>
            <h1>{team1 ? firstTeamName : secondTeamName}</h1>

            <h1>
                {team1 ? firstScore : secondScore}
                <span className="add-button" onClick={handleAdd}>+</span>
            </h1>

        </div>
    )
}

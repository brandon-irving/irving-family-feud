import React, { useReducer, useContext, createContext } from 'react'
import { globalStateReducer, globalInitialState, globalStateActions } from './globalStateReducer'
export const GlobalStateContext = createContext()


export const GlobalStateProvider = ({ children }) => {

    const [globalState, globalDispatch] = useReducer(globalStateReducer, globalInitialState)

    const setFirstScore = (firstScore) => globalDispatch({ type: globalStateActions.SET_FIRST_SCORE, firstScore })
    const setSecondScore = (secondScore) => globalDispatch({ type: globalStateActions.SET_SECOND_SCORE, secondScore })
    const setScoreAmount = (scoreAmount) => globalDispatch({ type: globalStateActions.SET_SCORE_AMOUNT, scoreAmount })


    const globalContext = {
        ...globalState,
        setFirstScore,
        setSecondScore,
        setScoreAmount

    }
    return (
        <GlobalStateContext.Provider value={{ globalContext }}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export const UseGlobalStateContext = () => {
    return useContext(GlobalStateContext)
}

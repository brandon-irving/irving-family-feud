export const globalInitialState = {
    firstScore: 0,
    secondScore: 0,
    scoreAmount: 0


}

export const globalStateActions = {
    SET_FIRST_SCORE: 'SET_FIRST_SCORE',
    SET_SECOND_SCORE: 'SET_SECOND_SCORE',
    SET_SCORE_AMOUNT: 'SET_SCORE_AMOUNT',
    RESET_CACHE: 'RESET_CACHE'

}

export const globalStateReducer = (state = globalInitialState, action) => {
    switch (action.type) {
        case globalStateActions.SET_FIRST_SCORE:
            return {
                ...state,
                firstScore: action.firstScore
            }
        case globalStateActions.SET_SECOND_SCORE:
            return {
                ...state,
                secondScore: action.secondScore
            }
        case globalStateActions.SET_SCORE_AMOUNT:
            return {
                ...state,
                scoreAmount: action.scoreAmount
            }
        default:
            return state
    }
}



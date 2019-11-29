import React from 'react'
import GameBoard from './components/GameBoard';
import { GlobalStateProvider } from './context/globalStateContext';
import AnswerBoard from './components/AnswerBoard'
import {
  isMobile
} from "react-device-detect";
const App = () => {
  return (
    <GlobalStateProvider>
      {isMobile ? <AnswerBoard /> : <GameBoard />}
    </GlobalStateProvider>
  )
}
export default App
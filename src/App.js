import React, { useState } from 'react';
import { create2DArray } from './js/utils'
import { EMPTY_CELL } from './js/constants'
import {
  createRandomShips,
  shotHandler,
} from './js/functions'
import { aiTurn } from './js/ai'

import './styles/App.css';

import { BattleField } from './components/BattleField'
import { ShipPicker } from './components/ShipPicker'

const initialPlayerArr = createRandomShips(create2DArray(10, 10, EMPTY_CELL));
const initialAiArr = createRandomShips(create2DArray(10, 10, EMPTY_CELL));

const App = () => {
  const [ playerArr, setPlayerArr ] = useState(initialPlayerArr)
  const [ aiArr, setAiArr ] = useState(initialAiArr)
  const [ currentPlayer, setCurrentPlayer ] = useState('Player')
  const [ infoMessage, setInfoMessage ] = useState('Preparing')

  const onCellClick = (x, y) => {
    if(currentPlayer === 'Ai') return
    const shotInfo = shotHandler(x, y, aiArr, setAiArr)
    if(shotInfo.result === 'win'){
      alert('Player wins!')
      return
    }
    else if(shotInfo.result === 'missed'){
      setCurrentPlayer('Ai')
      setTimeout(() => {
        aiTurn(playerArr,
          setPlayerArr,
          () => { setCurrentPlayer('Player') },
          () => { alert('Ai wins!') }
        )
      }, 500)
    }
  }

  return (
    <div className='app'>
      <div className='info'>{infoMessage}</div>
      <div className='game-container'>
        <ShipPicker />
        <BattleField
          cellsArray = {playerArr}
          player = {true} />
        <BattleField
          cellsArray = {aiArr}
          clickCallback = {onCellClick} />
      </div>
    </div>
  );
}

export default App

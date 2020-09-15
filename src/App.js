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

const initialPlayerArr = createRandomShips(create2DArray(10, 10, EMPTY_CELL));
const initialAiArr = createRandomShips(create2DArray(10, 10, EMPTY_CELL));

const App = () => {
  const [ playerArr, setPlayerArr ] = useState(initialPlayerArr)
  const [ aiArr, setAiArr ] = useState(initialAiArr)
  const [ currentPlayer, setCurrentPlayer ] = useState('Player')

  const onCellClick = (x, y) => {
    shotHandler(x, y, aiArr, setAiArr)
    aiTurn(playerArr, setPlayerArr)
  }

  return (
    <div className='app'>
      <div>{currentPlayer} turn</div>
      <BattleField
        cellsArray = {playerArr}/>
      <BattleField
        cellsArray = {aiArr}
        clickCallback = {onCellClick} />
    </div>
  );
}

export default App

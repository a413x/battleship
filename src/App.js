import React, { useState } from 'react';
import { create2DArray } from './js/utils'
import { EMPTY_CELL, SHIP_CELL, HITTED, MISSED } from './js/constants'
import { createRandomShips, updateCellsArray } from './js/functions'

import './styles/App.css';

import { BattleField } from './components/BattleField'

const initialPlayerArr = createRandomShips(create2DArray(10, 10, EMPTY_CELL));
const initialAiArr = createRandomShips(create2DArray(10, 10, EMPTY_CELL));

const App = () => {
  const [ playerArr, setPlayerArr ] = useState(initialPlayerArr)
  const [ aiArr, setAiArr ] = useState(initialAiArr)

  const onCellClick = (x, y, player) => {
    const arr = player === 'ai' ? aiArr : playerArr
    const setter = player === 'ai' ? setAiArr : setPlayerArr
    const value = arr[x][y]
    if(value === EMPTY_CELL){
      setter(updateCellsArray(x, y, MISSED, arr))
    }else if(value === SHIP_CELL){
      setter(updateCellsArray(x, y, HITTED, arr))
    }
  }

  return (
    <div className='app'>
      <BattleField
        cellsArray = {playerArr}
        player = 'player'
        clickCallback = {onCellClick} />
      <BattleField
        cellsArray = {aiArr}
        player = 'ai'
        clickCallback = {onCellClick} />
    </div>
  );
}

export default App

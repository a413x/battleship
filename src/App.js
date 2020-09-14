import React, { useState } from 'react';
import { create2DArray } from './js/utils'
import { EMPTY_CELL } from './js/constants'
import {
  createRandomShips,
  shotHandler,
} from './js/functions'

import './styles/App.css';

import { BattleField } from './components/BattleField'

const initialPlayerArr = createRandomShips(create2DArray(10, 10, EMPTY_CELL));
const initialAiArr = createRandomShips(create2DArray(10, 10, EMPTY_CELL));

const App = () => {
  const [ playerArr, setPlayerArr ] = useState(initialPlayerArr)
  const [ aiArr, setAiArr ] = useState(initialAiArr)

  const onCellClick = (x, y) => {
    shotHandler(x, y, aiArr, setAiArr)
  }

  return (
    <div className='app'>
      <BattleField
        cellsArray = {playerArr}/>
      <BattleField
        cellsArray = {aiArr}
        clickCallback = {onCellClick} />
    </div>
  );
}

export default App

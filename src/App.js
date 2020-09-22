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

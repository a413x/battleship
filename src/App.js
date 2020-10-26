import React, { useState } from 'react';
import { create2DArray } from './js/utils'
import { EMPTY_CELL } from './js/constants'
import {
  createRandomShips,
  shotHandler,
  createShip,
  clearPositions
} from './js/functions'
import { aiTurn } from './js/ai'

import './styles/App.css';

import { BattleField } from './components/BattleField'
import { ShipPicker } from './components/ShipPicker'

const initialPlayerArr = create2DArray(10,10, EMPTY_CELL)
const initialAiArr =
  createRandomShips(create2DArray(10, 10, EMPTY_CELL)).cells;

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

  const pickerDrop = (positions) => {
    const newArr = createShip(positions, playerArr)
    if(newArr === null) return false
    setPlayerArr(newArr)
    return true
  }

  const pickerDragStart = (positions) => {
    setPlayerArr(clearPositions(positions, playerArr))
  }

  const pickerSetRandom = () => {
    const randomShips = createRandomShips(create2DArray(10,10,EMPTY_CELL))
    setPlayerArr(randomShips.cells)
    return randomShips.positions
  }

  const pickerRotate = (indices, newIndices) => {
    const cleared = clearPositions(indices, playerArr)
    const newArr = createShip(newIndices, cleared)
    if(newArr === null) {
      setPlayerArr(cleared)
      return false
    }
    setPlayerArr(newArr)
    return true
  }

  const pickerResetAll = () => {
    setPlayerArr(initialPlayerArr)
  }

  const pickerReady = (ready) => {
  }

  return (
    <div className='app'>
      <div className='game-container'>
        <div className='info'>
          <span>{infoMessage}</span>
        </div>
        <ShipPicker
          onShipDrop = {pickerDrop}
          onShipDragStart = {pickerDragStart}
          onSetRandom = {pickerSetRandom}
          onShipRotate = {pickerRotate}
          onReady = {pickerReady}
          onResetAll = {pickerResetAll}
        />
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

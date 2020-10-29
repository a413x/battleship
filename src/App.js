import React, { useState } from 'react';
import { create2DArray } from './js/utils'
import { EMPTY_CELL } from './js/constants'
import {
  createRandomShips,
  shotHandler,
  createShip,
  clearPositions
} from './js/functions'
import { aiTurn, aiReset } from './js/ai'

import './styles/App.css';

import { BattleField } from './components/BattleField'
import { ShipPicker } from './components/ShipPicker'

const [SETUP, STARTED, FINISHED] = [0, 1, 2]

let prevPlayerArr = null

const createRandomArray = () => {
  return createRandomShips(create2DArray(10, 10, EMPTY_CELL)).cells
}

const initialPlayerArr = create2DArray(10,10, EMPTY_CELL)
const initialAiArr = createRandomArray()

const App = () => {
  const [ playerArr, setPlayerArr ] = useState(initialPlayerArr)
  const [ aiArr, setAiArr ] = useState(initialAiArr)
  const [ currentPlayer, setCurrentPlayer ] = useState('Player')
  const [ gameState, setGameState ] = useState(SETUP)
  const [gameBtnDisabled, setGameBtnDisabled] = useState(true)

  const onCellClick = (x, y) => {
    if(gameState !== STARTED) return
    if(currentPlayer === 'Ai') return
    const shotInfo = shotHandler(x, y, aiArr, setAiArr)
    if(shotInfo.result === 'win'){
      setGameState(FINISHED)
      alert('You win!')
      return
    }
    else if(shotInfo.result === 'missed'){
      setCurrentPlayer('Ai')
      setTimeout(() => {
        aiTurn(playerArr,
          setPlayerArr,
          () => { setCurrentPlayer('Player') },
          () => { setGameState(FINISHED); alert('Ai wins!') }
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
    setGameBtnDisabled(!Boolean(ready))
  }

  const onGameBtnClick = () => {
    if(gameState === SETUP){
      setCurrentPlayer('Player')
      setGameState(STARTED)
      prevPlayerArr = playerArr.map((arr) => arr.slice())
      aiReset()
    }
    else{
      setGameState(SETUP)
      if(prevPlayerArr) setPlayerArr(prevPlayerArr)
      else setPlayerArr(initialPlayerArr)
      prevPlayerArr = null
      setAiArr(createRandomArray())
    }
  }

  const gameBtnTitle = gameState === SETUP ? 'Start' : 'Restart'
  let infoMessage = ''
  if(gameState === SETUP) infoMessage = 'Setup your field'
  if(gameState === FINISHED) infoMessage = currentPlayer + ' Wins!'
  if(gameState === STARTED) infoMessage = currentPlayer + ' turn'

  return (
    <div className='app'>
      <div className='game-container'>
        <div className = 'info-container'>
          <span className = {gameState === FINISHED ? 'highlight-info' : ''}>
            {infoMessage}
          </span>
          <button
            className = 'game-btn'
            onClick = {onGameBtnClick}
            disabled = {gameBtnDisabled}>
            {gameBtnTitle}
          </button>
        </div>
        <ShipPicker
          onShipDrop = {pickerDrop}
          onShipDragStart = {pickerDragStart}
          onSetRandom = {pickerSetRandom}
          onShipRotate = {pickerRotate}
          onReady = {pickerReady}
          onResetAll = {pickerResetAll}
          visible = {gameState === SETUP}
        />
        <BattleField
          cellsArray = {playerArr}
          cellsHighlight = {true}
          player = {true} />
        <BattleField
          cellsArray = {aiArr}
          clickCallback = {onCellClick}
          cellsHighlight = {gameState === FINISHED} />
      </div>
    </div>
  );
}

export default App

import React, { useState, useEffect } from 'react'
import { ShipDraggable, indicesToPosition } from './ShipDraggable'
import { ShipDropzone } from './ShipDropzone'
import '../styles/ShipPicker.css'

const pickerShipsInit = {
  '1-1': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '1-2': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '1-3': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '1-4': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '2-1': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '2-2': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '2-3': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '3-1': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '3-2': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
  '4-1': {position: {x: 0, y: 0}, rotate: 0, dropped: false, valid: true},
}

export const ShipPicker = ({
    onShipDrop,
    onShipDragStart,
    onSetRandom,
    onShipRotate,
    onReady,
    onResetAll,
    visible
  }) => {

  const [pickerShips, setPickerShips] = useState(pickerShipsInit)

  useEffect(() => {
    let ready = true
    for(let id in pickerShips){
      ready &= pickerShips[id].dropped && pickerShips[id].valid
    }
    onReady(ready)
  })

  const updateShip = (
    id,
    position = {x: 0, y: 0},
    rotate = 0,
    dropped = false,
    valid = false
  ) => {
    const copy = {...pickerShips}
    copy[id] = {position, rotate, dropped, valid}
    setPickerShips(copy)
  }

  const setRandom = () => {
    const positions = onSetRandom()
    const pickerShipsCopy = {...pickerShips}
    for(let size in positions){
      const positionsArr = positions[size]
      for(let i = 0; i < positionsArr.length; i++){
        const id = size + '-' + (i+1)
        const draggable = document.querySelector('#draggable' + id)
        draggable.dataset.indices = JSON.stringify(positionsArr[i])
        const {top: y, left: x} = indicesToPosition(positionsArr[i])
        const rotate =
          size > 1 && positionsArr[i][0].x !== positionsArr[i][1].x ? 90 : 0
        pickerShipsCopy[id] = {
          position: {x, y},
          dropped: true,
          rotate: rotate,
          valid: true
        }
      }
    }
    setPickerShips(pickerShipsCopy)
  }

  const resetAll = () => {
    onResetAll()
    setPickerShips(pickerShipsInit)
  }

  const renderedShips = []

  for(let id in pickerShips){
    const {position, rotate, dropped, valid} = pickerShips[id]
    renderedShips.push(
      <ShipDraggable
        key = {id}
        id = {id}
        position = {position}
        rotate = {rotate}
        dropped = {dropped}
        valid = {valid}
        onShipDrop = {onShipDrop}
        onShipDragStart = {onShipDragStart}
        onShipRotate = {onShipRotate}
        updateShip = {updateShip}
      />
    )
  }

  return (
    <div
      className = 'ship-picker'
      style = {{display: visible ? 'flex' : 'none'}}
    >
      {renderedShips}
      <div className = 'button-container'>
        <button onClick = {resetAll}>
          ✖
        </button>
        <button onClick = {setRandom}>
          <span role='img' aria-label='dice'>🎲</span>
        </button>
      </div>
      <ShipDropzone />
    </div>
  )
}

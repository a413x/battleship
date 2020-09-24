import React from 'react'
import '../styles/Cell.css'
import { SHIP_CELL, HITTED, MISSED } from '../js/constants'

export let Cell = ({ cellValue, player }) => {
  let cellClassName = ''
  let cellContent = ''

  if(cellValue === HITTED) {
    cellClassName = 'hitted-cell'
    cellContent = '╳'
  }
  else if(cellValue === MISSED){
    cellClassName = 'missed-cell'
    cellContent = '●'
  }

  if(cellValue === SHIP_CELL && player) {
    cellClassName += ' player'
  }

  return (
    <td className = {cellClassName}>
      {cellContent}
    </td>
  )
}

Cell = React.memo(Cell)

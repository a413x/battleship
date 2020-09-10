import React from 'react'
import { Cell } from './Cell.js'

import '../styles/BattleField.css'

export const BattleField = ({ cellsArray, player, clickCallback }) => {
  const onClick = (e) => {
    const target = e.target;
    if(target.nodeName !== 'TD') return
    clickCallback(target.parentNode.rowIndex, target.cellIndex, player)
  }

  const renderedCells = cellsArray.map(( row, rowInd ) => {
    const renderedRow = row.map(( cell, cellInd ) =>
      <Cell key={'cell-' + cellInd} cellValue={cell} />
    )
    return (
      <tr key={'row-' + rowInd}>
        {renderedRow}
      </tr>
    )
  })

  return (
    <div className = 'battlefield'>
      <table className = 'table' onClick = {onClick}>
        <tbody>
          {renderedCells}
        </tbody>
      </table>
    </div>
  )
}

import React from 'react'
import { Cell } from './Cell.js'
import { range } from '../js/utils'

import '../styles/BattleField.css'

export const BattleField = ({ cellsArray, clickCallback, player }) => {
  const onClick = (e) => {
    const target = e.target;
    if(target.nodeName !== 'TD') return
    if(clickCallback){
      clickCallback(target.parentNode.rowIndex, target.cellIndex)
    }
  }

  const renderedCells = cellsArray.map(( row, rowInd ) => {
    const renderedRow = row.map(( cell, cellInd ) =>
      <Cell key={'cell-' + cellInd} cellValue={cell} player={player} />
    )
    return (
      <tr key={'row-' + rowInd}>
        {renderedRow}
      </tr>
    )
  })

  return (
    <div className = 'battlefield'>
      <div className='numeration numeration-v'>
        {range(1, 10).map((el,ind) =>
          <span key={'nums'+ind}>
            {el}
          </span>
        )}
      </div>
      <div>
        <div className='numeration'>
          {range('A',10).map((el,ind) =>
            <span key={'letters'+ind}>
              {el}
            </span>
          )}
        </div>
        <table className = {player && 'player-table'} onClick = {onClick}>
          <tbody>
            {renderedCells}
          </tbody>
        </table>
      </div>
    </div>
  )
}

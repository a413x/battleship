import React from 'react'
import { create2DArray, id } from '../utils/math'

import { Cell } from './Cell.js'

//create 2d array of field cells values
const cellsArray = create2DArray(10,10)

export const BattleField = ({ player }) => {
  const renderedCells = cellsArray.map(( row ) => {
    const renderedRow = row.map(( cell ) =>
      <Cell isShip={cell} key={id()}/>
    )
    return (
      <tr key={id()}>
        {renderedRow}
      </tr>
    )
  })

  return (
    <table>
      <tbody>
        {renderedCells}
      </tbody>
    </table>
  )
}

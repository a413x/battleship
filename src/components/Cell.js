import React from 'react'
import '../styles/Cell.css'
import { HITTED, MISSED } from '../js/constants'

export let Cell = ({ cellValue }) => {
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

  return (
    <td className = {cellClassName}>
      {cellContent}
    </td>
  )
}

Cell = React.memo(Cell)

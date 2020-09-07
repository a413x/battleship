import React, { useState } from 'react'
import '../styles/Cell.css'

export const Cell = ({ isShip }) => {
  const [ cellClassName, setCellClassName ] = useState('cell')
  const [ cellContent, setCellContent ] = useState('')

  const onCellClick = (e) => {
    e.preventDefault()
    if(cellContent) return
    const blinkType = isShip ? 'blink-red' : 'blink-blue'
    setCellClassName(cellClassName + ' ' + blinkType)
    setCellContent(isShip ? '╳' : '●')
  }

  return (
    <td className = {cellClassName} onClick = {onCellClick}>
      {cellContent}
    </td>
  )
}

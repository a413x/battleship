import React, { useState } from 'react'
import '../styles/Cell.css'

export const Cell = ({ isEmpty }) => {
  const [ cellClassName, setCellClassName ] = useState('cell')
  const [ cellContent, setCellContent ] = useState('')

  const onCellClick = (e) => {
    e.preventDefault()
    if(cellContent) return
    const blinkType = isEmpty ? 'blink-blue' : 'blink-red'
    setCellClassName(cellClassName + ' ' + blinkType)
    setCellContent('●')
  }

  return (
    <td className = {cellClassName} onClick = {onCellClick}>
      {cellContent}
    </td>
  )
}

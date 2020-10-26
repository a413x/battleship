import React, { useEffect } from 'react'
import interact from 'interactjs'

export const ShipDropzone = ({ children }) => {
  useEffect(() => {
    interact('.dropzone').dropzone({
      accept: '.draggable',
      overlap: .9,
    })
    const dropzone = document.querySelector('.dropzone')
    const playerField = document.querySelector('.player-table')
    const shipPicker = document.querySelector('.ship-picker')
    dropzone.style.top = playerField.offsetTop - shipPicker.offsetTop + 'px'
    dropzone.style.width = playerField.offsetWidth + 'px'
    dropzone.style.height = playerField.offsetHeight + 'px'
  },[])

  return (
    <div className = 'dropzone'>
      {children}
    </div>
  )
}

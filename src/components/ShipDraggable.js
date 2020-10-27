import React, { useEffect, useCallback } from 'react'
import interact from 'interactjs'

import '../styles/Draggable.css'

const getIndices = (draggable, dropzone, size, rotate) => {
  const {
    top: draggableTop,
    left: draggableLeft
  } = draggable.getBoundingClientRect()
  const {
    top: dropzoneTop,
    left: dropzoneLeft,
    width: dropzoneW,
    height: dropzoneH
  } = dropzone.getBoundingClientRect()
  let newLeft = Math.round(
    (draggableLeft - dropzoneLeft)/dropzoneW*10
  )
  let newTop = Math.round(
    (draggableTop - dropzoneTop)/dropzoneH*10
  )
  const indices = []
  for (let i = 0; i < size; i++) {
    indices.push(
      rotate ? {
        x: newTop + i,
        y: newLeft
      } : {
        x: newTop,
        y: newLeft + i
      }
    )
  }
  return indices
}

export const indicesToPosition = (indices) => {
  const {
    width: cellW,
    height: cellH
  } = document.querySelector('td').getBoundingClientRect()
  const dropzone = document.querySelector('.dropzone')
  //+1 px table spacing
  const top = indices[0].x * (cellH + 1) + dropzone.offsetTop
  const left = indices[0].y * (cellW + 1)
  return {top, left}
}

export const ShipDraggable = ({
  id,
  position,
  rotate,
  dropped,
  valid,
  onShipDrop,
  onShipDragStart,
  onShipRotate,
  updateShip
}) => {
  const size = +id[0]

  const updateSelf = useCallback(
    (position, rotate, dropped, valid) => {
      updateShip(id, position, rotate, dropped, valid)
    }, [updateShip, id]
  )

  const resetShip = useCallback(
    (draggable) => {
      updateSelf({x: 0, y: 0}, 0, false, true)
    }, [updateSelf]
  )

  useEffect(() => {
    interact('#draggable' + id).draggable({
      listeners:{
        start(e){
          updateSelf(position, rotate, dropped, true)
          if(!dropped) return
          const draggable = e.target
          const indices = JSON.parse(draggable.dataset.indices)
          onShipDragStart(indices)
        },
        move(e){
          updateSelf(
            {x: position.x + e.dx, y: position.y + e.dy}, rotate, dropped, valid
          )
        },
        end(e){
          const dropzone = e.relatedTarget
          const draggable = e.target
          if(!dropzone){
            resetShip(draggable)
            return
          }
          const indices = getIndices(draggable, dropzone, size, rotate)
          draggable.dataset.indices = JSON.stringify(indices)
          const {top, left} = indicesToPosition(indices)
          const fits = onShipDrop(indices)
          updateSelf({x: left, y: top}, rotate, true, fits)
        }
      }
    })
  },[
    onShipDragStart,
    onShipDrop,
    id,
    position,
    rotate,
    dropped,
    valid,
    size,
    updateSelf,
    resetShip
  ])

  const onRotate = () => {
    const draggable = document.querySelector('#draggable' + id)
    const indices = JSON.parse(draggable.dataset.indices)
    const newIndices = indices.map((ind, i) => {
      const direction = rotate > 0 ? -1 : 1
      return {x: ind.x + direction*i, y: ind.y - direction*i}
    })
    const fits = onShipRotate(indices, newIndices)
    const outOfBounds = (indices[0].x > 10 - size) || (indices[0].y > 10 - size)
    let r = rotate > 0 ? 0 : 90
    if(outOfBounds) r = rotate
    updateSelf({x: position.x, y: position.y}, r, dropped, fits)
    if(fits){
      draggable.dataset.indices = JSON.stringify(newIndices)
    }
  }

  const onDelete = () => {
    const draggable = document.querySelector('#draggable' + id)
    onShipDragStart(JSON.parse(draggable.dataset.indices))
    resetShip(draggable)
  }

  let offsetLeft = 0
  let offsetTop = 0

  if(!dropped){
    offsetLeft = 2
    offsetTop = 2
    if(size === 4) {
      offsetLeft = 88
    }
    if(size === 3){
      offsetLeft = 120
      offsetTop += 40
    }
    if(size === 2){
      offsetTop += 42
    }
  }

  const style = {
    transform: 'rotate(' + rotate + 'deg)',
    top: position.y + offsetTop + 'px',
    left: position.x + offsetLeft + 'px'
  }

  const renderedCells = []
  for(let i = 0; i < size; i++){
    renderedCells.push(<td key={'draggable-cell' + i + size}></td>)
  }

  return (
    <div
      id = {'draggable' + id}
      className = {'draggable ' + (!valid && 'error')}
      style = {style}
    >
      {(dropped) &&
        <div>
          {size > 1 &&
            <button
              onClick = {onRotate}
              className = 'rotate-btn'>
              ↻
            </button>
          }
          <button
            onClick = {onDelete}
            className = 'delete-btn'>
            X
          </button>
        </div>
      }
      <table>
        <tbody>
          <tr>
            {renderedCells}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

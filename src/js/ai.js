import { shotHandler, pointOutOfBounds } from './functions'
import { EMPTY_CELL, SHIP_CELL } from './constants'
import { getRandomInt } from './utils'

let aiHittedCells = null
let possiblePositions = null

export function aiTurn(cells, setter){
  let shot
  if(aiHittedCells) {
    shot = sightingAiShot(cells)
  }else {
    shot = randomAiShot(cells)
  }
  const killed = shotHandler(shot.x, shot.y, cells, setter)
  if(killed){
    aiHittedCells = null
    possiblePositions = null
  }
  return killed
}

function randomAiShot(cells){
  let availableCells = []

  for(let i = 0; i < cells.length; i++){
    for(let j = 0; j < cells[i].length; j++){
      if(cells[i][j] === EMPTY_CELL || cells[i][j] === SHIP_CELL){
        availableCells.push({x: i, y: j})
      }
    }
  }
  if(availableCells.length === 0) return

  const randomShot = availableCells[getRandomInt(0, availableCells.length)]

  if(cells[randomShot.x][randomShot.y] === SHIP_CELL){
    aiHittedCells = {x: randomShot.x, y: randomShot.y}
  }

  return randomShot
}

function sightingAiShot(cells){
  const x = aiHittedCells.x;
  const y = aiHittedCells.y;
  if(!possiblePositions){
    possiblePositions = [
      {x: x-1, y: y},
      {x: x+1, y: y},
      {x: x, y: y-1},
      {x: x, y: y+1},
    ]
    possiblePositions = possiblePositions.filter((pos) => {
      if(pointOutOfBounds(pos.x, pos.y)) return false
      const val = cells[pos.x][pos.y]
      if(val === EMPTY_CELL || val === SHIP_CELL) return true
      else return false
    })
  }

  const index = getRandomInt(0,possiblePositions.length)

  const sightingShot = possiblePositions[index]

  possiblePositions.splice(index,1)

  if(cells[sightingShot.x][sightingShot.y] === SHIP_CELL){
    aiHittedCells = {x: sightingShot.x, y: sightingShot.y}
    possiblePositions = null
  }

  return sightingShot
}

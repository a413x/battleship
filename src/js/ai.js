import { shotHandler, pointOutOfBounds } from './functions'
import { EMPTY_CELL, SHIP_CELL } from './constants'
import { getRandomInt } from './utils'

let hittedCells = []

export function aiTurn(cells, setter){
  let shot
  if(hittedCells.length) {
    shot = sightingAiShot(cells)
  }else {
    shot = randomAiShot(cells)
  }
  const killed = shotHandler(shot.x, shot.y, cells, setter)
  if(killed){
    hittedCells = []
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
    hittedCells.push({x: randomShot.x, y: randomShot.y})
  }

  return randomShot
}

function sightingAiShot(cells){
  const possiblePositions = calculatePossiblePositions(cells)

  const index = getRandomInt(0,possiblePositions.length)

  const sightingShot = possiblePositions[index]

  if(cells[sightingShot.x][sightingShot.y] === SHIP_CELL){
    hittedCells.push({x: sightingShot.x, y: sightingShot.y})
  }

  return sightingShot
}

function calculatePossiblePositions(cells){
  let possiblePositions = []
  hittedCells = hittedCells.sort((a,b) => {
    if(a.x < b.x || a.y < b.y) return -1
    else return 1
  })
  if(hittedCells.length === 1){
    const {x, y} = hittedCells[0]
    possiblePositions = [
      {x: x-1, y: y},
      {x: x+1, y: y},
      {x: x, y: y-1},
      {x: x, y: y+1},
    ]
  }else{
    const {x: x1, y: y1} = hittedCells[0]
    const {x: x2, y: y2} = hittedCells[hittedCells.length-1]
    const direction = x1 !== x2
    if(direction){
      possiblePositions = [
        {x: x1-1, y: y1},
        {x: x2+1, y: y2},
      ]
    }else{
      possiblePositions = [
        {x: x1, y: y1-1},
        {x: x2, y: y2+1},
      ]
    }
  }
  possiblePositions = possiblePositions.filter((pos) => {
    if(pointOutOfBounds(pos.x, pos.y)) return false
    const val = cells[pos.x][pos.y]
    if(val === EMPTY_CELL || val === SHIP_CELL) return true
    else return false
  })

  return possiblePositions
}

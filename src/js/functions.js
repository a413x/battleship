import { getRandomInt } from './utils'
import { EMPTY_CELL, SHIP_CELL, HITTED, MISSED } from './constants'

const cellsCount = 10

export function shotHandler(x, y, arr, setter){
  const value = arr[x][y]
  if(value === EMPTY_CELL){
    setter(updateCellsArray(x, y, MISSED, arr))
  }else if(value === SHIP_CELL){
    const updatedArr = updateCellsArray(x, y, HITTED, arr);
    setter(updatedArr)
    if(noShipsAround(x, y, updatedArr)){
      setter(shipKilled(x, y, updatedArr))
      return true
    }
  }
  return false
}

export function createRandomShips(cells){
  const cellsCopy = createCopy(cells)
  createRandomShip(4, cellsCopy)
  createShipsByAmount(2, 3, cellsCopy)
  createShipsByAmount(3, 2, cellsCopy)
  createShipsByAmount(4, 1, cellsCopy)
  return cellsCopy
}

function noShipsAround(x, y, cells){
  for(let i = x-1; i <= x+1; i++){
    for(let j = y-1; j <= y+1; j++){
      if(pointOutOfBounds(i, j) || (i === x && j === y)) continue
      if(cells[i][j] === SHIP_CELL) return false
    }
  }
  return true
}

function shipKilled(x, y, cells){
  //fill all cells around killed ship
  const cellsCopy = createCopy(cells)
  setMissed(x, y)
  for(let i = 0; i < cells.length; i++){
    for(let j = 0; j < cells[i].length; j++){
      if(cells[i][j] === HITTED) cellsCopy[i][j] = HITTED
    }
  }
  return cellsCopy

  function setMissed(x, y){
    for(let i = x-1; i <= x+1; i++){
      for(let j = y-1; j <= y+1; j++){
        if(pointOutOfBounds(i, j)) continue
        if(cellsCopy[i][j] === HITTED) {
          cellsCopy[i][j] = MISSED
          setMissed(i, j)
        }
        cellsCopy[i][j] = MISSED
      }
    }
  }
}

function updateCellsArray(x, y, val, cells){
  const cellsCopy = createCopy(cells)
  cellsCopy[x][y] = val
  return cellsCopy
}

function createShipsByAmount(amount, size, cells){
  for(let i = 0; i < amount; i++){
    createRandomShip(size, cells)
  }
}

function createRandomShip(size, cells){
  let position = getRandomShipPosition(size)
  while(!shipFits(position, cells)){
    position = getRandomShipPosition(size)
  }
  for(let i = 0; i < position.length; i++){
    cells[position[i].x][position[i].y] = SHIP_CELL
  }
}

function getRandomShipPosition(shipSize){
  let shipPosition = [] //returned ship position array
  const placement = Math.random() < 0.5 //vertical or horizontal
  if(placement){
    let { x, y } = getRandomStartPoint(cellsCount, cellsCount - shipSize)
    for(let i = 0; i < shipSize; i++){
      shipPosition.push({ x: x, y: y+i })
    }
  }else{
    let { x, y } = getRandomStartPoint(cellsCount - shipSize, cellsCount)
    for(let i = 0; i < shipSize; i++){
      shipPosition.push({ x: x+i, y: y })
    }
  }
  return shipPosition
}

function shipFits(position, cells){
  for(let i = 0; i < position.length; i++){
    if( !noShipsAround(position[i].x, position[i].y, cells) ) return false
  }
  return true
}

export function pointOutOfBounds(x, y){
  return x < 0 || y < 0 || x > cellsCount-1 || y > cellsCount - 1
}

function createCopy(arr){
  let newArr = []
  newArr = arr.map((el) => el.slice())
  return newArr
}

function getRandomStartPoint(xMax, yMax){
  const x = getRandomInt(0, xMax)
  const y = getRandomInt(0, yMax)
  return { x: x, y: y }
}

import { getRandomInt } from './utils/math'
import { SHIP_CELL } from './constants'

const cellsCount = 10

export function createRandomShips(cells){
  const cellsCopy = [...cells]
  createRandomShip(4, cellsCopy)
  createShipsByAmount(2, 3, cellsCopy)
  createShipsByAmount(3, 2, cellsCopy)
  createShipsByAmount(4, 1, cellsCopy)
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

function noShipsAround(x, y, cells){
  for(let i = x-1; i <= x+1; i++){
    for(let j = y-1; j <= y+1; j++){
      if(i < 0 || j < 0 || i > cellsCount-1 || j > cellsCount - 1) continue
      if(cells[i][j]) return false
    }
  }
  return true
}

function getRandomStartPoint(xMax, yMax){
  const x = getRandomInt(0, xMax)
  const y = getRandomInt(0, yMax)
  return { x: x, y: y }
}

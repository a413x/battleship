import { getRandomInt } from './utils'
import { EMPTY_CELL, SHIP_CELL, HITTED, MISSED } from './constants'

const cellsCount = 10

export function shotHandler(x, y, arr, setter){
  const value = arr[x][y]
  let shotInfo = {}
  if(value === EMPTY_CELL){
    shotInfo = {
      arr: updateCellsArray(x, y, MISSED, arr),
      result: 'missed'
    }
  }else if(value === SHIP_CELL){
    const updatedArr = updateCellsArray(x, y, HITTED, arr)
    const hittedInfo = shipKilledOrHitted(x, y, updatedArr)
    if(hittedInfo.isLastHittedCell){
      shotInfo = {
        arr: hittedInfo.cells,
        result: 'killed'
      }
    }
    else{
      shotInfo = {
        arr: updatedArr,
        result: 'hitted'
      }
    }
  }else {
    shotInfo = {
      arr: arr,
      result: ''
    }
  }
  setter(shotInfo.arr)
  if(endGame(shotInfo.arr)) shotInfo.result = 'win'
  return shotInfo
}

function endGame(cells){
  let numberOfHittedCells = 0
  for(let i = 0; i < cells.length; i++){
    for(let j = 0; j < cells[i].length; j++){
      if(cells[i][j] === HITTED) numberOfHittedCells++
    }
  }
  return numberOfHittedCells === 20
}

export function createRandomShips(cells){
  const cellsCopy = createCopy(cells)
  const positions = {}
  positions['4'] = [createRandomShip(4, cellsCopy)]
  positions['3'] = createShipsByAmount(2, 3, cellsCopy)
  positions['2'] = createShipsByAmount(3, 2, cellsCopy)
  positions['1'] = createShipsByAmount(4, 1, cellsCopy)
  return {
    cells: cellsCopy,
    positions
  }
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

function shipKilledOrHitted(x, y, cells){
  const cellsCopy = createCopy(cells)
  let isLastHittedCell = true
  fillMissed(x, y)
  for(let i = 0; i < cells.length; i++){
    for(let j = 0; j < cells[i].length; j++){
      if(cells[i][j] === HITTED) cellsCopy[i][j] = HITTED
    }
  }
  return { cells: cellsCopy, isLastHittedCell }

  //fill all cells around killed ship and check if it's a last ship cell
  function fillMissed(x, y){
    if(!noShipsAround(x, y,cells)) isLastHittedCell = false
    for(let i = x-1; i <= x+1; i++){
      for(let j = y-1; j <= y+1; j++){
        if(pointOutOfBounds(i, j)) continue
        if(cellsCopy[i][j] === HITTED) {
          cellsCopy[i][j] = MISSED
          fillMissed(i, j)
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
  let posArr = []
  for(let i = 0; i < amount; i++){
    const position = createRandomShip(size, cells)
    posArr.push(position)
  }
  return posArr
}

function createRandomShip(size, cells){
  let position = getRandomShipPosition(size)
  while(!shipFits(position, cells)){
    position = getRandomShipPosition(size)
  }
  for(let i = 0; i < position.length; i++){
    cells[position[i].x][position[i].y] = SHIP_CELL
  }
  return position
}

export function createShip(positions, cells){
  const cellsCopy = createCopy(cells)
  if(!shipFits(positions,cells)) return null
  for(let i = 0; i < positions.length; i++){
    cellsCopy[positions[i].x][positions[i].y] = SHIP_CELL
  }
  return cellsCopy
}

export function clearPositions(positions, cells){
  const cellsCopy = createCopy(cells)
  for(let i = 0; i < positions.length; i++){
    cellsCopy[positions[i].x][positions[i].y] = EMPTY_CELL
  }
  return cellsCopy
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
    const {x ,y} = position[i]
    if(x >= cellsCount || y >= cellsCount) return false
    if( !noShipsAround(x, y, cells) || cells[x][y] === SHIP_CELL ) return false
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

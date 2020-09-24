export const create2DArray = ( n, m, val ) => {
  return new Array(10).fill(null).map(() => new Array(10).fill(val));
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function range(start, count){
  const type = typeof start
  let arr = []
  const currentChar = start + ''
  for(let i = 0; i < count; i++){
    if(type === 'number'){
      arr[i] = start + i
    }
    else if(type === 'string'){
      arr[i] = String.fromCharCode(currentChar.charCodeAt(0) + i)
    }
  }
  return arr
}

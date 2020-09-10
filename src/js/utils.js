export const create2DArray = ( n, m, val ) => {
  return new Array(10).fill(null).map(() => new Array(10).fill(val));
}

export const id = () => '_' + Math.random().toString(36).substr(2, 9);

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

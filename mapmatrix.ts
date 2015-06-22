/// <reference path="matrix.ts"/>
function mapmatrix(m:number[][], fn?) {
  return matrix(m.length, m[0].length, (i, j)=>fn(m[i][j]))
}
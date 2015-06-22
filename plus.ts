/// <reference path="matrix.ts"/>

function plus(a:number[][], b:number[][]) : number[][] {
  console.assert(a.length == b.length)
  console.assert(a[0].length == b[0].length)
  return matrix(a.length, a[0].length, (i,j) => a[i][j] + b[i][j])
}
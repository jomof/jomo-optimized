/// <reference path="range.ts"/>
/// <reference path="matrix.ts"/>

// TypeScript matrix dot product
// by Jomo Fisher
function dot(a:number[][], b:number[][]) : number[][] {
  console.assert(a[0].length == b.length, "%s wrong dimension for %s", a, b)
  return matrix(a.length, b[0].length, 
    (i, j) => range(a[0].length, k => a[i][k] * b[k][j])
      .reduce((p, c)=> p + c, 0))
}
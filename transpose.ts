/// <reference path="matrix.ts"/>
function transpose(a:number[][]) : number[][] {
  return matrix(a[0].length, a.length, (i,j) => a[j][i])  
}
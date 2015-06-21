/// <reference path="matrix.ts"/>
function vectort(width, fn) : number[][] {
    return matrix(1, width, (i,j) => fn(j))
}

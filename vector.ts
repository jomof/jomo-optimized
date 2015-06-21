/// <reference path="matrix.ts"/>
function vector(height, fn) : number[][] {
    return matrix(height, 1, (i,j) => fn(i))
}
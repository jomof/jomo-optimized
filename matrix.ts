/// <reference path="range.ts"/>
function matrix(height, width, fn) : number[][] {
  return range(height,
    i=>range(width,
      j=> fn(i, j)))
}
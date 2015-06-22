/// <reference path="transpose.ts"/>

function partition(items, size) {
  return range(Math.floor(items.length/size) + 1, i=>
      items.slice(i*size, (i+1)*size)
  )
}
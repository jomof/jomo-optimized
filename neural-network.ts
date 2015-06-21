/// <reference path="range.ts"/>
/// <reference path="matrix.ts"/>
/// <reference path="vector.ts"/>
/// <reference path="vectort.ts"/>
/// <reference path="dot.ts"/>
/// <reference path="plus.ts"/>
/// <reference path="sigmoid.ts"/>
    
class network {
  n : number;
  s : number[];
  b : number[][][];
  w : number[][][];  
}

function random(sizes:number[]) {
  var result = new network()
  result.s = sizes
  result.n = sizes.length
  result.b = range(sizes.length - 1, i=>vector(sizes[i], Math.random))
  result.w = range(sizes.length - 1, i=>matrix(sizes[i + 1], sizes[i], Math.random))
  return result
}

function simple() {
  var result = new network()
  var sizes = [2, 1]
  result.s = sizes
  result.n = sizes.length
  result.b = range(sizes.length - 1, i=>vector(sizes[i], _=>0.5))
  result.w = range(sizes.length - 1, i=>matrix(sizes[i + 1], sizes[i], _=>0.1))
  return result
}

function feedforward(net : network, a: number[][]) {
  vector(net.n - 1, i=>
    a = plus(dot(net.w[i], a), net.b[i])
         .map(sub=>sub.map(sigmoid)))
  return a;
}

//console.log(matrix(4, 3, (i, j) => i))
var net = random([6, 5, 4, 3, 2, 1])
//var net = simple()  
//var a = vector(net.s[0], _=> 1)
//console.log(plus(dot(net.w[0], a), net.b[0]))
console.log(feedforward(net, vector(net.s[0], _=> 1)))

//console.log(net.b)
//console.log(net.b[0])
//var a = [[1, 2, 3], [4, 5, 6]]
//var b = [[7, 8], [9, 10], [11, 12]]
//console.log(plus(dot([a], a), [0.5, 0.5]))
//console.log(dot(a, b))


//console.log(feedforward(net, vector(2, _=>1)))
//var a = range(net.s[0], Math.random)
//console.log(a)
//console.log("-----")
//console.log(feedforward(net, a))
//console.log(net.b)

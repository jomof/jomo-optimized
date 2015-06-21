function range(high, fn) {
	return Array.apply(0, Array(high)).map((_,i)=>fn(i))
}

function matrix(height, width, fn) : number[][] {
  return range(height,
    i=>range(width,
      j=> fn(i, j)))
}

function vector(height, fn) : number[][] {
    return matrix(height, 1, (i,j) => fn(i))
}

function vectort(width, fn) : number[][] {
    return matrix(1, width, (i,j) => fn(j))
}


function sigmoid(z) {
    return 1.0/(1.0+Math.exp(-z))
}
    
class Network {
  n : number;
  s : number[];
  b : number[][][];
  w : number[][][];  
}

function network(sizes:number[]) {
  var result = new Network()
  result.s = sizes
  result.n = sizes.length
  result.b = range(sizes.length - 1, i=>vector(sizes[i], Math.random))
  result.w = range(sizes.length - 1, i=>matrix(sizes[i + 1], sizes[i], Math.random))
  return result
}

function simple() {
  var result = new Network()
  var sizes = [2, 1]
  result.s = sizes
  result.n = sizes.length
  result.b = range(sizes.length - 1, i=>vector(sizes[i], _=>0.5))
  result.w = range(sizes.length - 1, i=>matrix(sizes[i + 1], sizes[i], _=>0.1))
  return result
}

function dot(a:number[][], b:number[][]) : number[][] {
  console.assert(a[0].length == b.length, "%s wrong dimension for %s", a, b)
  return matrix(a.length, b[0].length, (i, j)=> 
    range(a[0].length, k => a[i][k] * b[k][j])
      .reduce((p, c)=> p + c, 0))
}


function plus(a:number[][], b:number[][]) {
  return matrix(a.length, a[0].length,
   (i,j) => a[i][j] + b[i][j])
}

function feedforward(net : Network, a: number[][]) {
  vector(net.n - 1, i=>
    a = plus(dot(net.w[i], a), net.b[i])
         .map(sub=>sub.map(sigmoid))
          )
  return a;
}
//

//console.log(matrix(4, 3, (i, j) => i))
var net = network([6, 5, 4, 3, 2, 1])
//var net = simple()  
var a = vector(net.s[0], _=> 1)
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

/// <reference path="range.ts"/>
/// <reference path="matrix.ts"/>
/// <reference path="vector.ts"/>
/// <reference path="vectort.ts"/>
/// <reference path="dot.ts"/>
/// <reference path="plus.ts"/>
/// <reference path="minus.ts"/>
/// <reference path="sigmoid.ts"/>
/// <reference path="sigmoidprime.ts"/>
/// <reference path="transpose.ts"/>
/// <reference path="partition.ts"/>
/// <reference path="hadamardproduct.ts"/>
/// <reference path="shuffle.ts"/>
/// <reference path="mapmatrix.ts"/>
/// <reference path="zeromatrix.ts"/>
/// <reference path="normalize.ts"/>
  
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
  result.b = range(sizes.length - 1, i=>vector(sizes[i + 1], Math.random))
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

function assertmatrix(m : number[][]) {
//  console.assert(m !== null)
//  console.assert(m !== undefined)
//  var height = m.length
//  var width = m[0].length
//  m.forEach(row => console.assert(row.length == width,
//    "Saw width %s on row %s. Expected %s", row.length, row, width))
//  mapmatrix(m, v=>console.assert(typeof v == "number", "Type was %s", typeof v))
//  return m
}

function assertvector(v : number[][]) {
//  assertmatrix(v)
//  v.forEach(row => console.assert(row.length == 1))
//  return v
}

function feedforwardtrace(
   net : network,
   x : number[][]) : [number[][][], number[][][]] {
  assertvector(x)

  var activation = x
  var activations = [x] // list to store all the activations, layer by layer
  var zs = [] // list to store all the z vectors, layer by layer
  vector(net.n - 1, i => {
    var b = net.b[i]
    var w = net.w[i]
    var z = plus(dot(w, activation), b)
    zs.push(z)
    activation = mapmatrix(z, sigmoid)
    activations.push(activation)
  })
  return [activations, zs]
 }

function costderivative(
  activation : number[][],
  y : number[][]) : number[][] {
    return minus(activation, y)
}

function backprop(
    net : network,
    x : number[][],
    y : number[][]) : [number[][][], number[][][]] {
  assertvector(x)
  assertvector(y)
  var nabla_b = net.b.map(zeromatrix)
  var nabla_w = net.w.map(zeromatrix)

  var [activations, zs] = feedforwardtrace(net, x)
  var delta = hadamardproduct(
    costderivative(activations[activations.length - 1], y),
    mapmatrix(zs[zs.length - 1], sigmoidprime))
  
  nabla_b[nabla_b.length - 1] = delta  
  nabla_w[nabla_w.length - 1] = dot(delta, transpose(activations[activations.length - 2]))
  
  range(net.n - 2, l=>{
    l += 2
    var z = zs[zs.length - l]
    var spv = mapmatrix(z, sigmoidprime)
    delta = hadamardproduct(
      dot(transpose(net.w[net.w.length - l + 1]), delta),
      spv)
    nabla_b[nabla_b.length - l] = delta
    nabla_w[nabla_b.length - l] = dot(delta, transpose(activations[activations.length - l - 1]))
  })
  return [nabla_b, nabla_w]
}

function zip(a:any[], b:any[], fn?) {
  console.assert(a.length == b.length)
  if (fn == undefined) {
    fn = (a,b)=>[a,b]
  }
  return a.map((_,i)=>fn(a[i], b[i]))
}

function updatebatch(
  net : network,
  batch : [number[][], number[][]][], 
  eta) {    
    var nabla_b = net.b.map(zeromatrix)
    var nabla_w = net.w.map(zeromatrix)
    var alpha = eta/batch.length
    var scale = m => mapmatrix(m, i => (eta/batch.length) * i)
    var update = (m,nm) => minus(m, scale(nm))
    batch.forEach(data=> {
      var [x, y] = data
      assertvector(x)
      assertvector(y)
      var [delta_nabla_b, delta_nabla_w] = backprop(net, x, y)
      nabla_b = zip(nabla_b, delta_nabla_b, plus)
      nabla_w = zip(nabla_w, delta_nabla_w, plus)
      
      net.w = zip(net.w, nabla_w, update)
      net.b = zip(net.b, nabla_b, update)
    })
}

function sgd(
  net : network, 
  trainingData: [number[], number[]][], 
  epochs : number, 
  miniBatchSize : number, 
  eta, testData) {
  //  if test_data: n_test = len(test_data)
  var n = trainingData.length
  range(epochs, epoch => {
      shuffle(trainingData)
      var miniBatches = partition(trainingData, miniBatchSize)
      miniBatches.forEach(batch => updatebatch(net, batch, eta))
  })
//            if test_data:
//                print "Epoch {0}: {1} / {2}".format(
//                    j, self.evaluate(test_data), n_test)
//            else:
//                print "Epoch {0} complete".format(j)
}
//console.log(matrix(4, 3, (i, j) => i))
var net = random([2, 1])
//console.log(backprop(net, vector(net.s[0], _=> 1), vector(net.s[net.s.length - 1], _=> 1))[0])
//console.log(net.b)
//console.log(net.w)
//var net = simple()  
//var a = vector(net.s[0], _=> 1)
//console.log(plus(dot(net.w[0], a), net.b[0]))
//console.log(feedforward(net,
//   vector(net.s[0], _=> 1)
//   ))

//console.log(partition([1, 2, 3, 4, 5, 6, 7, 8, 9], 2))

// Training data: square feet, number of bedrooms, price
var housing = [[2104,3,399900],[1600,3,329900],[2400,3,369000],[1416,2,232000],[3000,4,539900],[1985,4,299900],[1534,3,314900],[1427,3,198999],[1380,3,212000],[1494,3,242500],[1940,4,239999],[2000,3,347000],[1890,3,329999],[4478,5,699900],[1268,3,259900],[2300,4,449900],[1320,2,299900],[1236,3,199900],[2609,4,499998],[3031,4,599000],[1767,3,252900],[1888,2,255000],[1604,3,242900],[1962,4,259900],[3890,3,573900],[1100,3,249900],[1458,3,464500],[2526,3,469000],[2200,3,475000],[2637,3,299900],[1839,2,349900],[1000,1,169900],[2040,4,314900],[3137,3,579900],[1811,4,285900],[1437,3,249900],[1239,3,229900],[2132,4,345000],[4215,4,549000],[2162,4,287000],[1664,2,368500],[2238,3,329900],[2567,4,314000],[1200,3,299000],[0852,2,179900],[1852,4,299900],[1203,3,239500]]


var [nhouse, _, _] = normalize(housing)
var inputs : number[][][]= nhouse.map(a=>[[a[0]], [a[1]]])
var outputs = housing.map(a=>[a[2] > 400000 ? [1] : [0]])

var training : [number[][], number[][]][] = zip(inputs, outputs)



console.log(net.w)
console.log(net.b)
range(100000, _=>
  updatebatch(net, training, 1))
console.log(net.w)
console.log(net.b)

var right = 0, wrong = 0
range(housing.length, i=>{
  var f = Math.round(feedforward(net, inputs[i])[0][0])
  if (f == outputs[i][0][0]) {
    ++right 
  } else {
    ++wrong
  }
  
  console.log("%s=>%s", f, outputs[i][0][0])
})

console.log("right %s, wrong %s", right, wrong)

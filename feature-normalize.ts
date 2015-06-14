// TypeScript feature normalize. Feature data is in columns.
// Normalization method is to subtract mean and then divide that by its standard deviation
function featureNormalize(data : number[][]) {
	var zeros = Array.apply(0, Array(data[0].length)).map(_ => 0)	
	var reduceFeatures = (data, fn) => data.reduce((p, c) => p.map(
		(_,i) => fn(p[i], c[i])), zeros)
		.map(s => s / data.length)
	var mapFeatures = (data, fn) => data.map(row => row.map(fn))
	
	var mean = reduceFeatures(data, (p, c) => p + c)
	var zeroed = mapFeatures(data, (c, i) => c - mean[i])
	var stddev = reduceFeatures(zeroed, (p, c) => p + c * c).map(Math.sqrt)
	return mapFeatures(zeroed, (c, i) => c / stddev[i])
}

var simple = [[2],[4],[4],[4],[5],[5],[7],[9]]

// Square feet, number of bedrooms, price
var housing = [[2104,3,399900],[1600,3,329900],[2400,3,369000],[1416,2,232000],[3000,4,539900],[1985,4,299900],[1534,3,314900],[1427,3,198999],[1380,3,212000],[1494,3,242500],[1940,4,239999],[2000,3,347000],[1890,3,329999],[4478,5,699900],[1268,3,259900],[2300,4,449900],[1320,2,299900],[1236,3,199900],[2609,4,499998],[3031,4,599000],[1767,3,252900],[1888,2,255000],[1604,3,242900],[1962,4,259900],[3890,3,573900],[1100,3,249900],[1458,3,464500],[2526,3,469000],[2200,3,475000],[2637,3,299900],[1839,2,349900],[1000,1,169900],[2040,4,314900],[3137,3,579900],[1811,4,285900],[1437,3,249900],[1239,3,229900],[2132,4,345000],[4215,4,549000],[2162,4,287000],[1664,2,368500],[2238,3,329900],[2567,4,314000],[1200,3,299000],[0852,2,179900],[1852,4,299900],[1203,3,239500]]


console.log(featureNormalize(simple))

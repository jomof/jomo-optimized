/// <reference path="range.ts"/>
function normalize(data : number[][]) {
	var zeros = range(data[0].length, _ => 0)	
	var reduce = (data, fn) => data.reduce((p, c) => p.map(
		(_,i) => fn(p[i], c[i])), zeros)
		.map(s => s / data.length)
	var map = (data, fn) => data.map(row => row.map(fn))
	
	var μ = reduce(data, (p, c) => p + c)
	var zeroed = map(data, (c, i) => c - μ[i])
	var σ = reduce(zeroed, (p, c) => p + c * c).map(Math.sqrt)
	return [map(zeroed, (c, i) => c == 0 ? 0 : c / σ[i]), μ, σ]
}

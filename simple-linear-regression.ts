// simple-linear-regression.ts (by Jomo Fisher)
function leastSquares(points) {	
	var mx = points.reduce((sum, p) => sum + p.x, 0) / points.length
	var my = points.reduce((sum, p) => sum + p.y, 0) / points.length

	var covariance = points.reduce(
		(sum, p) => sum + (p.x - mx) * (p.y - my), 0)
		
	var variance = points.reduce(
		(sum, p) => sum + Math.pow(p.x - mx, 2), 0)
		
	var m = covariance / variance;
	
	return {m : m, b : my- m * mx};
}

var points : {x:number, y:number}[] =
	[ { x: 1.47, y: 52.21 },
	  { x: 1.5, y: 53.12 },
	  { x: 1.52, y: 54.48 },
	  { x: 1.55, y: 55.84 },
	  { x: 1.57, y: 57.2 },
	  { x: 1.6, y: 58.57 },
	  { x: 1.63, y: 59.93 },
	  { x: 1.65, y: 61.29 },
	  { x: 1.68, y: 63.11 },
	  { x: 1.7, y: 64.47 },
	  { x: 1.73, y: 66.28 },
	  { x: 1.75, y: 68.1 },
	  { x: 1.78, y: 69.92 },
	  { x: 1.8, y: 72.19 },
	  { x: 1.83, y: 74.46 } ];

console.log(leastSquares(points))

function range(high, fn) {
	return Array.apply(0, Array(high)).map((_,i)=>fn(i))
}

function graycode(n) {
	return n ^ (n >> 1)
}

range(16, i=>console.log("%s => %s", i, graycode(i)))
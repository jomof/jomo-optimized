function range(high, fn) {
	return Array.apply(0, Array(high)).map((_,i)=>fn(i))
}
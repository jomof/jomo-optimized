// TypeScript calls function for each permutation done by Heap's algorithm
function permute(n, a, f) {
	if (--n == 0) return f(a)
	var swap = m => {
		var hold = a[m]
		a[m] = a[n]
		a[n] = hold;	
	}
	for(var i = 0; i <= n; ++i) {
		permute(n, a, f)
		swap(n % 2 * i)
	}
}

permute(4, ['a','b','c','d'], console.log)



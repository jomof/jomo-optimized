function grayRange(upto, fn) {
	for (var n=0; n< upto; ++n) {
		fn((n ^ 2) % upto)
	}
}

grayRange(16, n=>console.log(n))

function foo(x) {
	return 4 * x * x * x * x - x * x * x + 2 * x - 3;
}

function derivative(f, h) {
	return (x) => (f(x+h) - f(x-h)) / (2 * h)
}

function newton(f) {
	var epsilon = 0.00001
	var f1 = derivative(f, epsilon)
	var result = 0;
	for (var i = 1; i <= 100; i++) {
		var delta = f(result) / f1(result);
		if (Math.abs(delta) < epsilon) {
			return result;
		}
		result -= delta;
	}
	// Didn't converge
	return NaN;
}

console.log(newton(foo));
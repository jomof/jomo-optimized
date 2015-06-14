// y-combinator in TypeScript.
var y = f => (x => f(y => x(x)(y)))(x => f(y => x(x)(y))) 
var fact = y(fact => n => n == 0 ? 1 : n * fact(n - 1))
console.log(fact(5))

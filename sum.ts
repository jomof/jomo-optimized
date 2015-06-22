
function sum(a : number[], fn) {
	return a.reduce((p,c,i)=>p + fn(c, i), 0)
}

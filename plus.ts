
function plus(a:number[][], b:number[][]) {
  return matrix(a.length, a[0].length,
    (i,j) => a[i][j] + b[i][j])
}
/// <reference path="sigmoid.ts"/>

function sigmoidprime(z : number) : number {
  return sigmoid(z)*(1-sigmoid(z))
}

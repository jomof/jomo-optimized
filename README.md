# Jomo Optimized
Notes, ramblings and errata from the life of one engineer

![x0](http://latex.codecogs.com/gif.latex?\sum_{i=1}^{n}{X_i})
![x1](http://latex.codecogs.com/gif.latex?\begin{pmatrix}&space;a_{11}&space;&&space;\cdots&space;&&space;a_{1n}\\&space;\vdots&space;&&space;\ddots&space;&&space;\vdots\\&space;a_{m1}&space;&&space;\cdots&space;&&space;a_{mn}&space;\end{pmatrix})

#### 2015-6-8 Reading The Bayesian Bootstrap
[http://projecteuclid.org/download/pdf_1/euclid.aos/1176345338]

The main cool trick here is to generate a set of n numbers in [0, 1] that add up to 1.0. Here are the steps:

(1) Generate n-1 random numbers in [0,1]

(2) Sort those numbers ascending

(3) Prepend 0 and append 1 to those numbers and call this list S

(4) Create a new set N where the i-th element is S[i+1] - S[i]
```typescript
// Bayesian bootstrap distribution generator in TypeScript
var n = 100;
var S : number[] =
  Array.apply(0, Array(100))
    .map(Math.random)
    .sort();
S[0] = 0.0;
var N = S.map((_:any, i:number) => (i == n - 1 ? 1.0 : S[i+1]) - S[i]);
```
Set N consists of numbers in [0,1] that sum to 1.0. Intuitively, this is similar to creating a random CDF (cumulative distribution function).

Bayesian bootstrapping involves creating many sets N and applying them as weights to each element of the sample population under consideration. Interpretation is that N[i] is probability that X[i] is in the bootstrap.


#### 2015-6-3 Reading The Practical Implementation of Bayesian Model Selection
[http://www-stat.wharton.upenn.edu/~edgeorge/Research_papers/ims.pdf]


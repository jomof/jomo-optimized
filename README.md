# Jomo Optimized
Notes, ramblings and errata from the life of one engineer

#### 2015-6-14 Multivariable Linear Regression using Gradient Descent
Simple multivariable linear regression in type script.
- y is the desired output
- x is the input features (one feature type per column)
- μ are the means of features
- σ are the standard deviations of features
- Θ is the set of parameters to the model. This is what is trained.
- α is the update scale
- h is the training hypothesis
The return value of the linear() function is a function that can be called to execute the model against the trained parameters.

Intuitions:
- Training data with different units need to be normalized
- Set up a system of equations to minimize (a cost function)
- Can use gradient descent to minimize iteratively
- Multivariable linear regression is a generalization of least squares fit which is a generalization of interpolation

```typescript
// TypeScript multivariable linear regression using gradient descent
// by Jomo Fisher
function linear(y : number[], x : number[][], iterations : number) {
	var [xnorm, μ, σ] = normalize(x)
	x = xnorm.map(a=>[1].concat(a))

	var sum = f => y.reduce((s,_,i) => s + f(i), 0)
	var Θ = x[0].map(_ => 0)
	var h = i => Θ.reduce((p, c, j) => p += c * x[i][j], 0)
	var α = 0.01 / x.length
	
	for(var _ = 0; _<iterations; ++_) {
		Θ = Θ.map((Θj, j)=> 
			Θj - α * sum(i=>(h(i) - y[i]) * x[i][j]))	
	}

	return (...arr) => arr.reduce((p, c, j) => 
		p + Θ[j + 1] * (c - μ[j]) / σ[j], Θ[0])
}
```
#### 2015-6-14 Feature Normalization
Various forms of multivariable regression perform much better when features are normalized. One method of normalization is to subtract the mean from each feature datum and then divide the result by standard deviation. This gives a result that is mostly between -2 and 2 with allowance for outliers.

Intuitions:
- Units are cancelled so the final regression result is also unitless
- Subtracting mean balances positive and negative
- Dividing by standard deviation normalizes scale (and cancels units)

```typescript
// TypeScript feature normalize. Feature data is in columns.
// by Jomo Fisher
function normalize(data : number[][]) {
	var zeros = Array.apply(0, Array(data[0].length)).map(_ => 0)	
	var reduce = (data, fn) => data.reduce((p, c) => p.map(
		(_,i) => fn(p[i], c[i])), zeros)
		.map(s => s / data.length)
	var map = (data, fn) => data.map(row => row.map(fn))
	
	var μ = reduce(data, (p, c) => p + c)
	var zeroed = map(data, (c, i) => c - μ[i])
	var σ = reduce(zeroed, (p, c) => p + c * c).map(Math.sqrt)
	return [map(zeroed, (c, i) => c == 0 ? 0 : c / σ[i]), μ, σ]
}

```

#### 2015-6-13 Generate Permutations
Here's how to generate permutations of an array. The O(n!) nature is evident by the recursion inside a for-loop for decreasing n. There is one swap per iteration. The bit about n % 2 * i can be read as 'i when n is odd and 0 otherwise'.

```typescript
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
```

#### 2015-6-11 How to do Linear Interpolation (then Least Squares)
Given a line formed by [x1,y1] and [x2,y2] find the value y falling on that line for any given x.

![x0](http://goo.gl/bMrUdp)

```java
  // Java implementation of linear interpolation from two points
  double interpolate(double x, double x1, double y1, double x2, double y2) {
    return ((y2 - y1) * (x - x1)) / (x2 - x1) + y1;
  }
```
One way to generalize interpolation is through simple least squares regression. The following code for linear regression will degenerate to linear interpolation when there are only two points.

```typescript
// TypeScript implementation of least-squares fit (by Jomo Fisher)
function leastSquares(points) {	
  var sum = f => points.reduce((s,c) => s + f(c), 0)
  var n = points.length
  var mx = sum(p => p.x) / n
  var my = sum(p => p.y) / n
  var covariance = sum(p => (p.x - mx) * (p.y - my))	
  var variance = sum(p => (p.x - mx) * (p.x - mx))	
  var m = covariance / variance;
  return {m : m, b : my - m * mx};
}
``` 
This is a cool snippet because it also includes the algorithms for variance and covariance.


#### 2015-6-9 How to Throttle on Client to a Certain QPS
Uses a control loop to settle at certain sleep rate.

```java
  // Throttle QPS with Control Loop
  private static Long longPeriodMillis = null;
  private static long queries = 0;
  private static double allowedQps = 20.0;
  private static double delayMillis = 1000.0 / allowedQps; 
  
  @VisibleForTesting
  public static void throttle() {
 
    synchronized (global) {
      ++queries;
      if (longPeriodMillis == null) {
        longPeriodMillis = System.nanoTime();
        return;
      }
      
      double longPeriodQps = queries / ((System.nanoTime() - longPeriodMillis) / 1000000000.0);
      
      // This creates a feedback loop that will tune to the requested QPS
      if (longPeriodQps > allowedQps) {
        delayMillis *= 1.01;
      } else {
        delayMillis *= 0.99;
      }
     
      if (delayMillis > 1.0) {
        System.out.printf("SleptEntity:%s for qps %s\n", delayMillis, longPeriodQps);
         try {
          Thread.sleep((long) delayMillis);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      }
    }
  }
```

#### 2015-6-8 Learned how to embed formulas
Edit them here and get an html link: http://www.codecogs.com/latex/eqneditor.php

![x0](http://goo.gl/kePPTV)

![x1](http://goo.gl/abjSyw)

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
var seed = Array.apply(0, Array(100));
var S : number[] = seed
    .map(Math.random)
    .sort();
S[0] = 0.0;
S.push(1.0);
var N = seed.map((_:any, i:number) => S[i+1] - S[i]);
```
Set N consists of numbers in [0,1] that sum to 1.0. Intuitively, this is similar to creating a random CDF (cumulative distribution function).

Bayesian bootstrapping involves creating many sets N and applying them as weights to each element of the sample population under consideration. Interpretation is that N[i] is probability that X[i] is in the bootstrap.


#### 2015-6-3 Reading The Practical Implementation of Bayesian Model Selection
[http://www-stat.wharton.upenn.edu/~edgeorge/Research_papers/ims.pdf]


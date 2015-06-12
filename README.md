# Jomo Optimized
Notes, ramblings and errata from the life of one engineer

#### 2015-6-11 How to do Linear Interpolation
Given a line formed by [x1,y1] and [x2,y2] find the value y falling on that line for any given x.

![x0](http://goo.gl/bMrUdp)

```java
  // Java implementation of linear interpolation from two points
  static double interpolate(double x, double x1, double y1, double x2, double y2) {
    return ((y2 - y1) * (x - x1)) / (x2 - x1) + y1;
  }
```
One way to generalize interpolation is through simple least squares regression. The following code for linear regression will degenerate to linear interpolation when there are only two points.

```typescript
// simple-linear-regression.ts (by Jomo Fisher)
function leastSquares(points) {	
	var sum = points.reduce(
		(sum, p) => {
			return {x : sum.x + p.x, y: sum.y+p.y}
		}, {x : 0, y : 0})
		
	var mean = {x : sum.x / points.length, y : sum.y / points.length}

	var covariance = points.reduce(
		(sum, p) => sum + (p.x - mean.x) * (p.y - mean.y), 0)
		
	var variance = points.reduce(
		(sum, p) => sum + Math.pow(p.x - mean.x, 2), 0)
		
	var m = covariance / variance;
	
	return {m : m, b : mean.y - m * mean.x};
}
``` 
This is a cool snipped because it include the algorithm for variance and covariance.


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




const RESOLUTION = 32;
const PI = Math.PI;
const TAU = 2*PI;

/**
 * calc2DSpiral
 * r = a * e^(b*theta)
 * ln(r/a) = ln(e^(b*theta))
 * ln(r/a) = b*theta
 * 1/b * ln(r/a) = theta
 *
 * x(t) = r(t)*cos(t) = ae^(bt)*cos(t)
 * y(t) = r(t)*cos(t) = ae^(bt)*sin(t)
 *
 * The angle ɸ betewwn the tangent and ratial line at the point (r, theta) is constant
 * it can be expressed in differential geometric terms:
 *
 * arccos( innerproductspacebrackets( r(theta), rPrime(theta) ) / magnitude(r(theta))*magnitude(rPrime(theta)) ) = arctan(1/b) = phi
 *
 * The pitch is the complementary angle of Φ (tangent)
 * pitch = TAU/4 - Φ
 * For a golden spiral
 *
 * This is a different phi(the golden ratio): φ = (1 +/- sqrt(5))/2
 *
 * we can write
 *
 * r = a * e^(b*theta)
 * as
 * theta = 1/b * ln(r/a)
 * where a is the initial radius of the spiral
 * and b such that WHEN THETA IS A RIGHT ANGLE:
 *
 * e^(b*theta) = ɸ(golden ratio)
 * ln(e^(b*theta) = ln(ɸ)
 * b = ln(ɸ)/theta
 *
 * @param {object} params
 * @param {Array} params.thetas theta range to calculate
 * @param {number} params.resolution points to calculate per TAU resolution
 * @return {object} the points of the spiral
 */
function calc2DSpiral(params){
  params = params || {};
  params.thetas = Array.isArray(params.thetas)
    ? params.thetas
    : [0, 5*TAU];
  // console.log(params.thetas);
  for(let theta of params.thetas){
    if(typeof theta !== 'number'){
      throw new TypeError(`calc2DSpiral prefers numerical 2-element thetas array in params object, not ${theta}`);
    }
  }

  const a = (typeof params.a === 'number')
    ? params.a
    : 1;
  const b =  (typeof params.b === 'number')
    ? params.b
    : (typeof params.phiratio === 'number')
      ? Math.log(params.phiratio)/PI
      : Math.log(1)/PI;

  const r = (theta) => a * ( Math.E ** (b * theta) );
  const x = (theta) => r(theta) * Math.cos(theta);
  const y = (theta) => r(theta) * Math.sin(theta);

  let spiral = {
    ts: [],
    xys: [],
    phis: []
  };

  let dt = params.thetas[1] - params.thetas[0];
  let n = RESOLUTION * (dt / TAU);
  let ddt = dt/n;
  let tt = function*(n){
    for(let t = 0; t < n; t++){
      yield t;
    }
  }
  let t0t1 = [...tt( n )];

  for(let index in t0t1){
    const t = ddt*index;
    spiral.ts.push(t);
    spiral.xys.push([
      x(t),
      y(t)
    ]);
    spiral.phis.push(Math.atan(1/b));
  }

  return spiral;
}

/**
* Calculate a Generalized Secondary Fibonnaci Sequence
* S(i) where
* for all i from n to 0,
* i < 2: S(i) = c*S(i-2) + d*S(i-1)
* i = 1: S(i) = S(1) = b
* i = 0: S(i) = S(0) = a
*
* @param {object} params
* @param
* @param {Number} params.n
* @param {Number} params.c first-term coefficent, usually 1
* @param {Number} params.d second-term coefficent, usually >= c
* @param {Number} params.b
* @param {Number} params.a
* @return {Array} the sequence
*/
function calcGSFS(params){
  params = params || {};
  //DEFAULT: Fibonnaci's sequence /Pingala's mātrāmeru.
  const n = (typeof params.n === 'number')
    ? Math.floor(params.n)
    : RESOLUTION;
  const a = (typeof params.a === 'number')
    ? params.a
    : 0;
  const b = (typeof params.b === 'number')
    ? params.b
    : 1;
  const c = (typeof params.c === 'number')
    ? params.c
    : 1;
  const d = (typeof params.d === 'number')
    ? params.d
    : 1;
  let result = [a, b];
  for(let i = 2; i < n; i++){
    result.push(c * result[i-2] + d * result[i-1]);
  }
  return result;

}


/**
 * metallicRatioByFormula - get the metallic ratio of the form
 *
 * Where G(n+1) = p*G(n) + q*G(n-1):
 *
 * The limit as n>>infinity of G(n+1)/G(n) = (p -/+ Math.sqrt(p**2 + 4*q) ) / 2
 *
 * @param  {object} params description
 * @param {number} params.p p
 * @param {number} params.q q
 * @return {type}        description
 */
function metallicRatioByFormula(params){
  params = params || {};
  // console.log(params.p)
  //DEFAULT: Fibonnaci's sequence /Pingala's mātrāmeru.
  const p = (typeof params.p === 'number')
    ? params.p
    : 1;
  const q = (typeof params.q === 'number')
    ? params.q
    : 1;
  const limit = (p + Math.sqrt(p**2 + 4*q))/2;
  return limit;
}


export {
  metallicRatioByFormula,
  calcGSFS,
  calc2DSpiral
};

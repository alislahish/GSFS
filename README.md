# GSFS - Generalized Secondary Fibonacci Sequences

GSFS including the Golden, Silver, Copper and other metallic means take the form __G(n+1) = p * G(n) + q * G(n-1)__

These are some basic JavaScript functions for calculating
  + [Metallic means](http://www.mi.sanu.ac.rs/vismath/spinadel/index.html) as `Array` values,
  + [Metallic ratios](https://en.wikipedia.org/wiki/Metallic_mean) as `number` values, and
  + [Logarithmic spirals](https://en.wikipedia.org/wiki/Logarithmic_spiral) of the form __r = a * e^(b * theta)__ as `Object` values.


## Entry Point: `./src/GSFS.js`

## Dependencies
### NodeJS:
  -  [esm](https://github.com/standard-things/esm)

## Testing
These functions were neither optimized for any specific purpose nor tested beyond basic visual checks as seen in ./src/example.html.

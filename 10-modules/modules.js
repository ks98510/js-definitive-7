/* # 10.1 Modules with Classes ,Objects and Closure */

/* ## 10.1.1 Automating Closure-based modularity */
const modules = {};
function require(modulename) { return modules[modulename] }
modules["set.js"] = (function () {
  const exports = {};
  exports.BitSet = class BitSet { };
  return exports;
})()

const BitSet = require("set.js").BitSet;
let s = new BitSet();
// this code is a rough sketch of how code-bundling tools for web browsers work(such as webpack)

/* # 10.2 Modules in Node */
// require(); exports; module.exports;

/* # 10.2.1 Node Exports */
const sum = (x, y) => x + y;
const square = x => x * x;
exports.mean = data => data.reduce(sum) / data.length;
exports.variance = square;
// export a single file;
modules.exports = { sum, square }

/* # 10.2.2 Node Import */
// built-in
const fs = require("fs");
// third-party 
const express = require("express");
// use the relative path to the modules that contains codes ,use ./ or ../ to specify the path which are related to the current dictionary or parent dictionary
const stats = require('./stats.js');
const bitSet = require('./utils/bitset.js'); // there is no Error .
// omit the suffix .js
const utils = require('./utils');
// we can use destructure or the all entries.
// const {} = require('./modules')

/* # 10.2.3 Node-Style Modules on the Web */
// official js modules import and export


/* # 10.3 Modules in ES6 */
// differences between regular scripts and the modules .
// the top-level variables and functions will be shared with all scripts. but they have private context.
// in modules , we don't need to declare "use strict" ;  and this is undefined not the global object.

/* # 10.3.1 ES6 exports */
/* 
export const PI = Math.PI;
export function som() { };
export class Circle { };
export { PI, som, Circle };
// export only value 
export default class Notice { };
// export can only appear at the top level of a module , enable to static analysis
 */

/* # 10.3.2 ES6 imports */
import BitSit from './bit.js';
// import will "hoisted" to the top
// the module name must be an absolute path starting with "/" or the relative path with "./" or "../" or a complete URL with host and protocol
// es6 does not allow the "um.js", but the bundling tools can do this. 
import { mean, stddev } from './modules';
// import all
// non-default values are as the property of the stats object.
import * as stats from './stat.js';
// export and export default
import Histogram, { mean, stddev } from './modules';
// import no-exported modules;
import "./analysis.js";

/* # 10.3.3 import and export with reNaming */
import { render as renderImage } from './imageUtil.js';
import { render as renderUI } from './ui.js';
import { default as Histogram, mean, stddev } from './modules';
export {
  layout as calculator
}
// export only accept a single identifier not an expression;
export { Math.sin as sin }; // SyntaxError

/* # 10.3.4 re-export */
import { mean } from './stat/mean.js';
import { stddev } from './stat/stddev.js';
export { mean, stddev };
// combine the export and import;
export { mean } from './stat/mean.js';
export * from './stat/mean.js';
export { default as mean } from './stats/mean.js';
export { mean as default } from './tagged'

/* # 10.3.5 javaScript modules on the web  */
<script type="module"></script>
// async/ module will execute as soon as the code is loaded

/* dynamic imports from import() */
import * as stat from "./stats.js";
import("./stats.js").then(stat => {
  let average = stat.mean(data);
})

async function analyzeDate(data) {
  let stats = await import("./stats.js");
  return {
    average: stat.mean(data),
    stddev: stat.stddev(data)
  }
}

/* # 10.3.7 import.meta.url */
// return an object that contains metadata.
function localStringsURL(local){
  return new URL(`l1one/${local}.json`, import.meta.url`)
}
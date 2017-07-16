/**
 * Created by ly on 17/7/16.
 */
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

console.log(numCPUs);
console.log(require('os').cpus());
console.log(require('os').homedir());
console.log(require('os').userInfo());
console.log(require('os'));

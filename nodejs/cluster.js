/**
 * Created by ly on 17/7/16.
 */
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

console.log(numCPUs);


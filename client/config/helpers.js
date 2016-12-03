'use strict';

let path = require('path');

const ROOT = path.resolve(__dirname, '../');

function hasProcessFlag(flag) {
  return process.argv.join('').includes(flag);
}

function isWebpackDevServer() {
    console.log('helpers:  ' + process.argv[1]);
  return process.argv[1] && !!(/webpack-dev-server\.js$/.exec(process.argv[1]));
}

function root(args) {
  let argArr = Array.from(args).join("");

  return path.join.apply(path, [ROOT].concat(argArr));
}

// function checkNodeImport()
//

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
// exports.checkNodeImport = checkNodeImport;
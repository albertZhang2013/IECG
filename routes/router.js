
/**
 * Module dependencies.
 */

var path = require('path');

/**
 * Constants
 * @type {String}
 */
var GET_METHOD = 'GET',
    POST_METHOD = 'POST';

exports.cons = {
  GET_METHOD  : GET_METHOD,
  POST_METHOD : POST_METHOD
};

/**
 * Object with 'url' : 'implement', key-value pairs.
 * 'url' should be absolute URL.
 * the value of file should be relative URL.
 * @type {Object}
 */
exports.routings = {
  '/GetDeptList'   : {method : GET_METHOD, file : './routings/iphone.js', processFunction: 'getDeptList'}
};

exports.initRoute = initRoute;

/**
 * Initialize router with application and config of routing.
 * According the method, file and processFunction of each routing to setup GET/POST method to handle request.
 * @param {Express application} app - application reference
 * @param {Object} routings - config of routing
 */
function initRoute(app, routings) {
  var url, processFunction, processFile;

  for(url in routings){
    processFile = require(path.resolve(__dirname, routings[url].file));
    processFunction = processFile[routings[url].processFunction];

    if(routings[url].method === GET_METHOD)
      app.get(url, processFunction);
    else if(routings[url].method === POST_METHOD)
      app.post(url, processFunction);
    else
      app.all(url, processFunction);
  }
}

/**
 * This function should be called before processFunction of each routing.
 * @param {Server Request} req
 * @param {Server Respose} res
 */
function initRequest(req, res) {}

/**
 * This function should be called after processFunction of each routing. if processFunction don't call next()??
 * @param {Server Request} req
 * @param {Server Respose} res
 */
function afterRequest(req, res) {}



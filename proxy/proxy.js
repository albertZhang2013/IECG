/**
 * Module dependencies.
 */

var path = require('path')
  , appConfig = require('../appConfig.json')
  , db = require(path.resolve(appConfig['database']['proxyPath'])).db;

/**
 * Interface.
 * Find all records in <collectionName>.
 * @param {String} collectionName
 * @param {Function} callback
 */
function findAll (collectionName, callback) {
  db.findAll(collectionName, callback);
}

/**
 * Interface.
 * Find one specific record by id in <collectionName>.
 * @param {String} collectionName
 * @param {String} id
 * @param {Function} callback
 */
function findById (collectionName, id, callback) {
  db.findById(collectionName, id, callback);
}

/**
 * Interface.
 * Save records into <collectionName>.
 * @param {String} collectionName
 * @param {Array} records
 * @param {Function} callback
 */
function save (collectionName, records, callback) {
  db.save(collectionName, records, callback);
}

exports.findAll = findAll;
exports.findById = findById;
exports.save = save;

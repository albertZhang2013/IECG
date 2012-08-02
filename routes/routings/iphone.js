/**
 * Module dependencies.
 */
var MONGO = require('../../proxy/mongo').mongodb;

/**
 * Get department list
 * @param {Server Request} req
 * @param {Server Response} res
 */
function getDeptList (req, res) {
  /*var depList = [
    {
      DeptID: 1,
      DeptCode: '3001',
      DeptName: '3001'
    }, {
      DeptID: 2,
      DeptCode: '3002',
      DeptName: '3002'
    }, {
      DeptID: 3,
      DeptCode: '3003',
      DeptName: '3003'
    }
  ];*/
  var mongodb = new MONGO('IECG', 'localhost', 27017);

  mongodb.findAll('department', function (error, results) {
    res.send(JSON.stringify(results));
  });
};

exports.getDeptList = getDeptList;
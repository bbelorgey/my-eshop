const mysql = require('mysql');
const settings = require('./settings');
const util = require('util');

const connection = mysql.createConnection(settings);
connection.queryAsync = util.promisify(connection.query.bind(connection));

module.exports = connection;

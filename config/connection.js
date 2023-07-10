// connect object hold the connection object
const { connect, connection} = require('mongoose');
// connect to example db
connect('mongodb://127.0.0.1:27017/socialNetWorkdb',);

module.exports = connection;
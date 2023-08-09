// connect object hold the connection object
const { connect, connection} = require('mongoose');

// connect to example db
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetWorkdb';

connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = connection;
const { Sequelize } = require('sequelize')

// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'drinks_db'
// });

const sequelize = new Sequelize('test', 'root', undefined, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
// module.exports = connection.promise();
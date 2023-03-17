const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = process.env.MYSQL_URL
  ? new Sequelize(process.env.MYSQL_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
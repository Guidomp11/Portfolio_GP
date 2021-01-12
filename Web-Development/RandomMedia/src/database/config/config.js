require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_NAME_DEV,
    "host": process.env.DB_HOST_DEV,
    "port": process.env.DB_PORT_DEV,
    "dialect": "mysql",
    "timezone": "-03:00"
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "-03:00"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql",
    "timezone": "-03:00"
  }
}

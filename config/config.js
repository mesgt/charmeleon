<<<<<<< HEAD
=======

// const { config } = require('dotenv/types')
require('dotenv').config();

>>>>>>> f3814e5f99db601dbe8b5d7885430fda37708993

require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DEVELOPMENT_USERNAME,
    "password": process.env.DEVELOPMENT_PASSWORD,
    "database": "crimeAde",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
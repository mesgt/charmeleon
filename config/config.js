const { config } = require('dotenv/types')

require('dotenv').config();

module.exports = {
  "development": {
<<<<<<< HEAD:config/config.js
    "username": process.env.DEVELOPMENT_USERNAME,
    "password": process.env.DEVELOPMENT_PASSWORD,
=======
    "username": "root",
    "password": "root",
>>>>>>> 177ecc66631c68cd179a42b774a0d2a6582bbbaf:config/config.json
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
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
}

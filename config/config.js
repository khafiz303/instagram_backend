require('dotenv').config()
const fs = require('fs')
const path = require('path')
module.exports = {
  development : {
    "username": "user",
    "password": 'pass',
    "database": "user",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": '5433',
  },
  production: {
    username: 'doadmin',
    password:  process.env.PASSWORD_ENV, 
    database: 'defaultdb',
    host: 'db-postgresql-fra1-93825-do-user-17092848-0.c.db.ondigitalocean.com',
    dialect: 'postgres',
    port : 25060,
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(path.resolve('config', 'ca-certificate.crt')),
        }
    }
}
  
}

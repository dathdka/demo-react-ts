require('dotenv').config({path: '../.env'})
module.exports = {

  development: {
    client: 'pg',
    connection: {
      port : 5432,
      user : 'postgres',
      host : `127.0.0.1`,
      password : `1234@Tps229`,
      database : `demo`,
    },
    migrations: {
      directory: "./migrations"
    },
  }

};

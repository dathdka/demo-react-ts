require('dotenv').config()
module.exports = {

  development: {
    client: 'pg',
    connection: {
      port : 5432,
      user : `${process.env.DB_USERNAME}`,
      host : `${process.env.DB_HOST}`,
      password : `${process.env.DB_PASSWORD}`,
      database : `${process.env.DB_NAME}`,
    },
    migrations: {
      directory: "./migrations"
    }
  }

};

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      port: 3306,
      // port : 5432,
      // host : 'db',
      // user : `postgres`,
      user: 'root',
      host : '127.0.0.1',
      // password : `1234@Tps229`,
      database : 'demo'
    },
    migrations: {
      directory: "./migrations"
    }
  }

};

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
    port: process.env.DEV_DB_PORT
  },
  test: {
    username: "root",
    password: null,
    database: "chatbot_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    dialect: process.env.PROD_DB_DIALECT,
    port: process.env.PROD_DB_PORT,
    // pool configuration used to pool database connections
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
  }
}


// module.exports = {
//   development: {
//     username: "root",
//     password: null,
//     database: "chatbot_db",
//     host: "127.0.0.1",
//     dialect: "mysql"
//   },
//   test: {
//     username: "root",
//     password: null,
//     database: "chatbot_db",
//     host: "127.0.0.1",
//     dialect: "mysql"
//   },
//   production: {
//     username: "karb6351",
//     password: "david05027",
//     database: "chatbotdb",
//     host: "chatbotdb.cfl3m0hqubpz.us-east-2.rds.amazonaws.com",
//     dialect: "mysql"
//   }
// }

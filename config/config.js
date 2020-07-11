require("dotenv").config();
// const fs = require("fs");
module.exports = {
  development: {
    username: "root",
    password: "",
    database: "database_dev",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      underscore: true,
    },
  },
  test: {
    username: "root",
    password: "",
    database: "database_dev",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "bd5ed3395b5f90",
    password: "865869ee",
    database: "heroku_a6edd5182f9354a",
    host: "us-cdbr-east-02.cleardb.com",
    dialect: "mysql",
    define: {
      underscore: true,
    },
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + "/mysql-ca-master.crt"),
    //   },
    // },
  },
};

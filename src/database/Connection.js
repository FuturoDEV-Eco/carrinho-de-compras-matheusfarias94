const { Pool } = require("pg");

class Database {
  constructor() {
    this.database = new Pool({
      user: "postgres",
      password: "#Motocroos94",
      host: "localhost",
      database: "api_labCommerce",
      port: 5432
    });
  }
}

module.exports = Database;

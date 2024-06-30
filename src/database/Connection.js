const { Pool } = require("pg");

class Database {
  constructor() {
    this.database = new Pool({
      user: "postgres",
      password: "***",
      host: "localhost",
      database: "api_labCommerce",
      port: 5432
    }); 
  }
}

module.exports = Database;

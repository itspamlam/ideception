const env = require('dotenv').config(),
      pgp = require('pg-promise')(),
      uri = process.env.POSTGRES_URI;

const db = {
  getAll: (table) => {
    return db.conn.any(`SELECT * FROM ${table}`);
  }
};

console.log(uri);
db.conn = pgp(uri);
module.exports = db;

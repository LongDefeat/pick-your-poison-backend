"use strict";
/** Database setup for movie maker journal. */
const { Client } = require('pg')
 

const client = new Client({
  host: 'my.database-server.com',
  port: 3001,
  user: 'database-user',
  password: 'secret-secret',
})
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.CACERT,
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

db.connect();

module.exports = db;
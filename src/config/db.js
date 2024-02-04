const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: "diary-api-db.c36k24ws0scc.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "minseong910424",
  database: "diary_api_db"
});

db.connect();

module.exports = db;

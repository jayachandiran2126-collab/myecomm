const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // MySQL password here
  database: "ecommerce_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB error:", err);
  } else {
    console.log("MySQL connected");
  }
});

module.exports = db;

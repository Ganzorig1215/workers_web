// const db = async () => {
//   try {
//     const connection = mysql.createConnection({
//       host: "10.0.126.115",
//       user: "ganzorig",
//       password: "net#graph$",
//       database: "ganzorig_test",
//     });

//     // Connect to the database
//     connection.connect((error) => {
//       if (error) {
//         console.error("Error connecting to MySQL database", error);
//         throw error;
//       }
//       console.log("Connected to MySQL database");
//     });

//     return connection;
//   } catch (error) {
//     console.error("Error creating MySQL connection", error);
//     throw error;
//   }
// };

// module.exports = db;

const mysql = require("mysql2/promise");
require("dotenv").config();

const config = {
  host: "10.0.126.115",
  user: "ganzorig",
  password: "net#graph$",
  database: "ganzorig_test",
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
};

async function query(sql, params) {
  let mysqlConnection;
  try {
    mysqlConnection = await mysql.createConnection(config);
    console.log("Connected to the database");
    const [rows, fields] = await mysqlConnection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  } finally {
    if (mysqlConnection) {
      mysqlConnection.end();
    }
  }
}

module.exports = { query };

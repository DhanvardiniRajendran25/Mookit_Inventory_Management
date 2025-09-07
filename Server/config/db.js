const sql = require("mssql");

const config = {
  user: "Dhanu",
  password: "1234",
  server: "DHANVARDINI",
  database: "Mookit",
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 1433,
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => console.error("Database Connection Failed:", err.message));

module.exports = poolPromise;

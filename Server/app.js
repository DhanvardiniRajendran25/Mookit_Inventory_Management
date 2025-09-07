const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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

const customerRoutes = require("./routes/customer_routes");
app.use("/customer", customerRoutes);

const orderRoutes = require("./routes/order_routes");
app.use("/orders", orderRoutes);

app.get("/Customer", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query("select * from Customer");
    data.then((res1) => {
      return res.json(res1);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  return res.json("Hi, I am backend");
});

app.get("/customers", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Customer");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

const PORT = 3000;

app.listen(3000, () => {
  console.log("The Server is running at 3000");
});

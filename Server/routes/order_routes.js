const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../config/db");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM [Order]");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new order
router.post("/add", async (req, res) => {
  const { OrderName, TotalAmount, CustomerID } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("OrderName", sql.NVarChar, OrderName)
      .input("TotalAmount", sql.Decimal, TotalAmount)
      .input("CustomerID", sql.Int, CustomerID)
      .query(
        "INSERT INTO [Order] (OrderName, TotalAmount, CustomerID) VALUES (@OrderName, @TotalAmount, @CustomerID)"
      );
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

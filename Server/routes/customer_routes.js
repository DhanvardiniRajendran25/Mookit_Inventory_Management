const express = require("express");
const router = express.Router();
const poolPromise = require("./db");

// API to fetch all customers
router.get("/customers", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Customers");
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching customers:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

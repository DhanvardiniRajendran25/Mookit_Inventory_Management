
const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../config/db.js");

// Fetch all orders
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
    const { CustomerID, TotalAmount, Status, OrderDate } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input("CustomerID", sql.Int, CustomerID)
            .input("TotalAmount", sql.Decimal, TotalAmount)
            .input("Status", sql.NVarChar, Status)
            .input("OrderDate", sql.Date, OrderDate)
            .query("INSERT INTO [Order] (CustomerID, TotalAmount, Status, OrderDate) VALUES (@CustomerID, @TotalAmount, @Status, @OrderDate)");
        res.json({ message: "Order placed successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch orders for a specific customer
router.get("/customer/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input("CustomerID", sql.Int, id)
            .query("SELECT * FROM [Order] WHERE CustomerID = @CustomerID");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an order
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        await pool.request().input("OrderID", sql.Int, id).query("DELETE FROM [Order] WHERE OrderID=@OrderID");
        res.json({ message: "Order deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

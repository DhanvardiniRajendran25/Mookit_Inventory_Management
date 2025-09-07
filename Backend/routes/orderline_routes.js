
const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../config/db.js");

// Fetch all order lines
router.get("/", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT * FROM OrderLine");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new order line
router.post("/add", async (req, res) => {
    const { OrderID, PackageID } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input("OrderID", sql.Int, OrderID)
            .input("PackageID", sql.Int, PackageID)
            .query("INSERT INTO OrderLine (OrderID, PackageID) VALUES (@OrderID, @PackageID)");
        res.json({ message: "Order line added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch order lines for a specific order
router.get("/order/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input("OrderID", sql.Int, id)
            .query("SELECT * FROM OrderLine WHERE OrderID = @OrderID");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

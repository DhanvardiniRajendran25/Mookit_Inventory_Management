
const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../config/db.js");

// Fetch all products
router.get("/", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT * FROM Product");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new product
router.post("/add", async (req, res) => {
    const { ProductName, Description, Price, StockQuantity, Category } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input("ProductName", sql.NVarChar, ProductName)
            .input("Description", sql.NVarChar, Description)
            .input("Price", sql.Decimal, Price)
            .input("StockQuantity", sql.Int, StockQuantity)
            .input("Category", sql.NVarChar, Category)
            .query("INSERT INTO Product (ProductName, Description, Price, StockQuantity, Category) VALUES (@ProductName, @Description, @Price, @StockQuantity, @Category)");
        res.json({ message: "Product added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { ProductName, Description, Price, StockQuantity, Category } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input("ProductID", sql.Int, id)
            .input("ProductName", sql.NVarChar, ProductName)
            .input("Description", sql.NVarChar, Description)
            .input("Price", sql.Decimal, Price)
            .input("StockQuantity", sql.Int, StockQuantity)
            .input("Category", sql.NVarChar, Category)
            .query("UPDATE Product SET ProductName=@ProductName, Description=@Description, Price=@Price, StockQuantity=@StockQuantity, Category=@Category WHERE ProductID=@ProductID");
        res.json({ message: "Product updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        await pool.request().input("ProductID", sql.Int, id).query("DELETE FROM Product WHERE ProductID=@ProductID");
        res.json({ message: "Product deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

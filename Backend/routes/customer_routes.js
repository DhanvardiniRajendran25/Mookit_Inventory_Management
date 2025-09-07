
const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../config/db.js");

// Fetch all customers
router.get("/", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT * FROM Customer");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new customer
router.post("/add", async (req, res) => {
    const { Name, Email, Phone, Address, PlatformID } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input("Name", sql.NVarChar, Name)
            .input("Email", sql.NVarChar, Email)
            .input("Phone", sql.NVarChar, Phone)
            .input("Address", sql.NVarChar, Address)
            .input("PlatformID", sql.Int, PlatformID)
            .query("INSERT INTO Customer (Name, Email, Phone, Address, PlatformID) VALUES (@Name, @Email, @Phone, @Address, @PlatformID)");
        res.json({ message: "Customer added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a customer
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Phone, Address, PlatformID } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input("CustomerID", sql.Int, id)
            .input("Name", sql.NVarChar, Name)
            .input("Email", sql.NVarChar, Email)
            .input("Phone", sql.NVarChar, Phone)
            .input("Address", sql.NVarChar, Address)
            .input("PlatformID", sql.Int, PlatformID)
            .query("UPDATE Customer SET Name=@Name, Email=@Email, Phone=@Phone, Address=@Address, PlatformID=@PlatformID WHERE CustomerID=@CustomerID");
        res.json({ message: "Customer updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a customer
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        await pool.request().input("CustomerID", sql.Int, id).query("DELETE FROM Customer WHERE CustomerID=@CustomerID");
        res.json({ message: "Customer deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

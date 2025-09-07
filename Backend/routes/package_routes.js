
const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../config/db.js");

// Fetch all packages
router.get("/", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT * FROM MooPackage");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new package
router.post("/add", async (req, res) => {
    const { PackageName, Description, Price } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input("PackageName", sql.NVarChar, PackageName)
            .input("Description", sql.NVarChar, Description)
            .input("Price", sql.Decimal, Price)
            .query("INSERT INTO MooPackage (PackageName, Description, Price) VALUES (@PackageName, @Description, @Price)");
        res.json({ message: "Package added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a package
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { PackageName, Description, Price } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input("PackageID", sql.Int, id)
            .input("PackageName", sql.NVarChar, PackageName)
            .input("Description", sql.NVarChar, Description)
            .input("Price", sql.Decimal, Price)
            .query("UPDATE MooPackage SET PackageName=@PackageName, Description=@Description, Price=@Price WHERE PackageID=@PackageID");
        res.json({ message: "Package updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a package
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        await pool.request().input("PackageID", sql.Int, id).query("DELETE FROM MooPackage WHERE PackageID=@PackageID");
        res.json({ message: "Package deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

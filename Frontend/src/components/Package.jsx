
import React, { useState, useEffect } from "react";
import "./Package.css";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    PackageName: "",
    Description: "",
    Price: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const response = await fetch("http://localhost:3000/packages");
    const data = await response.json();
    setPackages(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPackage = async () => {
    await fetch("http://localhost:3000/packages/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchPackages();
  };

  const handleUpdatePackage = async (id) => {
    await fetch(`http://localhost:3000/packages/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchPackages();
  };

  const handleDeletePackage = async (id) => {
    await fetch(`http://localhost:3000/packages/delete/${id}`, {
      method: "DELETE",
    });
    fetchPackages();
  };

  return (
    <div className="package-management">
      <h2>Package Management</h2>
      <div className="package-form">
        <input
          name="PackageName"
          placeholder="Package Name"
          value={formData.PackageName}
          onChange={handleInputChange}
        />
        <input
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleInputChange}
        />
        <input
          name="Price"
          placeholder="Price"
          value={formData.Price}
          onChange={handleInputChange}
        />
        <button onClick={handleAddPackage}>Add Package</button>
      </div>
      <h3>Package List</h3>
      <table className="package-table">
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.PackageID}>
              <td>{pkg.PackageName}</td>
              <td>{pkg.Description}</td>
              <td>${pkg.Price}</td>
              <td>
                <button onClick={() => handleUpdatePackage(pkg.PackageID)}>
                  Update
                </button>
                <button onClick={() => handleDeletePackage(pkg.PackageID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Package;

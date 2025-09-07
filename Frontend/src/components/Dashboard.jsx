
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Welcome to Mookit</h1>
      <p>Manage your customers, products, packages, and orders seamlessly.</p>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/customers")}>Manage Customers</button>
        <button onClick={() => navigate("/products")}>View Products</button>
        <button onClick={() => navigate("/packages")}>Explore Packages</button>
        <button onClick={() => navigate("/orders")}>View Orders</button>
      </div>
    </div>
  );
};

export default Dashboard;

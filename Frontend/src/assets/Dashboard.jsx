import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Welcome to Mookit</h1>
      <p>Your one-stop solution for managing customers and orders!</p>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/customers")}>Manage Customers</button>
        <button onClick={() => navigate("/orders")}>Manage Orders</button>
      </div>
    </div>
  );
}

export default Dashboard;

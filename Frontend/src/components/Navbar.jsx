
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/packages">Packages</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

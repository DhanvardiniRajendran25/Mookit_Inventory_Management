
import React, { useState, useEffect } from "react";
import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    CustomerID: "",
    TotalAmount: "",
    Status: "",
    OrderDate: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch("http://localhost:3000/orders");
    const data = await response.json();
    setOrders(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrder = async () => {
    await fetch("http://localhost:3000/orders/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchOrders();
  };

  const handleDeleteOrder = async (id) => {
    await fetch(`http://localhost:3000/orders/delete/${id}`, {
      method: "DELETE",
    });
    fetchOrders();
  };

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <div className="order-form">
        <input
          name="CustomerID"
          placeholder="Customer ID"
          value={formData.CustomerID}
          onChange={handleInputChange}
        />
        <input
          name="TotalAmount"
          placeholder="Total Amount"
          value={formData.TotalAmount}
          onChange={handleInputChange}
        />
        <input
          name="Status"
          placeholder="Status"
          value={formData.Status}
          onChange={handleInputChange}
        />
        <input
          name="OrderDate"
          placeholder="Order Date (YYYY-MM-DD)"
          value={formData.OrderDate}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrder}>Place Order</button>
      </div>
      <h3>Order List</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.OrderID}>
              <td>{order.OrderID}</td>
              <td>{order.CustomerID}</td>
              <td>${order.TotalAmount}</td>
              <td>{order.Status}</td>
              <td>{order.OrderDate}</td>
              <td>
                <button onClick={() => handleDeleteOrder(order.OrderID)}>
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

export default Order;

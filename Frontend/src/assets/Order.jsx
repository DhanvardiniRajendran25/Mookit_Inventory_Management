import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    OrderName: "",
    TotalAmount: "",
    CustomerID: "",
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
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleAddOrder = async () => {
    await fetch("http://localhost:3000/orders/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });
    fetchOrders();
  };

  return (
    <div>
      <h2>Order Management</h2>
      <div>
        <input
          name="OrderName"
          placeholder="Order Name"
          onChange={handleInputChange}
        />
        <input
          name="TotalAmount"
          placeholder="Total Amount"
          onChange={handleInputChange}
        />
        <input
          name="CustomerID"
          placeholder="Customer ID"
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrder}>Place Order</button>
      </div>

      <h3>Order List</h3>
      <table>
        <thead>
          <tr>
            <th>Order Name</th>
            <th>Total Amount</th>
            <th>Customer ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.OrderID}>
              <td>{order.OrderName}</td>
              <td>${order.TotalAmount}</td>
              <td>{order.CustomerID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;

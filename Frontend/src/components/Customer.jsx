
import React, { useState, useEffect } from "react";
import "./Customer.css";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
    PlatformID: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch("http://localhost:3000/customers");
    const data = await response.json();
    setCustomers(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async () => {
    await fetch("http://localhost:3000/customers/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchCustomers();
  };

  const handleUpdateCustomer = async (id) => {
    await fetch(`http://localhost:3000/customers/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchCustomers();
  };

  const handleDeleteCustomer = async (id) => {
    await fetch(`http://localhost:3000/customers/delete/${id}`, {
      method: "DELETE",
    });
    fetchCustomers();
  };

  return (
    <div className="customer-management">
      <h2>Customer Management</h2>
      <div className="customer-form">
        <input
          name="Name"
          placeholder="Name"
          value={formData.Name}
          onChange={handleInputChange}
        />
        <input
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleInputChange}
        />
        <input
          name="Phone"
          placeholder="Phone"
          value={formData.Phone}
          onChange={handleInputChange}
        />
        <input
          name="Address"
          placeholder="Address"
          value={formData.Address}
          onChange={handleInputChange}
        />
        <input
          name="PlatformID"
          placeholder="Platform ID"
          value={formData.PlatformID}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
      <h3>Customer List</h3>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.CustomerID}>
              <td>{customer.Name}</td>
              <td>{customer.Email}</td>
              <td>{customer.Phone}</td>
              <td>{customer.Address}</td>
              <td>
                <button onClick={() => handleUpdateCustomer(customer.CustomerID)}>
                  Update
                </button>
                <button onClick={() => handleDeleteCustomer(customer.CustomerID)}>
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

export default Customer;

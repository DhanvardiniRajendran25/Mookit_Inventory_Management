import React, { useState, useEffect } from 'react';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Address: '',
    Phone: '',
    PlatformID: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch('http://localhost:3000/customer');
    const data = await response.json();
    setCustomers(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async () => {
    await fetch('http://localhost:3000/customer/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchCustomers();
  };

  const handleUpdateCustomer = async (id) => {
    await fetch(`http://localhost:3000/customer/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchCustomers();
  };

  const handleDeleteCustomer = async (id) => {
    await fetch(`http://localhost:3000/customer/delete/${id}`, {
      method: 'DELETE',
    });
    fetchCustomers();
  };

  return (
    <div>
      <h2>Customer Management</h2>
      <div>
        <input name="Name" placeholder="Name" onChange={handleInputChange} />
        <input name="Email" placeholder="Email" onChange={handleInputChange} />
        <input name="Address" placeholder="Address" onChange={handleInputChange} />
        <input name="Phone" placeholder="Phone" onChange={handleInputChange} />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
      <h3>Customer List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.CustomerID}>
              <td>{customer.Name}</td>
              <td>{customer.Email}</td>
              <td>{customer.Address}</td>
              <td>{customer.Phone}</td>
              <td>
                <button onClick={() => handleUpdateCustomer(customer.CustomerID)}>Update</button>
                <button onClick={() => handleDeleteCustomer(customer.CustomerID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;

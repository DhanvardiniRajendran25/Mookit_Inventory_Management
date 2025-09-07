/*import React, { useEffect, useState } from "react";
import "./Table.css"; // Import the CSS file for styling

const CustomerTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/customers")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching customer data:", error));
  }, []);

  return (
    <div className="table-container">
      <h1 className="table-title">Customer Database</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Platform ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr key={customer.CustomerID}>
              <td>{customer.CustomerID}</td>
              <td>{customer.Name}</td>
              <td>{customer.Email}</td>
              <td>{customer.Address}</td>
              <td>{customer.Phone}</td>
              <td>{customer.PlatformID}</td>
              <td className="actions">
                <button className="action-btn create">Create</button>
                <button className="action-btn update">Update</button>
                <button className="action-btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;


*/

import React, { useEffect, useState } from "react";
import "./CustomerTable.css";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/customers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      <h1 className="table-title">Customer Database</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.CustomerID}>
              <td>{customer.CustomerID}</td>
              <td>{customer.Name}</td>
              <td>{customer.Email}</td>
              <td>{customer.Address}</td>
              <td>{customer.Phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

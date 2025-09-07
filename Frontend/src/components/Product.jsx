
import React, { useState, useEffect } from "react";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    ProductName: "",
    Description: "",
    Price: "",
    StockQuantity: "",
    Category: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    await fetch("http://localhost:3000/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchProducts();
  };

  const handleUpdateProduct = async (id) => {
    await fetch(`http://localhost:3000/products/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:3000/products/delete/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <div className="product-form">
        <input
          name="ProductName"
          placeholder="Product Name"
          value={formData.ProductName}
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
        <input
          name="StockQuantity"
          placeholder="Stock Quantity"
          value={formData.StockQuantity}
          onChange={handleInputChange}
        />
        <input
          name="Category"
          placeholder="Category"
          value={formData.Category}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <h3>Product List</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.ProductID}>
              <td>{product.ProductName}</td>
              <td>{product.Description}</td>
              <td>${product.Price}</td>
              <td>{product.StockQuantity}</td>
              <td>{product.Category}</td>
              <td>
                <button onClick={() => handleUpdateProduct(product.ProductID)}>
                  Update
                </button>
                <button onClick={() => handleDeleteProduct(product.ProductID)}>
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

export default Product;

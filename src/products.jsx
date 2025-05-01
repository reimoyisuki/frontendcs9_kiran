import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
const [products, setProducts] = useState([]);

  // Fetch products when the page loads
useEffect(() => {
    async function fetchProducts() {
    try {
        const response = await axios.get("http://localhost:3000/item"); // Full URL for the products API
        if (response.data.success) {
          setProducts(response.data.payload); // Set the products to the state from the payload
        } else {
        console.error("No products found");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
    }
    fetchProducts();
}, []);

return (
    <div className="products-container">
    <h2>Products</h2>
    <div className="product-list">
        {products.length > 0 ? (
        products.map((product) => (
            <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} IDR</p>
            <p>Stock: {product.stock}</p>
            </div>
        ))
        ) : (
        <p>No products available</p>
        )}
    </div>
    </div>
);
}

export default Products;
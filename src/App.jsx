import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Login and Register Component
function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isLogin ? "http://localhost:3000/user/login" : "http://localhost:3000/user/register";
    try {
      const response = await axios.post(url, { email, password });
      alert(isLogin ? "Login successful!" : "Registration successful!");
      navigate("/products");
    } catch (error) {
      alert(error.response ? error.response.data.message : "An error occurred");
    }
  };

  return (
    <div className="login-register-container">
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register here" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

// Products Component
function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Products</h2> <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
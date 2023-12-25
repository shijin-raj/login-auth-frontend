import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Main.css";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { login, isLoggedIn, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });
      login();
    } catch (error) {
      if (error.response.status == 401) {
        alert("Invalid credentials!");
      }
      console.error("Login failed:", error.message);
    }
  };
  const loginCheck = async (e) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:3000/loginCheck");
      if (response.status == 200) {
        login();
      } 
    } catch (error) {
      if (error.status == 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);
  if (loading) {
    return (
      <div className={`loader-container ${loading ? "visible" : "hidden"}`}>
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="form-footer">
          <p>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    );
  }
};

export default LoginPage;

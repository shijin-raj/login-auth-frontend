import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import './Main.css';
const LoginPage = () => {
  console.log('Login component rendered');

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });

      login();
      console.log(response.status); // Just for testing, handle the response as needed
    } catch (error) {
      if(error.response.status==401){
        alert("Invalid credentials!");
      }
      console.error("Login failed:", error.message);
    }
  };


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
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
    );
 
};

export default LoginPage;

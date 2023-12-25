import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Main.css";

const Dashboard = () => {
  const { logout } = useAuth();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

  const handleDashSync = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get("http://localhost:3000/protected");
      if (response.status == 200) {
        setLikes(response.data.data.likes);
        setComments(response.data.data.comments);
        setShares(response.data.data.shares);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // useEffect to automatically trigger handleDashSync on component mount
  useEffect(() => {
    handleDashSync();
  }, []); // Empty dependency array ensures the effect runs only once after component mount
  return (
    <div className="dash-container">
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
      <div className="form-group">
        <button onClick={logout}>Logout</button>
      </div>
      {/* Add your dashboard content here */}
      <p>Likes : {likes}</p>
      <p>Shares : {shares}</p>
      <p>Comments : {comments}</p>
    </div>
  );
};

export default Dashboard;

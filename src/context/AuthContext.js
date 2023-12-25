import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = async () => {
    try {
      // Make a request to the server's logout route
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:3000/logout");
      console.log(response.status); // Just for testing, handle the response as needed
      if (response.status == 200) {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

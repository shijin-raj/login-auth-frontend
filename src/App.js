import React from "react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
      <div>
        {isLoggedIn ?  <Dashboard /> :<LoginPage />}
      </div>
  );
};

export default App;

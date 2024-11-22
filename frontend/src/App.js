import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import LoginPage from "./components/login";
import DashboardPage from "./components/dashboard";
import LawQuery from "./components/lawquery";
import StolenPost from "./components/stolenpost/stolenpost";

const App = () => {
  const [role, setRole] = useState(null); // Track user role (e.g., admin, user)

  return (
      <Router>
          {/* Pass role and setRole to Header */}
          <Header role={role} setRole={setRole} />
          <Routes>
              <Route path="/" element={<StolenPost/>} />
              <Route
                  path="/login"
                  element={
                      <LoginPage
                          onLogin={(loggedInRole) => setRole(loggedInRole)} // Update role on login
                      />
                  }
              />
              <Route
                  path="/dashboard"
                  element={role === "admin" ? <DashboardPage /> : <h1>Access Denied</h1>}
              />
              <Route path="/query" element={<LawQuery />} />
              <Route path="/about" element={<h1>About Us</h1>} />
              <Route path="/contact" element={<h1>Contact Us</h1>} />
          </Routes>
      </Router>
  );
};

export default App;

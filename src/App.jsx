import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
      <Route path="/forgot-password" element={<ForgotPassword  />} />
    </Routes>
  );
}

export default App; // ✅ This line is required!

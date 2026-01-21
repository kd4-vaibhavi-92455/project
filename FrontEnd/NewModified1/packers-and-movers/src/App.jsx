import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import ThemeProvider from "../providers/ThemeProvider";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import GetQuotePage from "./components/pages/GetQuotePage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/get-quote" element={<GetQuotePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

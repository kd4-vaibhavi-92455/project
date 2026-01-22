import React, { useState } from "react";
import "./App.css";
import "./index.css";
// import ThemeProvider from "../providers/ThemeProvider";
import { Route, Routes } from "react-router";
import ThemeProvider from "./providers/ThemeProvider";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import About from "./pages/About";
import Footer from "./components/common/Footer";
import CustomerDashboard from "./modules/customer/CustomerDashboard";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* visitor layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/footer" element={<Footer />} />
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="services" element={<Services />} /> */}
        </Route>
        <Route path="/customer" element={<CustomerDashboard />} />
        {/* user layout */}
        {/* <Route path="/user">
          <Route index element={<Navbar />} />
        </Route> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;

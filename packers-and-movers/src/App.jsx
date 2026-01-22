import React, { useState } from "react";
import "./App.css";
import "./index.css";
// import ThemeProvider from "../providers/ThemeProvider";
import { Route, Routes } from "react-router";
import ThemeProvider from "./providers/ThemeProvider";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* visitor layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="services" element={<Services />} /> */}
        </Route>
        {/* user layout */}
        {/* <Route path="/user">
          <Route index element={<Navbar />} />
        </Route> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;

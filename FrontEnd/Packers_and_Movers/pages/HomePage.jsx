import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <div className="hero">
        <img src="/1.jpg" alt="Truck" />
      </div>

      <div className="breadcrumb">
        <span className="active">HOME</span>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;

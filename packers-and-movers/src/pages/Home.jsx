import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div style={{ height: "200vh" }}> </div>
      <div className="h-20 w-20 bg-brand-primary"></div>
    </div>
  );
};

export default Home;

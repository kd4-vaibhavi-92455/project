import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/HeroSection";
import MovingProceduresUI from "../components/MovingProceduresUI";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MovingProceduresUI />
      {/* <div style={{ height: "200vh" }}> </div> */}
      {/* <div className="h-20 w-20 bg-brand-primary"></div> */}
    </div>
  );
};

export default Home;

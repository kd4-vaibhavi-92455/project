import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/HeroSection";
import MovingProceduresUI from "../components/MovingProceduresUI";
import WeFocusQuality from "../components/WeFocusQuality";
import Container from "../components/common/Container";
import QuoteForm from './../components/QuoteForm';
import Footer from './../components/common/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MovingProceduresUI />
      <WeFocusQuality />
      <QuoteForm />

      <Container></Container>
      
      {/* <div style={{ height: "200vh" }}> </div> */}
      {/* <div className="h-20 w-20 bg-brand-primary"></div> */}
      <Footer/>
    </div>
    
  );
};

export default Home;

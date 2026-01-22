import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/HeroSection";
import MovingProceduresUI from "../components/MovingProceduresUI";
import WeFocusQuality from "../components/WeFocusQuality";
import Container from "../components/common/Container";
// import QuoteForm from "../components/QuoteForm";
// import FormLayoutWithImage from "../components/FormLayoutWithImage";
import QuoteForm from "../components/QuoteForm";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MovingProceduresUI />
      <div style={{ position: "relative" }}>
        <WeFocusQuality />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "125%",
            width: "100%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* <div style={{ position: "absolute", left: "50px", top: "80%" }}> */}
          <Container>
            <QuoteForm />
          </Container>
        </div>
      </div>

      <div style={{ height: "200vh" }}> </div>
      {/* <div className="h-20 w-20 bg-brand-primary"></div> */}
    </div>
  );
};

export default Home;

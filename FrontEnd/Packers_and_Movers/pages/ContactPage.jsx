import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">MAIL US</span>
      </div>

      <div className="contact-wrapper">
        <div className="address">
          <h3>Address</h3>
          <p>D-204, Hole Town South West, Delhi - 110096, India</p>
          <p>📞 Free Phone : +85 296 31239</p>
          <p>✉️ info@gmail.com</p>
        </div>

        <div className="contact-form">
          <h3>Contact Form</h3>

          <div className="row">
            <input placeholder="Name*" />
            <input placeholder="Phone*" />
          </div>

          <div className="row">
            <input placeholder="Email*" />
            <input placeholder="Subject*" />
          </div>

          <textarea placeholder="Message..."></textarea>

          <div className="buttons">
            <button>SUBMIT</button>
            <button>CLEAR</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;

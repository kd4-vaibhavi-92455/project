import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">ABOUT US</span>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h3 className="text-center mb-5 text-warning">About Us</h3>
            
            <div className="card mb-4">
              <div className="card-body">
                <p className="lead">
                  Movers & Packers Management System is a reliable and customer-focused platform designed to provide professional packing, moving, and relocation services. We aim to make the moving process safe, simple, and stress-free for individuals and businesses.
                </p>
                
                <p>
                  With a team of trained professionals and modern transportation facilities, we ensure secure handling, careful packing, timely delivery, and complete customer satisfaction. Whether it is household shifting, office relocation, or vehicle transportation, we handle every move with care and efficiency.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header bg-warning text-white">
                    <h5>🎯 Our Mission</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      Our mission is to deliver safe, affordable, and high-quality relocation services while maintaining transparency, reliability, and trust with our customers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header bg-info text-white">
                    <h5>👁️ Our Vision</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      To become a leading movers and packers service provider by continuously improving service quality, adopting new technologies, and ensuring customer satisfaction at every step.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-header bg-success text-white">
                <h5>✨ Why Choose Us?</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li>✅ Trained professionals</li>
                      <li>✅ Modern transportation facilities</li>
                      <li>✅ Secure handling & packing</li>
                      <li>✅ Timely delivery</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li>✅ Complete customer satisfaction</li>
                      <li>✅ Transparent pricing</li>
                      <li>✅ Insurance coverage</li>
                      <li>✅ 24/7 customer support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
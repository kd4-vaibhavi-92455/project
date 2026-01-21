import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ServicesPage = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">SERVICES</span>
      </div>

      <div className="container my-5">
        <h3 className="text-center mb-5">Our Services</h3>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-warning">🏠 Household Shifting</h5>
                <p className="card-text">Complete home relocation services with professional packing and safe transportation.</p>
                <ul className="list-unstyled">
                  <li>✓ Professional packing</li>
                  <li>✓ Safe loading & unloading</li>
                  <li>✓ Insurance coverage</li>
                  <li>✓ Unpacking services</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-warning">🏢 Office Relocation</h5>
                <p className="card-text">Seamless office moving services with minimal business disruption.</p>
                <ul className="list-unstyled">
                  <li>✓ IT equipment handling</li>
                  <li>✓ Furniture disassembly</li>
                  <li>✓ Weekend/after-hours service</li>
                  <li>✓ Setup assistance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-warning">🚗 Vehicle Transportation</h5>
                <p className="card-text">Safe and secure vehicle transportation across cities.</p>
                <ul className="list-unstyled">
                  <li>✓ Car & bike transport</li>
                  <li>✓ Door-to-door service</li>
                  <li>✓ GPS tracking</li>
                  <li>✓ Insurance coverage</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-warning">📦 Warehouse Storage</h5>
                <p className="card-text">Secure storage solutions for short and long-term needs.</p>
                <ul className="list-unstyled">
                  <li>✓ Climate controlled</li>
                  <li>✓ 24/7 security</li>
                  <li>✓ Flexible duration</li>
                  <li>✓ Easy access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServicesPage;
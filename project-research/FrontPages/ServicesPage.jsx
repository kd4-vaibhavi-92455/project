import React from "react";
import { Link } from "react-router-dom";
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
        
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={{backgroundColor: '#ffe6cc'}}>
              <div className="card-body text-center">
                <Link to="/customer/get-quote" className="text-decoration-none">
                  <h5 className="card-title text-warning" style={{cursor: 'pointer'}} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>🏠 Household Shifting</h5>
                </Link>
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
          
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={{backgroundColor: '#ffe6cc'}}>
              <div className="card-body text-center">
                <Link to="/customer/get-quote" className="text-decoration-none">
                  <h5 className="card-title text-warning" style={{cursor: 'pointer'}} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>🏢 Office Relocation</h5>
                </Link>
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
          
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={{backgroundColor: '#ffe6cc'}}>
              <div className="card-body text-center">
                <Link to="/customer/get-quote" className="text-decoration-none">
                  <h5 className="card-title text-warning" style={{cursor: 'pointer'}} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>🚗 Vehicle Transportation</h5>
                </Link>
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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServicesPage;
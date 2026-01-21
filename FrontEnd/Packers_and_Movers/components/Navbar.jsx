import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        MOVERS <span>&</span> PAC<span className="highlight">K</span>ERS
      </div>

      <ul className="nav-menu">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">HOME</Link>
        </li>
        <li><Link to="/services">SERVICES</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li className={location.pathname === "/login" ? "active" : ""}>
  <Link to="/login">USER LOGIN</Link>
</li>

        {/* <li><a href="#">USER LOGIN</a></li> */}
        <li><Link to="/customer/get-quote">REQUEST QUOTE</Link></li>
        <li className={location.pathname === "/contact" ? "active" : ""}>
          <Link to="/contact">CONTACT US</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

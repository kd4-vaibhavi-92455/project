import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Process", href: "#process" },
    { name: "Tracking", href: "#tracking" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white py-3 shadow-md" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <span
              className={`text-2xl font-bold transition-colors ${
                isScrolled ? "text-[#0D3B66]" : "text-white"
              }`}
            >
              <img src="/images/logo.png" width="100px" />
              {/* LOGI<span className="text-[#1171BA]">MOVE</span> */}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#1171BA] ${
                  isScrolled ? "text-gray-900" : "text-gray/700"
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* MUI Icon within Tailwind Button */}
            <button className="flex items-center gap-2 bg-[#1171BA] hover:bg-[#0D3B66] text-white px-5 py-2 rounded font-bold transition-all active:scale-95">
              <PhoneIcon sx={{ fontSize: 18 }} />
              Get Quote
            </button>

            <button
              onClick={() => navigate("/customer")}
              className="flex items-center gap-2 text-[#1171BA] hover:text-[#0D3B66] px-5 py-2 rounded border-2 border-[#1171BA] hover:border-[#0D3B66] font-bold transition-all active:scale-95"
            >
              <DashboardIcon sx={{ fontSize: 18 }} />
              Track shipment
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? "text-[#0D3B66]" : "text-white"}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-800 font-medium hover:text-[#1171BA]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-[#0D3B66] text-white py-3 rounded font-bold flex justify-center items-center gap-2">
                Begin Strategy <ChevronRightIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

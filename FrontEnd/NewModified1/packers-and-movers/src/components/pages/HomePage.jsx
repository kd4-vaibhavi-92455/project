import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';

const HomePage = () => {
  // Mock data for services based on ServiceCategory and ServiceType
  const services = [
    {
      id: 1,
      name: 'Home Relocation',
      category: 'HOME',
      description: 'Complete household shifting with professional packing',
      icon: '🏠',
      basePrice: 5000
    },
    {
      id: 2,
      name: 'Office Moving',
      category: 'OFFICE',
      description: 'Corporate relocation with minimal downtime',
      icon: '🏢',
      basePrice: 8000
    },
    {
      id: 3,
      name: 'Vehicle Transportation',
      category: 'VEHICLE',
      description: 'Safe car and bike transportation services',
      icon: '🚗',
      basePrice: 3000
    },
    {
      id: 4,
      name: 'Local Shifting',
      category: 'HOME',
      description: 'Within city moving services',
      icon: '📦',
      basePrice: 2500
    }
  ];

  const whyChooseUs = [
    {
      title: 'Professional Team',
      description: 'Trained and experienced moving professionals',
      icon: '👥'
    },
    {
      title: 'Safe Handling',
      description: 'Secure packing and careful transportation',
      icon: '🛡️'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance',
      icon: '📞'
    },
    {
      title: 'Affordable Rates',
      description: 'Competitive pricing with no hidden costs',
      icon: '💰'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Safe & Reliable Packers and Movers
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your trusted partner for hassle-free relocation services across the country
          </p>
          <Link to="/get-quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105">
            Book Now
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive moving solutions tailored to your specific needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-blue-600 font-bold">Starting from ₹{service.basePrice}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We stand out with our commitment to excellence and customer satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
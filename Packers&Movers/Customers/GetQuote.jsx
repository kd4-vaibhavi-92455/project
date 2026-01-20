import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const GetQuote = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: '',
    pickupCity: '',
    dropCity: '',
    pickupAddress: '',
    dropAddress: '',
    pickupDate: '',
    deliveryDate: '',
    goodsCategory: '',
    approximateWeight: '',
    numberOfItems: '',
    pickupFloor: '',
    dropFloor: '',
    liftAvailable: 'no',
    vehicleType: '',
    laborersRequired: '2',
    packingRequired: 'no',
    unpackingRequired: 'no',
    insuranceRequired: 'no',
    storageRequired: 'no',
    specialHandling: [],
    contactPerson: user?.name || '',
    mobile: user?.mobile || '',
    alternateMobile: '',
    email: user?.email || ''
  });

  const [quote, setQuote] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'specialHandling') {
      setFormData(prev => ({
        ...prev,
        specialHandling: checked 
          ? [...prev.specialHandling, value]
          : prev.specialHandling.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateQuote = () => {
    // Simple quote calculation logic
    let basePrice = 0;
    
    // Service type pricing
    const servicePricing = {
      'household': 5000,
      'office': 8000,
      'vehicle': 3000,
      'warehouse': 2000
    };
    
    basePrice += servicePricing[formData.serviceType] || 0;
    
    // Weight-based pricing
    const weight = parseInt(formData.approximateWeight) || 0;
    basePrice += weight * 10;
    
    // Vehicle type pricing
    const vehiclePricing = {
      'mini': 1000,
      'medium': 2000,
      'large': 3500
    };
    basePrice += vehiclePricing[formData.vehicleType] || 0;
    
    // Additional services
    if (formData.packingRequired === 'yes') basePrice += 1500;
    if (formData.unpackingRequired === 'yes') basePrice += 1000;
    if (formData.insuranceRequired === 'yes') basePrice += 500;
    if (formData.storageRequired === 'yes') basePrice += 2000;
    
    // Laborers cost
    const laborers = parseInt(formData.laborersRequired) || 2;
    basePrice += laborers * 500;
    
    // GST
    const gst = basePrice * 0.18;
    const totalPrice = basePrice + gst;
    
    return {
      basePrice,
      gst,
      totalPrice,
      validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedQuote = calculateQuote();
    
    const quoteData = {
      id: Date.now(),
      customerId: user.email,
      ...formData,
      ...calculatedQuote,
      createdAt: new Date().toISOString()
    };
    
    // Save quote to localStorage
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes.push(quoteData);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    
    setQuote(calculatedQuote);
  };

  const proceedToBooking = () => {
    navigate('/customer/booking', { state: { formData, quote } });
  };

  if (quote) {
    return (
      <>
        <TopBar />
        <Navbar />
        
        <div className="breadcrumb">
          <span>HOME</span> | <span>DASHBOARD</span> | <span className="active">QUOTE RESULT</span>
        </div>

        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card p-4">
                <h4 className="text-warning mb-4">Your Quote</h4>
                
                <div className="row mb-3">
                  <div className="col-6"><strong>Service:</strong> {formData.serviceType}</div>
                  <div className="col-6"><strong>Route:</strong> {formData.pickupCity} → {formData.dropCity}</div>
                </div>
                
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Base Price</td>
                        <td>₹{quote.basePrice}</td>
                      </tr>
                      <tr>
                        <td>GST (18%)</td>
                        <td>₹{quote.gst}</td>
                      </tr>
                      <tr className="table-warning">
                        <td><strong>Total Estimated Price</strong></td>
                        <td><strong>₹{quote.totalPrice}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-muted">Valid till: {quote.validTill}</p>
                
                <div className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={proceedToBooking}>
                    Proceed to Book
                  </button>
                  <button className="btn btn-secondary" onClick={() => setQuote(null)}>
                    Modify Details
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => navigate('/customer/dashboard')}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />
      
      <div className="breadcrumb">
        <span>HOME</span> | <span>DASHBOARD</span> | <span className="active">GET QUOTE</span>
      </div>

      <div className="container my-5">
        <h3 className="mb-4">Get Quote</h3>
        
        <form onSubmit={handleSubmit}>
          {/* Service Details */}
          <div className="card mb-4">
            <div className="card-header bg-warning text-white">
              <h5>Service Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Service Type *</label>
                  <select name="serviceType" className="form-control" value={formData.serviceType} onChange={handleInputChange} required>
                    <option value="">Select Service</option>
                    <option value="household">Household Shifting</option>
                    <option value="office">Office Relocation</option>
                    <option value="vehicle">Vehicle Transportation</option>
                    <option value="warehouse">Warehouse Storage</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pickup Date *</label>
                  <input type="date" name="pickupDate" className="form-control" value={formData.pickupDate} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pickup City *</label>
                  <input type="text" name="pickupCity" className="form-control" value={formData.pickupCity} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Drop City *</label>
                  <input type="text" name="dropCity" className="form-control" value={formData.dropCity} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pickup Address *</label>
                  <textarea name="pickupAddress" className="form-control" rows="2" value={formData.pickupAddress} onChange={handleInputChange} required></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Drop Address *</label>
                  <textarea name="dropAddress" className="form-control" rows="2" value={formData.dropAddress} onChange={handleInputChange} required></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Goods Information */}
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5>Goods Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Goods Category *</label>
                  <select name="goodsCategory" className="form-control" value={formData.goodsCategory} onChange={handleInputChange} required>
                    <option value="">Select Category</option>
                    <option value="furniture">Furniture</option>
                    <option value="electronics">Electronics</option>
                    <option value="fragile">Fragile Items</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="mixed">Mixed Goods</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Approximate Weight (kg) *</label>
                  <input type="number" name="approximateWeight" className="form-control" value={formData.approximateWeight} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Number of Items *</label>
                  <input type="number" name="numberOfItems" className="form-control" value={formData.numberOfItems} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pickup Floor</label>
                  <input type="number" name="pickupFloor" className="form-control" value={formData.pickupFloor} onChange={handleInputChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Drop Floor</label>
                  <input type="number" name="dropFloor" className="form-control" value={formData.dropFloor} onChange={handleInputChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Lift Available</label>
                  <select name="liftAvailable" className="form-control" value={formData.liftAvailable} onChange={handleInputChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle & Manpower */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5>Vehicle & Manpower</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Vehicle Type Required *</label>
                  <select name="vehicleType" className="form-control" value={formData.vehicleType} onChange={handleInputChange} required>
                    <option value="">Select Vehicle</option>
                    <option value="mini">Mini Truck</option>
                    <option value="medium">Medium Truck</option>
                    <option value="large">Large Truck</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Number of Laborers Required</label>
                  <select name="laborersRequired" className="form-control" value={formData.laborersRequired} onChange={handleInputChange}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Packing Required</label>
                  <select name="packingRequired" className="form-control" value={formData.packingRequired} onChange={handleInputChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Unpacking Required</label>
                  <select name="unpackingRequired" className="form-control" value={formData.unpackingRequired} onChange={handleInputChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="card mb-4">
            <div className="card-header bg-secondary text-white">
              <h5>Additional Services</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Insurance Required</label>
                  <select name="insuranceRequired" className="form-control" value={formData.insuranceRequired} onChange={handleInputChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Storage Required</label>
                  <select name="storageRequired" className="form-control" value={formData.storageRequired} onChange={handleInputChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="col-md-12 mb-3">
                  <label>Special Handling Required</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input type="checkbox" name="specialHandling" value="fragile" className="form-check-input" onChange={handleInputChange} />
                      <label className="form-check-label">Fragile</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" name="specialHandling" value="high_value" className="form-check-input" onChange={handleInputChange} />
                      <label className="form-check-label">High Value</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" name="specialHandling" value="oversized" className="form-check-input" onChange={handleInputChange} />
                      <label className="form-check-label">Oversized</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-warning btn-lg px-5">
              Get Quote
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default GetQuote;
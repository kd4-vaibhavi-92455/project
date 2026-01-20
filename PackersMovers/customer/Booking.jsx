import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, quote } = location.state || {};

  const [bookingData, setBookingData] = useState({
    exactPickupDate: '',
    exactPickupTime: '',
    exactDropDate: '',
    exactDropTime: '',
    insuranceConfirmed: false,
    termsAccepted: false,
    paymentMode: 'full',
    paymentMethod: 'upi'
  });

  const [showPayment, setShowPayment] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.termsAccepted) {
      alert('Please accept terms and conditions');
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    const booking = {
      id: 'BK' + Date.now(),
      customerId: user.email,
      customerName: user.name,
      ...formData,
      ...bookingData,
      quote,
      status: 'confirmed',
      paymentStatus: bookingData.paymentMode === 'full' ? 'paid' : 'partial',
      createdAt: new Date().toISOString(),
      driverId: null,
      vehicleId: null
    };

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Generate invoice
    const invoice = {
      id: 'INV' + Date.now(),
      bookingId: booking.id,
      customerId: user.email,
      amount: quote.totalPrice,
      generatedAt: new Date().toISOString()
    };

    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));

    alert('Booking confirmed successfully!');
    navigate('/customer/bookings');
  };

  if (!formData || !quote) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="container my-5 text-center">
          <h4>No quote data found</h4>
          <button className="btn btn-warning" onClick={() => navigate('/customer/get-quote')}>
            Get Quote First
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (showPayment) {
    return (
      <>
        <TopBar />
        <Navbar />
        
        <div className="breadcrumb">
          <span>HOME</span> | <span>DASHBOARD</span> | <span>BOOKING</span> | <span className="active">PAYMENT</span>
        </div>

        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card p-4">
                <h4 className="text-warning mb-4">Payment</h4>
                
                <div className="mb-3">
                  <strong>Booking ID:</strong> BK{Date.now()}
                </div>
                <div className="mb-3">
                  <strong>Amount to Pay:</strong> ₹{
                    bookingData.paymentMode === 'full' ? quote.totalPrice : 
                    bookingData.paymentMode === 'advance' ? Math.round(quote.totalPrice * 0.3) : 0
                  }
                </div>

                <form onSubmit={handlePayment}>
                  <div className="mb-3">
                    <label>Payment Method</label>
                    <select name="paymentMethod" className="form-control" value={bookingData.paymentMethod} onChange={handleInputChange}>
                      <option value="upi">UPI</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="netbanking">Net Banking</option>
                      <option value="wallet">Wallet</option>
                    </select>
                  </div>

                  {bookingData.paymentMethod === 'upi' && (
                    <div className="mb-3">
                      <label>UPI ID</label>
                      <input type="text" className="form-control" placeholder="your-upi@bank" required />
                    </div>
                  )}

                  {bookingData.paymentMethod === 'card' && (
                    <>
                      <div className="mb-3">
                        <label>Card Number</label>
                        <input type="text" className="form-control" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label>Expiry</label>
                          <input type="text" className="form-control" placeholder="MM/YY" required />
                        </div>
                        <div className="col-6 mb-3">
                          <label>CVV</label>
                          <input type="text" className="form-control" placeholder="123" required />
                        </div>
                      </div>
                    </>
                  )}

                  <button type="submit" className="btn btn-success w-100">
                    Pay Now
                  </button>
                </form>
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
        <span>HOME</span> | <span>DASHBOARD</span> | <span className="active">BOOKING</span>
      </div>

      <div className="container my-5">
        <h3 className="mb-4">Confirm Booking</h3>

        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleBookingSubmit}>
              <div className="card mb-4">
                <div className="card-header bg-warning text-white">
                  <h5>Booking Details</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Exact Pickup Date *</label>
                      <input 
                        type="date" 
                        name="exactPickupDate" 
                        className="form-control" 
                        value={bookingData.exactPickupDate} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Pickup Time Slot *</label>
                      <select name="exactPickupTime" className="form-control" value={bookingData.exactPickupTime} onChange={handleInputChange} required>
                        <option value="">Select Time</option>
                        <option value="morning">Morning (8AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                        <option value="evening">Evening (4PM - 8PM)</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Expected Drop Date</label>
                      <input 
                        type="date" 
                        name="exactDropDate" 
                        className="form-control" 
                        value={bookingData.exactDropDate} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Drop Time Slot</label>
                      <select name="exactDropTime" className="form-control" value={bookingData.exactDropTime} onChange={handleInputChange}>
                        <option value="">Select Time</option>
                        <option value="morning">Morning (8AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                        <option value="evening">Evening (4PM - 8PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-check mb-3">
                    <input 
                      type="checkbox" 
                      name="insuranceConfirmed" 
                      className="form-check-input" 
                      checked={bookingData.insuranceConfirmed} 
                      onChange={handleInputChange} 
                    />
                    <label className="form-check-label">
                      I confirm goods insurance coverage
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input 
                      type="checkbox" 
                      name="termsAccepted" 
                      className="form-check-input" 
                      checked={bookingData.termsAccepted} 
                      onChange={handleInputChange} 
                      required
                    />
                    <label className="form-check-label">
                      I accept the terms and conditions *
                    </label>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header bg-info text-white">
                  <h5>Payment Options</h5>
                </div>
                <div className="card-body">
                  <div className="form-check mb-2">
                    <input 
                      type="radio" 
                      name="paymentMode" 
                      value="full" 
                      className="form-check-input" 
                      checked={bookingData.paymentMode === 'full'} 
                      onChange={handleInputChange} 
                    />
                    <label className="form-check-label">
                      Full Payment (₹{quote.totalPrice})
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input 
                      type="radio" 
                      name="paymentMode" 
                      value="advance" 
                      className="form-check-input" 
                      checked={bookingData.paymentMode === 'advance'} 
                      onChange={handleInputChange} 
                    />
                    <label className="form-check-label">
                      Advance Payment (₹{Math.round(quote.totalPrice * 0.3)})
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input 
                      type="radio" 
                      name="paymentMode" 
                      value="later" 
                      className="form-check-input" 
                      checked={bookingData.paymentMode === 'later'} 
                      onChange={handleInputChange} 
                    />
                    <label className="form-check-label">
                      Pay Later (Admin approval required)
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-warning btn-lg">
                Proceed to Payment
              </button>
            </form>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-secondary text-white">
                <h5>Quote Summary</h5>
              </div>
              <div className="card-body">
                <p><strong>Service:</strong> {formData.serviceType}</p>
                <p><strong>Route:</strong> {formData.pickupCity} → {formData.dropCity}</p>
                <p><strong>Vehicle:</strong> {formData.vehicleType}</p>
                <p><strong>Weight:</strong> {formData.approximateWeight} kg</p>
                <hr />
                <p><strong>Base Price:</strong> ₹{quote.basePrice}</p>
                <p><strong>GST:</strong> ₹{quote.gst}</p>
                <p><strong>Total:</strong> ₹{quote.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Booking;
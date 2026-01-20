import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CustomerBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const userBookings = allBookings.filter(b => b.customerId === user?.email);
    setBookings(userBookings);
  }, [user]);

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusBadge = (status) => {
    const statusMap = {
      'confirmed': 'warning',
      'driver_assigned': 'info',
      'picked_up': 'primary',
      'in_transit': 'info',
      'out_for_delivery': 'primary',
      'delivered': 'success',
      'completed': 'success',
      'cancelled': 'danger'
    };
    return statusMap[status] || 'secondary';
  };

  return (
    <>
      <TopBar />
      <Navbar />
      
      <div className="breadcrumb">
        <span>HOME</span> | <span>DASHBOARD</span> | <span className="active">MY BOOKINGS</span>
      </div>

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>My Bookings</h3>
          <Link to="/customer/get-quote" className="btn btn-warning">
            New Booking
          </Link>
        </div>

        {/* Filter */}
        <div className="mb-4">
          <div className="btn-group" role="group">
            <button 
              className={`btn ${filter === 'all' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`btn ${filter === 'confirmed' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed
            </button>
            <button 
              className={`btn ${filter === 'in_transit' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setFilter('in_transit')}
            >
              In Transit
            </button>
            <button 
              className={`btn ${filter === 'completed' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="alert alert-info">
            No bookings found. <Link to="/customer/get-quote">Create your first booking</Link>
          </div>
        ) : (
          <div className="row">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <strong>{booking.id}</strong>
                    <span className={`badge bg-${getStatusBadge(booking.status)}`}>
                      {booking.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="card-body">
                    <p><strong>Service:</strong> {booking.serviceType}</p>
                    <p><strong>From:</strong> {booking.pickupCity}</p>
                    <p><strong>To:</strong> {booking.dropCity}</p>
                    <p><strong>Pickup Date:</strong> {booking.exactPickupDate}</p>
                    <p><strong>Amount:</strong> ₹{booking.quote.totalPrice}</p>
                    <p>
                      <strong>Payment:</strong> 
                      <span className={`badge ms-2 ${booking.paymentStatus === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                        {booking.paymentStatus}
                      </span>
                    </p>
                    
                    <div className="d-flex gap-2 mt-3">
                      <Link to={`/customer/booking/${booking.id}`} className="btn btn-sm btn-primary">
                        View Details
                      </Link>
                      {booking.status === 'in_transit' && (
                        <Link to={`/customer/track/${booking.id}`} className="btn btn-sm btn-info">
                          Track
                        </Link>
                      )}
                      {booking.status === 'completed' && (
                        <button className="btn btn-sm btn-success">
                          Download Invoice
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CustomerBookings;
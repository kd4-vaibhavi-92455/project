import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const userBookings = allBookings.filter(b => b.customerId === user?.email);
    setBookings(userBookings);
  }, [user]);

  const activeBookings = bookings.filter(b => 
    ['confirmed', 'driver_assigned', 'in_transit'].includes(b.status)
  );
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const pendingPayments = bookings.filter(b => b.paymentStatus === 'pending');

  return (
    <>
      <TopBar />
      <Navbar />
      
      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">CUSTOMER DASHBOARD</span>
      </div>

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Welcome, {user?.name}!</h3>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>

        {/* Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center p-3 bg-primary text-white">
              <h4>{activeBookings.length}</h4>
              <p>Active Bookings</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-success text-white">
              <h4>{completedBookings.length}</h4>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-warning text-white">
              <h4>{pendingPayments.length}</h4>
              <p>Pending Payments</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-info text-white">
              <h4>{bookings.length}</h4>
              <p>Total Bookings</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row mb-4">
          <div className="col-md-12">
            <h5>Quick Actions</h5>
            <div className="d-flex gap-3">
              <Link to="/customer/get-quote" className="btn btn-warning">Get Quote</Link>
              <Link to="/customer/bookings" className="btn btn-primary">My Bookings</Link>
              <Link to="/customer/track" className="btn btn-info">Track Shipment</Link>
              <Link to="/customer/profile" className="btn btn-secondary">Profile</Link>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="row">
          <div className="col-md-12">
            <h5>Recent Bookings</h5>
            {bookings.length === 0 ? (
              <p>No bookings yet. <Link to="/customer/get-quote">Get a quote</Link> to start!</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Service</th>
                    <th>Pickup</th>
                    <th>Drop</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.serviceType}</td>
                      <td>{booking.pickupCity}</td>
                      <td>{booking.dropCity}</td>
                      <td>
                        <span className={`badge bg-${
                          booking.status === 'completed' ? 'success' : 
                          booking.status === 'in_transit' ? 'info' : 'warning'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/customer/booking/${booking.id}`} className="btn btn-sm btn-primary">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomerDashboard;
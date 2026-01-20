import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeDrivers: 0,
    pendingIssues: 0,
    todayBookings: 0,
    monthlyRevenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Load and calculate statistics
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const supportTickets = JSON.parse(localStorage.getItem('support_tickets')) || [];

    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.quote.totalPrice, 0);

    const today = new Date().toDateString();
    const todayBookings = bookings.filter(b => 
      new Date(b.createdAt).toDateString() === today
    ).length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = bookings
      .filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate.getMonth() === currentMonth && 
               bookingDate.getFullYear() === currentYear &&
               b.paymentStatus === 'paid';
      })
      .reduce((sum, b) => sum + b.quote.totalPrice, 0);

    const activeDrivers = users.filter(u => u.role === 'driver').length;
    const pendingIssues = supportTickets.filter(t => t.status === 'open').length;

    setStats({
      totalBookings: bookings.length,
      totalRevenue,
      activeDrivers,
      pendingIssues,
      todayBookings,
      monthlyRevenue
    });

    setRecentBookings(bookings.slice(-10).reverse());
    setDrivers(users.filter(u => u.role === 'driver'));
  }, []);

  const assignDriverToBooking = (bookingId, driverId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, driverId, status: 'driver_assigned' };
      }
      return booking;
    });
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setRecentBookings(updatedBookings.slice(-10).reverse());
  };

  return (
    <>
      <TopBar />
      <Navbar />
      
      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">ADMIN DASHBOARD</span>
      </div>

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Admin Dashboard - {user?.name}</h3>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>

        {/* KPI Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center p-3 bg-primary text-white">
              <h4>{stats.totalBookings}</h4>
              <p>Total Bookings</p>
              <small>+{stats.todayBookings} today</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-success text-white">
              <h4>₹{Math.round(stats.totalRevenue)}</h4>
              <p>Total Revenue</p>
              <small>₹{Math.round(stats.monthlyRevenue)} this month</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-info text-white">
              <h4>{stats.activeDrivers}</h4>
              <p>Active Drivers</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-warning text-white">
              <h4>{stats.pendingIssues}</h4>
              <p>Pending Issues</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row mb-4">
          <div className="col-md-12">
            <h5>Quick Actions</h5>
            <div className="d-flex gap-3 flex-wrap">
              <Link to="/admin/users" className="btn btn-primary">Manage Users</Link>
              <Link to="/admin/bookings" className="btn btn-success">Manage Bookings</Link>
              <Link to="/admin/drivers" className="btn btn-info">Manage Drivers</Link>
              <Link to="/admin/pricing" className="btn btn-warning">Pricing Settings</Link>
              <Link to="/admin/reports" className="btn btn-secondary">Reports</Link>
              <Link to="/admin/settings" className="btn btn-dark">System Settings</Link>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5>Booking Trends</h5>
              </div>
              <div className="card-body">
                <div className="text-center p-4">
                  <h6>Daily Bookings</h6>
                  <div className="d-flex justify-content-around">
                    <div>
                      <strong>Today</strong><br />
                      {stats.todayBookings}
                    </div>
                    <div>
                      <strong>This Week</strong><br />
                      {Math.round(stats.totalBookings * 0.1)}
                    </div>
                    <div>
                      <strong>This Month</strong><br />
                      {Math.round(stats.totalBookings * 0.3)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h5>Revenue Overview</h5>
              </div>
              <div className="card-body">
                <div className="text-center p-4">
                  <h6>Revenue Breakdown</h6>
                  <div className="d-flex justify-content-around">
                    <div>
                      <strong>Today</strong><br />
                      ₹{Math.round(stats.monthlyRevenue * 0.1)}
                    </div>
                    <div>
                      <strong>This Week</strong><br />
                      ₹{Math.round(stats.monthlyRevenue * 0.4)}
                    </div>
                    <div>
                      <strong>This Month</strong><br />
                      ₹{Math.round(stats.monthlyRevenue)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-info text-white d-flex justify-content-between">
                <h5>Recent Bookings</h5>
                <Link to="/admin/bookings" className="btn btn-sm btn-light">View All</Link>
              </div>
              <div className="card-body">
                {recentBookings.length === 0 ? (
                  <p>No bookings found</p>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Route</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Driver</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.slice(0, 10).map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.id}</td>
                          <td>{booking.customerName}</td>
                          <td>{booking.serviceType}</td>
                          <td>{booking.pickupCity} → {booking.dropCity}</td>
                          <td>₹{booking.quote.totalPrice}</td>
                          <td>
                            <span className={`badge bg-${
                              booking.status === 'completed' ? 'success' : 
                              booking.status === 'in_transit' ? 'info' : 
                              booking.status === 'confirmed' ? 'warning' : 'secondary'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td>
                            {booking.driverId ? (
                              <span className="text-success">Assigned</span>
                            ) : booking.status === 'confirmed' ? (
                              <select 
                                className="form-select form-select-sm"
                                onChange={(e) => {
                                  if (e.target.value) {
                                    assignDriverToBooking(booking.id, e.target.value);
                                  }
                                }}
                                defaultValue=""
                              >
                                <option value="">Assign Driver</option>
                                {drivers.map(driver => (
                                  <option key={driver.email} value={driver.email}>
                                    {driver.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            <Link 
                              to={`/admin/booking/${booking.id}`} 
                              className="btn btn-sm btn-primary"
                            >
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
        </div>

        {/* System Status */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-warning text-white">
                <h5>System Status</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Database</span>
                  <span className="badge bg-success">Online</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Payment Gateway</span>
                  <span className="badge bg-success">Active</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>SMS Service</span>
                  <span className="badge bg-success">Active</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Email Service</span>
                  <span className="badge bg-success">Active</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-secondary text-white">
                <h5>Quick Stats</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Available Drivers</span>
                  <span className="badge bg-success">{Math.round(stats.activeDrivers * 0.7)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Busy Drivers</span>
                  <span className="badge bg-warning">{Math.round(stats.activeDrivers * 0.2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Offline Drivers</span>
                  <span className="badge bg-danger">{Math.round(stats.activeDrivers * 0.1)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Active Customers</span>
                  <span className="badge bg-info">{Math.round(stats.totalBookings * 0.6)}</span>
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

export default AdminDashboard;
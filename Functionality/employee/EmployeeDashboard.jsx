import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);

  useEffect(() => {
    // Load all bookings
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(allBookings);

    // Load pending document verifications
    const documents = JSON.parse(localStorage.getItem('documents')) || [];
    const pending = documents.filter(doc => doc.status === 'pending');
    setPendingVerifications(pending);

    // Load support tickets
    const tickets = JSON.parse(localStorage.getItem('support_tickets')) || [];
    setSupportTickets(tickets);
  }, []);

  const activeBookings = bookings.filter(b => 
    ['confirmed', 'driver_assigned', 'in_transit'].includes(b.status)
  );
  const openTickets = supportTickets.filter(t => t.status === 'open');

  const assignDriver = (bookingId, driverId) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, driverId, status: 'driver_assigned' };
      }
      return booking;
    });
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const verifyDocument = (docId, status, remarks = '') => {
    const documents = JSON.parse(localStorage.getItem('documents')) || [];
    const updatedDocs = documents.map(doc => {
      if (doc.id === docId) {
        return { 
          ...doc, 
          status, 
          verifiedBy: user.email,
          verifiedAt: new Date().toISOString(),
          remarks 
        };
      }
      return doc;
    });
    localStorage.setItem('documents', JSON.stringify(updatedDocs));
    
    // Refresh pending verifications
    const pending = updatedDocs.filter(doc => doc.status === 'pending');
    setPendingVerifications(pending);
  };

  return (
    <>
      <TopBar />
      <Navbar />
      
      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">EMPLOYEE DASHBOARD</span>
      </div>

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Employee Dashboard - {user?.name}</h3>
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
            <div className="card text-center p-3 bg-warning text-white">
              <h4>{pendingVerifications.length}</h4>
              <p>Pending Verifications</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-danger text-white">
              <h4>{openTickets.length}</h4>
              <p>Open Tickets</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-success text-white">
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
              <Link to="/employee/bookings" className="btn btn-primary">Manage Bookings</Link>
              <Link to="/employee/verifications" className="btn btn-warning">Document Verifications</Link>
              <Link to="/employee/support" className="btn btn-danger">Support Tickets</Link>
              <Link to="/employee/reports" className="btn btn-info">Reports</Link>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-warning text-white">
                <h5>Pending Document Verifications</h5>
              </div>
              <div className="card-body">
                {pendingVerifications.length === 0 ? (
                  <p>No pending verifications</p>
                ) : (
                  <div>
                    {pendingVerifications.slice(0, 5).map(doc => (
                      <div key={doc.id} className="border-bottom pb-2 mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{doc.documentType}</strong>
                            <br />
                            <small>Driver: {doc.driverName}</small>
                          </div>
                          <div>
                            <button 
                              className="btn btn-sm btn-success me-1"
                              onClick={() => verifyDocument(doc.id, 'approved')}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                const remarks = prompt('Rejection reason:');
                                if (remarks) verifyDocument(doc.id, 'rejected', remarks);
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {pendingVerifications.length > 5 && (
                      <Link to="/employee/verifications" className="btn btn-sm btn-outline-warning">
                        View All ({pendingVerifications.length})
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-info text-white">
                <h5>Recent Bookings</h5>
              </div>
              <div className="card-body">
                {bookings.length === 0 ? (
                  <p>No bookings found</p>
                ) : (
                  <div>
                    {bookings.slice(0, 5).map(booking => (
                      <div key={booking.id} className="border-bottom pb-2 mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{booking.id}</strong>
                            <br />
                            <small>{booking.pickupCity} → {booking.dropCity}</small>
                            <br />
                            <span className={`badge bg-${
                              booking.status === 'completed' ? 'success' : 
                              booking.status === 'in_transit' ? 'info' : 'warning'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div>
                            <Link 
                              to={`/employee/booking/${booking.id}`} 
                              className="btn btn-sm btn-primary"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    {bookings.length > 5 && (
                      <Link to="/employee/bookings" className="btn btn-sm btn-outline-info">
                        View All ({bookings.length})
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Support Tickets */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-danger text-white">
                <h5>Recent Support Tickets</h5>
              </div>
              <div className="card-body">
                {supportTickets.length === 0 ? (
                  <p>No support tickets</p>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Category</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportTickets.slice(0, 5).map(ticket => (
                        <tr key={ticket.id}>
                          <td>{ticket.id}</td>
                          <td>{ticket.category}</td>
                          <td>{ticket.customerName}</td>
                          <td>
                            <span className={`badge bg-${
                              ticket.status === 'resolved' ? 'success' : 
                              ticket.status === 'in_progress' ? 'warning' : 'danger'
                            }`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                          <td>
                            <Link 
                              to={`/employee/ticket/${ticket.id}`} 
                              className="btn btn-sm btn-primary"
                            >
                              Handle
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
      </div>

      <Footer />
    </>
  );
};

export default EmployeeDashboard;
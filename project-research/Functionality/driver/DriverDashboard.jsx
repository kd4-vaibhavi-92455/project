import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const DriverDashboard = () => {
  const { user, logout } = useAuth();
  const [availability, setAvailability] = useState('available');
  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const driverJobs = allBookings.filter(b => b.driverId === user?.email);
    setJobs(driverJobs);
    
    const active = driverJobs.find(j => 
      ['driver_assigned', 'picked_up', 'in_transit', 'out_for_delivery'].includes(j.status)
    );
    setActiveJob(active);

    // Load driver availability
    const savedAvailability = localStorage.getItem(`driver_availability_${user?.email}`);
    if (savedAvailability) {
      setAvailability(savedAvailability);
    }
  }, [user]);

  const handleAvailabilityChange = (newStatus) => {
    setAvailability(newStatus);
    localStorage.setItem(`driver_availability_${user?.email}`, newStatus);
  };

  const acceptJob = (jobId) => {
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = allBookings.map(booking => {
      if (booking.id === jobId) {
        return { ...booking, status: 'driver_assigned' };
      }
      return booking;
    });
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    // Refresh jobs
    const driverJobs = updatedBookings.filter(b => b.driverId === user?.email);
    setJobs(driverJobs);
    setActiveJob(driverJobs.find(j => j.id === jobId));
  };

  const rejectJob = (jobId, reason) => {
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = allBookings.map(booking => {
      if (booking.id === jobId) {
        return { ...booking, driverId: null, rejectionReason: reason };
      }
      return booking;
    });
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    // Refresh jobs
    const driverJobs = updatedBookings.filter(b => b.driverId === user?.email);
    setJobs(driverJobs);
  };

  const updateJobStatus = (jobId, newStatus) => {
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = allBookings.map(booking => {
      if (booking.id === jobId) {
        return { 
          ...booking, 
          status: newStatus,
          [`${newStatus}_at`]: new Date().toISOString()
        };
      }
      return booking;
    });
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    // Refresh jobs
    const driverJobs = updatedBookings.filter(b => b.driverId === user?.email);
    setJobs(driverJobs);
    
    if (newStatus === 'completed') {
      setActiveJob(null);
    } else {
      setActiveJob(driverJobs.find(j => j.id === jobId));
    }
  };

  const completedJobs = jobs.filter(j => j.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, job) => sum + (job.driverEarning || job.quote.totalPrice * 0.1), 0);

  return (
    <>
      <TopBar />
      <Navbar />
      
      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">DRIVER DASHBOARD</span>
      </div>

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Welcome, {user?.name}!</h3>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>

        {/* Availability Status */}
        <div className="card mb-4">
          <div className="card-header bg-warning text-white">
            <h5>Availability Status</h5>
          </div>
          <div className="card-body">
            <div className="btn-group" role="group">
              <button 
                className={`btn ${availability === 'available' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => handleAvailabilityChange('available')}
              >
                Available
              </button>
              <button 
                className={`btn ${availability === 'busy' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => handleAvailabilityChange('busy')}
              >
                Busy
              </button>
              <button 
                className={`btn ${availability === 'offline' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => handleAvailabilityChange('offline')}
              >
                Offline
              </button>
            </div>
            <p className="mt-2 mb-0">
              Current Status: <strong className={`text-${
                availability === 'available' ? 'success' : 
                availability === 'busy' ? 'warning' : 'danger'
              }`}>
                {availability.toUpperCase()}
              </strong>
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center p-3 bg-primary text-white">
              <h4>{jobs.length}</h4>
              <p>Total Jobs</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-success text-white">
              <h4>{completedJobs.length}</h4>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-info text-white">
              <h4>₹{Math.round(totalEarnings)}</h4>
              <p>Total Earnings</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 bg-warning text-white">
              <h4>{activeJob ? 1 : 0}</h4>
              <p>Active Jobs</p>
            </div>
          </div>
        </div>

        {/* Active Job */}
        {activeJob && (
          <div className="card mb-4">
            <div className="card-header bg-danger text-white">
              <h5>Active Job</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <p><strong>Booking ID:</strong> {activeJob.id}</p>
                  <p><strong>Customer:</strong> {activeJob.customerName}</p>
                  <p><strong>Service:</strong> {activeJob.serviceType}</p>
                  <p><strong>From:</strong> {activeJob.pickupAddress}, {activeJob.pickupCity}</p>
                  <p><strong>To:</strong> {activeJob.dropAddress}, {activeJob.dropCity}</p>
                  <p><strong>Pickup Date:</strong> {activeJob.exactPickupDate} ({activeJob.exactPickupTime})</p>
                  <p><strong>Contact:</strong> {activeJob.mobile}</p>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-2">
                    {activeJob.status === 'driver_assigned' && (
                      <button 
                        className="btn btn-success"
                        onClick={() => updateJobStatus(activeJob.id, 'picked_up')}
                      >
                        Mark as Picked Up
                      </button>
                    )}
                    {activeJob.status === 'picked_up' && (
                      <button 
                        className="btn btn-info"
                        onClick={() => updateJobStatus(activeJob.id, 'in_transit')}
                      >
                        Start Transit
                      </button>
                    )}
                    {activeJob.status === 'in_transit' && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => updateJobStatus(activeJob.id, 'out_for_delivery')}
                      >
                        Out for Delivery
                      </button>
                    )}
                    {activeJob.status === 'out_for_delivery' && (
                      <button 
                        className="btn btn-success"
                        onClick={() => updateJobStatus(activeJob.id, 'delivered')}
                      >
                        Mark as Delivered
                      </button>
                    )}
                    {activeJob.status === 'delivered' && (
                      <button 
                        className="btn btn-warning"
                        onClick={() => updateJobStatus(activeJob.id, 'completed')}
                      >
                        Complete Job
                      </button>
                    )}
                    <button className="btn btn-outline-primary">
                      Navigate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending Job Assignments */}
        {jobs.filter(j => j.status === 'confirmed' && !j.rejectionReason).length > 0 && (
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5>New Job Assignments</h5>
            </div>
            <div className="card-body">
              {jobs.filter(j => j.status === 'confirmed' && !j.rejectionReason).map(job => (
                <div key={job.id} className="border p-3 mb-3">
                  <div className="row">
                    <div className="col-md-8">
                      <p><strong>Booking ID:</strong> {job.id}</p>
                      <p><strong>Service:</strong> {job.serviceType}</p>
                      <p><strong>Route:</strong> {job.pickupCity} → {job.dropCity}</p>
                      <p><strong>Pickup Date:</strong> {job.exactPickupDate}</p>
                      <p><strong>Amount:</strong> ₹{job.quote.totalPrice}</p>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column gap-2">
                        <button 
                          className="btn btn-success"
                          onClick={() => acceptJob(job.id)}
                        >
                          Accept Job
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => {
                            const reason = prompt('Reason for rejection:');
                            if (reason) rejectJob(job.id, reason);
                          }}
                        >
                          Reject Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Completed Jobs */}
        <div className="card">
          <div className="card-header bg-success text-white">
            <h5>Recent Completed Jobs</h5>
          </div>
          <div className="card-body">
            {completedJobs.length === 0 ? (
              <p>No completed jobs yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Service</th>
                    <th>Route</th>
                    <th>Completed Date</th>
                    <th>Earning</th>
                  </tr>
                </thead>
                <tbody>
                  {completedJobs.slice(0, 5).map(job => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.serviceType}</td>
                      <td>{job.pickupCity} → {job.dropCity}</td>
                      <td>{job.completed_at ? new Date(job.completed_at).toLocaleDateString() : '-'}</td>
                      <td>₹{Math.round(job.driverEarning || job.quote.totalPrice * 0.1)}</td>
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

export default DriverDashboard;
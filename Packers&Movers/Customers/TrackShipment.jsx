import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TrackShipment = () => {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const foundBooking = bookings.find(b => b.id === bookingId);
    
    if (foundBooking && (foundBooking.customerId === user?.email || user?.role === 'admin')) {
      setBooking(foundBooking);
      
      // Generate tracking history based on status
      const history = [];
      const statuses = [
        { status: 'confirmed', label: 'Booking Confirmed', icon: '✅' },
        { status: 'driver_assigned', label: 'Driver Assigned', icon: '👨‍✈️' },
        { status: 'picked_up', label: 'Goods Picked Up', icon: '📦' },
        { status: 'in_transit', label: 'In Transit', icon: '🚛' },
        { status: 'out_for_delivery', label: 'Out for Delivery', icon: '🚚' },
        { status: 'delivered', label: 'Delivered', icon: '✅' },
        { status: 'completed', label: 'Completed', icon: '🎉' }
      ];
      
      const currentStatusIndex = statuses.findIndex(s => s.status === foundBooking.status);
      
      statuses.forEach((statusObj, index) => {
        if (index <= currentStatusIndex) {
          history.push({
            ...statusObj,
            timestamp: foundBooking[`${statusObj.status}_at`] || foundBooking.createdAt,
            completed: true
          });
        } else {
          history.push({
            ...statusObj,
            timestamp: null,
            completed: false
          });
        }
      });
      
      setTrackingHistory(history);
    }
  }, [bookingId, user]);

  if (!booking) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="container my-5 text-center">
          <h4>Booking not found or access denied</h4>
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
        <span>HOME</span> | <span>DASHBOARD</span> | <span className="active">TRACK SHIPMENT</span>
      </div>

      <div className="container my-5">
        <h3 className="mb-4">Track Your Shipment</h3>
        
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-info text-white">
                <h5>Booking Details - {booking.id}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Service:</strong> {booking.serviceType}</p>
                    <p><strong>From:</strong> {booking.pickupAddress}, {booking.pickupCity}</p>
                    <p><strong>To:</strong> {booking.dropAddress}, {booking.dropCity}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Pickup Date:</strong> {booking.exactPickupDate}</p>
                    <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
                    <p><strong>Driver Contact:</strong> {booking.driverId ? '+91 98765 43210' : 'Not assigned'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Location Map Placeholder */}
            {booking.status === 'in_transit' && (
              <div className="card mt-4">
                <div className="card-header bg-success text-white">
                  <h5>Live Location</h5>
                </div>
                <div className="card-body">
                  <div className="bg-light p-5 text-center" style={{minHeight: '300px'}}>
                    <h5>🗺️ Live Map</h5>
                    <p>Driver is currently en route</p>
                    <p><strong>Estimated Arrival:</strong> 2 hours</p>
                    <p><strong>Current Location:</strong> Highway NH-48, Near Gurgaon</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-warning text-white">
                <h5>Tracking Status</h5>
              </div>
              <div className="card-body">
                <div className="timeline">
                  {trackingHistory.map((item, index) => (
                    <div key={index} className={`timeline-item ${item.completed ? 'completed' : 'pending'}`}>
                      <div className="d-flex align-items-center mb-3">
                        <div className={`timeline-icon ${item.completed ? 'bg-success' : 'bg-secondary'}`}>
                          {item.icon}
                        </div>
                        <div className="ms-3">
                          <h6 className={item.completed ? 'text-success' : 'text-muted'}>
                            {item.label}
                          </h6>
                          {item.timestamp && (
                            <small className="text-muted">
                              {new Date(item.timestamp).toLocaleString()}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card mt-4">
              <div className="card-header bg-secondary text-white">
                <h5>Need Help?</h5>
              </div>
              <div className="card-body">
                <p><strong>Customer Support:</strong></p>
                <p>📞 +91 85296 31239</p>
                <p>✉️ support@packersmovers.com</p>
                <button className="btn btn-primary btn-sm w-100">
                  Raise Support Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .timeline-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
        }
        .timeline-item.completed .timeline-icon {
          background-color: #28a745 !important;
        }
        .timeline-item.pending .timeline-icon {
          background-color: #6c757d !important;
        }
      `}</style>
    </>
  );
};

export default TrackShipment;
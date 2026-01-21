import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';

// Public Pages
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';

// Customer Pages
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import GetQuote from '../pages/customer/GetQuote';
import Booking from '../pages/customer/Booking';
import CustomerBookings from '../pages/customer/CustomerBookings';
import TrackShipment from '../pages/customer/TrackShipment';

// Driver Pages
import DriverDashboard from '../pages/driver/DriverDashboard';

// Employee Pages
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          
          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={
            <ProtectedRoute requiredRole="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/customer/get-quote" element={
            <ProtectedRoute requiredRole="customer">
              <GetQuote />
            </ProtectedRoute>
          } />
          <Route path="/customer/booking" element={
            <ProtectedRoute requiredRole="customer">
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/customer/bookings" element={
            <ProtectedRoute requiredRole="customer">
              <CustomerBookings />
            </ProtectedRoute>
          } />
          <Route path="/customer/track/:bookingId" element={
            <ProtectedRoute requiredRole="customer">
              <TrackShipment />
            </ProtectedRoute>
          } />
          
          {/* Driver Routes */}
          <Route path="/driver/dashboard" element={
            <ProtectedRoute requiredRole="driver">
              <DriverDashboard />
            </ProtectedRoute>
          } />
          
          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={
            <div className="container mt-5 text-center">
              <h3>Unauthorized Access</h3>
              <p>You don't have permission to access this page.</p>
              <a href="/login" className="btn btn-primary">Login</a>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

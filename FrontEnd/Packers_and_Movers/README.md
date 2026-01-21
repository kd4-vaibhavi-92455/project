# Packers & Movers Management System

A comprehensive React-based web application for managing packers and movers operations with role-based access control.

## 🚀 Features

### Multi-Role System
- **Customer**: Get quotes, book services, track shipments
- **Driver**: Manage jobs, update status, view earnings
- **Employee**: Handle verifications, support tickets, booking assistance
- **Admin**: Complete system control, user management, pricing, reports

### Core Modules
1. **Authentication & Authorization**
   - Role-based login system
   - Protected routes
   - Session management

2. **Customer Module**
   - Dashboard with booking summary
   - Get Quote with detailed form
   - Booking confirmation with payment
   - Real-time shipment tracking
   - Booking history

3. **Driver Module**
   - Availability management
   - Job assignment acceptance/rejection
   - Status updates (pickup, transit, delivery)
   - Earnings tracking

4. **Employee Module**
   - Document verification
   - Support ticket management
   - Booking assistance
   - Internal operations

5. **Admin Module**
   - User management
   - Driver assignment
   - Pricing configuration
   - System analytics
   - Reports and monitoring

## 🛠️ Technology Stack

- **Frontend**: React 19.2.0
- **Routing**: React Router DOM 7.11.0
- **Styling**: Bootstrap 5.3.8
- **State Management**: React Context API
- **Storage**: LocalStorage (for demo purposes)
- **Build Tool**: Vite 7.2.4

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PackersMovers/Packers_and_Movers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔐 Test Credentials

The application comes with pre-loaded sample data for testing:

| Role | Email | Password |
|------|-------|----------|
| Customer | customer@test.com | password123 |
| Driver | driver@test.com | password123 |
| Employee | employee@test.com | password123 |
| Admin | admin@test.com | password123 |

## 📱 Application Flow

### Customer Journey
1. **Registration/Login** → Select "Customer" role
2. **Dashboard** → View booking summary and quick actions
3. **Get Quote** → Fill detailed form with service requirements
4. **Booking** → Confirm details and make payment
5. **Tracking** → Real-time shipment status updates
6. **History** → View past bookings and download invoices

### Driver Journey
1. **Login** → Select "Driver" role
2. **Dashboard** → Set availability status
3. **Job Assignment** → Accept/reject assigned jobs
4. **Execution** → Update status through pickup → transit → delivery
5. **Completion** → Mark job complete and view earnings

### Employee Journey
1. **Login** → Select "Employee" role
2. **Dashboard** → View pending tasks and tickets
3. **Verification** → Approve/reject driver documents
4. **Support** → Handle customer complaints and issues
5. **Assistance** → Help with bookings and operations

### Admin Journey
1. **Login** → Select "Admin" role
2. **Dashboard** → System overview and KPIs
3. **Management** → Users, drivers, pricing, services
4. **Assignment** → Assign drivers to bookings
5. **Monitoring** → Reports, analytics, system status

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── TopBar.jsx
│   └── Footer.jsx
├── context/            # React Context for state management
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── customer/       # Customer module pages
│   ├── driver/         # Driver module pages
│   ├── employee/       # Employee module pages
│   ├── admin/          # Admin module pages
│   ├── HomePage.jsx
│   ├── UserLogin.jsx
│   └── UserRegister.jsx
├── utils/              # Utility functions and components
│   ├── ProtectedRoute.jsx
│   └── sampleData.js
├── App.jsx             # Main app component with routing
├── App.css             # Global styles
└── main.jsx            # Application entry point
```

## 🎯 Key Features Implemented

### Authentication System
- Multi-role login with role selection
- Protected routes based on user roles
- Session persistence with localStorage
- Automatic redirection based on role

### Quote & Booking System
- Comprehensive quote form with all service details
- Dynamic price calculation
- Payment integration simulation
- Booking confirmation with invoice generation

### Real-time Tracking
- Status-based tracking timeline
- Live location simulation
- Driver contact information
- Support ticket integration

### Role-based Dashboards
- Customized dashboards for each role
- Role-specific navigation and actions
- Summary cards with relevant metrics
- Quick action buttons

### Data Management
- LocalStorage-based data persistence
- Sample data initialization
- CRUD operations for all entities
- Data relationships maintained

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file for production configurations:
```
VITE_API_BASE_URL=your_api_url
VITE_PAYMENT_GATEWAY_KEY=your_payment_key
VITE_MAPS_API_KEY=your_maps_key
```

### Database Integration
For production, replace localStorage with actual database:
1. Set up backend API (Node.js/Express recommended)
2. Replace localStorage calls with API calls
3. Implement proper authentication with JWT
4. Add real payment gateway integration

## 📋 Future Enhancements

### Phase 2 Features
- [ ] Real-time GPS tracking
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] WhatsApp integration
- [ ] Document upload with file storage
- [ ] Advanced search and filters
- [ ] Bulk operations
- [ ] API rate limiting

### Technical Improvements
- [ ] Backend API development
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real payment gateway integration
- [ ] Email/SMS service integration
- [ ] File upload and storage
- [ ] Advanced security measures
- [ ] Performance optimization
- [ ] Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and queries:
- Email: support@packersmovers.com
- Phone: +91 85296 31239

## 🎓 Academic Project

This project is designed as a comprehensive academic project covering:
- Full-stack web development concepts
- Role-based access control
- State management
- Component architecture
- User experience design
- Business logic implementation

Perfect for computer science students and web development learning!
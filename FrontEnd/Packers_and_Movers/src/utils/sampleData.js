// Sample data initialization for testing
export const initializeSampleData = () => {
  // Check if data already exists
  if (localStorage.getItem('sampleDataInitialized')) {
    return;
  }

  // Sample Users
  const sampleUsers = [
    {
      name: 'John Customer',
      email: 'customer@test.com',
      mobile: '9876543210',
      password: 'password123',
      role: 'customer'
    },
    {
      name: 'Mike Driver',
      email: 'driver@test.com',
      mobile: '9876543211',
      password: 'password123',
      role: 'driver'
    },
    {
      name: 'Sarah Employee',
      email: 'employee@test.com',
      mobile: '9876543212',
      password: 'password123',
      role: 'employee'
    },
    {
      name: 'Admin User',
      email: 'admin@test.com',
      mobile: '9876543213',
      password: 'password123',
      role: 'admin'
    }
  ];

  // Sample Bookings
  const sampleBookings = [
    {
      id: 'BK1001',
      customerId: 'customer@test.com',
      customerName: 'John Customer',
      serviceType: 'household',
      pickupCity: 'Delhi',
      dropCity: 'Mumbai',
      pickupAddress: '123 Main Street, Connaught Place',
      dropAddress: '456 Park Avenue, Bandra',
      exactPickupDate: '2024-01-15',
      exactPickupTime: 'morning',
      goodsCategory: 'furniture',
      approximateWeight: '500',
      vehicleType: 'medium',
      quote: {
        basePrice: 8000,
        gst: 1440,
        totalPrice: 9440
      },
      status: 'in_transit',
      paymentStatus: 'paid',
      driverId: 'driver@test.com',
      createdAt: '2024-01-10T10:00:00Z',
      picked_up_at: '2024-01-15T08:00:00Z',
      in_transit_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'BK1002',
      customerId: 'customer@test.com',
      customerName: 'John Customer',
      serviceType: 'office',
      pickupCity: 'Bangalore',
      dropCity: 'Chennai',
      pickupAddress: 'Tech Park, Whitefield',
      dropAddress: 'IT Corridor, OMR',
      exactPickupDate: '2024-01-20',
      exactPickupTime: 'afternoon',
      goodsCategory: 'electronics',
      approximateWeight: '300',
      vehicleType: 'large',
      quote: {
        basePrice: 12000,
        gst: 2160,
        totalPrice: 14160
      },
      status: 'confirmed',
      paymentStatus: 'paid',
      driverId: null,
      createdAt: '2024-01-12T14:30:00Z'
    }
  ];

  // Sample Support Tickets
  const sampleTickets = [
    {
      id: 'TK001',
      customerId: 'customer@test.com',
      customerName: 'John Customer',
      category: 'delay_complaint',
      description: 'My shipment is delayed by 2 days',
      status: 'open',
      createdAt: '2024-01-14T09:00:00Z'
    }
  ];

  // Sample Documents
  const sampleDocuments = [
    {
      id: 'DOC001',
      driverId: 'driver@test.com',
      driverName: 'Mike Driver',
      documentType: 'Driving License',
      status: 'pending',
      uploadedAt: '2024-01-10T12:00:00Z'
    }
  ];

  // Save to localStorage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const mergedUsers = [...existingUsers, ...sampleUsers];
  localStorage.setItem('users', JSON.stringify(mergedUsers));
  
  localStorage.setItem('bookings', JSON.stringify(sampleBookings));
  localStorage.setItem('support_tickets', JSON.stringify(sampleTickets));
  localStorage.setItem('documents', JSON.stringify(sampleDocuments));
  
  // Mark as initialized
  localStorage.setItem('sampleDataInitialized', 'true');
  
  console.log('Sample data initialized successfully!');
  console.log('Test Credentials:');
  console.log('Customer: customer@test.com / password123');
  console.log('Driver: driver@test.com / password123');
  console.log('Employee: employee@test.com / password123');
  console.log('Admin: admin@test.com / password123');
};
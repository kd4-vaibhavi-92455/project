-- ----------------------------------------------------
-- 1. USER MANAGEMENT MODULE
-- ----------------------------------------------------

-- Insert Roles (IDs 1-4)
INSERT INTO Role (role_name, description) VALUES
('Admin', 'System Administrator with full access'),
('Staff', 'Operational Employee/Customer Support'),
('Customer', 'Registered end-user of the service'),
('Driver', 'Vehicle operator and delivery personnel');

-- Insert 5 People (Placeholder password_hash is 'hashed_password_...')
INSERT INTO Person (first_name, last_name, email, phone_number, password_hash, gender, dob) VALUES
('Maya', 'Singh', 'maya.admin@logistics.com', '9876543210', 'hashed_password_admin1', 'Female', '1990-05-15'),  -- ID 1 (Admin)
('Ravi', 'Kumar', 'ravi.staff@logistics.com', '9988776655', 'hashed_password_staff2', 'Male', '1995-11-20'),   -- ID 2 (Employee/Staff)
('Anil', 'Verma', 'anil.verma@customer.com', '9000111000', 'hashed_password_cust3', 'Male', '1985-03-01'),      -- ID 3 (Customer 1)
('Priya', 'Sharma', 'priya.sharma@driver.com', '9000222000', 'hashed_password_driver4', 'Female', '1992-07-25'),  -- ID 4 (Driver 1)
('Amit', 'Joshi', 'amit.manager@logistics.com', '9000333000', 'hashed_password_manager5', 'Male', '1980-01-05'); -- ID 5 (Branch Manager)

-- ----------------------------------------------------
-- 2. ADDRESS MANAGEMENT MODULE
-- ----------------------------------------------------

-- Insert States (ID 1)
INSERT INTO STATE (state_name) VALUES
('Maharashtra');

-- Insert Cities (ID 1-2)
INSERT INTO CITY (state_id, city_name) VALUES
(1, 'Mumbai'), -- ID 1
(1, 'Pune');   -- ID 2

-- Insert Addresses (IDs 1-4)
INSERT INTO ADDRESS (person_id, city_id, address_line, landmark, pincode, latitude, longitude) VALUES
(1, 1, '101 Admin Tower, Andheri East', 'Near International Airport', '400099', 19.1171, 72.8465), -- ID 1 (Admin/Branch Address)
(3, 1, 'B-405, Sea Breeze Apt, Juhu', 'Opposite Silver Beach', '400049', 19.1065, 72.8250),     -- ID 2 (Customer 1 Pickup Address)
(3, 2, 'House 22, Green Acres Society', 'Near Pune-Mumbai Highway', '411007', 18.5204, 73.8567), -- ID 3 (Customer 1 Drop Address)
(4, 1, '5th Floor, Driver Complex, Vile Parle', 'Beside Railway Station', '400056', 19.0991, 72.8415); -- ID 4 (Driver 1 Address)

-- ----------------------------------------------------
-- 3. SERVICE & QUOTATION MODULE (Service Types must be first)
-- ----------------------------------------------------

-- Insert Service Types (IDs 1-3)
INSERT INTO SERVICE_TYPE (name, base_price, per_km_rate, estimated_duration, description) VALUES
('Local City Move (4-wheeler)', 500.00, 15.00, '3 hours', 'Same city small furniture/goods transport'), -- ID 1
('Inter-City Move (Heavy)', 3000.00, 35.00, '24 hours', 'Long distance heavy goods transport'),        -- ID 2
('2-Wheeler Parcel Delivery', 50.00, 8.00, '30 mins', 'Small document/parcel delivery');             -- ID 3


-- ----------------------------------------------------
-- 4. VEHICLE MANAGEMENT MODULE
-- ----------------------------------------------------

-- Insert 2 Vehicles (IDs 1-2). current_driver_id is temporarily NULL or linked to a placeholder
INSERT INTO VEHICLE (registration_number, vehicle_type, capacity, insurance_number, rc_valid_till, current_driver_id, driver_id, location, notes) VALUES
('MH01AB1234', 'Heavy Vehicle', 10.00, 'INS987654321', '2026-10-01', NULL, NULL, 'Mumbai Yard A', '10-ton Truck. Needs service soon.'), -- ID 1
('MH12CD5678', '4-wheeler', 2.00, 'INS112233445', '2027-04-15', NULL, NULL, 'Pune Hub', 'Small Tempo for city deliveries.');        -- ID 2


-- ----------------------------------------------------
-- 5. DRIVER MANAGEMENT MODULE
-- ----------------------------------------------------

-- Insert 1 Driver (ID 1, linked to Vehicle ID 1)
INSERT INTO DRIVER (first_name, last_name, email, phone_number, password_hash, dob, gender, license_number, vehicle_type, license_validity, vehicle_assigned, availability_status) VALUES
('Priya', 'Sharma', 'priya.sharma@driver.com', '9000222000', 'hashed_password_driver4', '1992-07-25', 'Female', 'DL99XYZ12345', 'Heavy Vehicle', '2028-09-01', 1, 'available'); -- ID 1

-- Update VEHICLE table to link current_driver_id
UPDATE VEHICLE SET current_driver_id = 1 WHERE vehicle_id = 1;


-- ----------------------------------------------------
-- 6. EMPLOYEE MANAGEMENT MODULE
-- ----------------------------------------------------

-- Insert 2 Employees (IDs 1-2). user_id links to Person
INSERT INTO EMPLOYEE (first_name, last_name, email, phone, address, hire_date, status, role_id, user_id) VALUES
('Ravi', 'Kumar', 'ravi.staff@logistics.com', '9988776655', 'Vashi Staff Quarters', '2022-08-01', 'active', 2, 2), -- ID 1 (Ravi, Staff)
('Amit', 'Joshi', 'amit.manager@logistics.com', '9000333000', 'Dadar Office Residence', '2019-01-20', 'active', 1, 5); -- ID 2 (Amit, Admin/Manager)

-- ----------------------------------------------------
-- 7. SERVICE & QUOTATION MODULE (Part 2)
-- ----------------------------------------------------

-- Insert 1 Quotation (ID 1). User ID 3 (Anil), Service ID 2 (Inter-City Move). Dist: 150km.
INSERT INTO QUOTATION (user_id, service_id, pickup_address_id, drop_address_id, total_distance_km, base_amount, tax_amount, discount_amount, final_amount, valid_till, status) VALUES
(3, 2, 2, 3, 150.00, 8250.00, 1485.00, 500.00, 9235.00, '2025-11-01 23:59:59', 'accepted'); -- ID 1

-- Insert Quote Communication
INSERT INTO QUOTE_COMMUNICATION (quotation_id, sent_via) VALUES
(1, 'email'),
(1, 'app');


-- ----------------------------------------------------
-- 8. BOOKING & GOODS MGMT. MODULE
-- ----------------------------------------------------

-- Insert 1 Booking (ID 1). Links to Quote 1, Driver 1, Vehicle 1.
INSERT INTO BOOKING (user_id, quotation_id, driver_id, vehicle_id, pickup_date, delivery_date, status, tracking_number, payment_status) VALUES
(3, 1, 1, 1, '2025-10-25 10:00:00', '2025-10-26 14:00:00', 'confirmed', 'LTK-MH1-1025-A', 'paid'); -- ID 1

-- Insert Goods for Booking ID 1 (IDs 1-2)
INSERT INTO GOODS (booking_id, item_name, quantity, weight, type, insurance_value, packing_required) VALUES
(1, 'Sofa Set', 1, 150.00, 'furniture', 25000.00, TRUE), -- ID 1
(1, 'Television 55"', 1, 25.50, 'electronics', 50000.00, TRUE); -- ID 2


-- ----------------------------------------------------
-- 9. PAYMENT & REWARDS MODULE
-- ----------------------------------------------------

-- Insert 1 Payment for Booking ID 1 (ID 1)
INSERT INTO PAYMENT (booking_id, payment_method, amount_paid, transaction_id, payment_status) VALUES
(1, 'UPI', 9235.00, 'UPI1234567890ABC', 'success'); -- ID 1

-- Insert a Reward Coupon (ID 1)
INSERT INTO DISCOUNT_COUPONS (code, description, discount_percent, valid_from, valid_to) VALUES
('DIWALI20', '20% off on Inter-City Moves', 20.00, '2025-10-01 00:00:00', '2025-11-30 23:59:59');

-- Insert initial Reward Points for Customer Anil (Person ID 3)
INSERT INTO REWARD_POINTS (user_id, earned_points, used_points, current_balance) VALUES
(3, 500, 0, 500);


-- ----------------------------------------------------
-- 10. TRACKING & DELIVERY MODULE
-- ----------------------------------------------------

-- Insert Tracking Record for Booking ID 1 (ID 1)
INSERT INTO TRACKING (booking_id, current_location, status, updated_at) VALUES
(1, 'Near Lonavala Toll Plaza', 'in_transit', NOW()); -- ID 1

-- Insert Location History for Tracking ID 1 (IDs 1-2)
INSERT INTO LOCATION_HISTORY (tracking_id, latitude, longitude, recorded_time) VALUES
(1, 19.106500, 72.825000, '2025-10-25 10:00:00'), -- Pickup time
(1, 18.756200, 73.408200, '2025-10-25 13:00:00'); -- Current location (Lonavala)

-- Insert Delivery Proof (Simulation of a completed delivery)
/* To simulate a delivered booking, you would update BOOKING.status to 'delivered' and then insert delivery proof.
   For this script, we assume the current data represents a shipment still in transit. */
-- INSERT INTO DELIVERY_PROOF (booking_id, photo_url, signature_url, received_by, submitted_at) VALUES
-- (1, 's3://proof/booking1_photo.jpg', 's3://proof/booking1_sign.png', 'Ramesh A.', '2025-10-26 14:05:00');

-- ----------------------------------------------------
-- 11. BRANCH MANAGEMENT MODULE
-- ----------------------------------------------------

-- Insert 1 Branch (ID 1). Manager ID 5 (Amit Joshi), City ID 1 (Mumbai)
INSERT INTO BRANCH (branch_name, manager_id, city_id, contact_number, email, established_on) VALUES
('Mumbai Central Hub', 5, 1, '02228889999', 'mumbai.hub@logistics.com', '2018-04-01'); -- ID 1

-- Assign Employee 1 (Ravi) to Branch 1
INSERT INTO BRANCH_EMPLOYEE (branch_id, employee_id, assigned_role) VALUES
(1, 2, 'Operations Executive');


-- ----------------------------------------------------
-- 12. COMMUNICATION & NOTIFICATION
-- ----------------------------------------------------

-- Insert Notifications (Receiver ID 3 is Customer Anil, ID 1 is Admin Maya)
INSERT INTO NOTIFICATION (receiver_id, title, message, sent_via, status) VALUES
(3, 'Booking Confirmed!', 'Your inter-city move (LTK-MH1-1025-A) has been confirmed.', 'app', 'read'),
(1, 'New Support Ticket Raised', 'Customer Anil Verma raised a ticket about a quote query.', 'email', 'delivered');

-- Insert 1 Support Ticket (ID 1). User ID 3 (Anil), Assigned to Employee ID 2 (Ravi)
INSERT INTO SUPPORT_TICKET (user_id, issue_type, issue_description, assigned_employee_id, status) VALUES
(3, 'Quotation Discount Error', 'The 20% discount coupon did not apply to the quote total.', 2, 'in_progress');


-- ----------------------------------------------------
-- 13. DOCUMENTS & VERIFICATION MODULE
-- ----------------------------------------------------

-- Insert Driver Documents for Driver ID 1 (Priya Sharma). Verified by Admin ID 1 (Maya)
INSERT INTO DRIVER_DOCUMENTS (driver_id, doc_type, doc_number, file_url, verified_status, verified_by) VALUES
(1, 'DL', 'DL99XYZ12345', 's3://driver/priya/dl.pdf', 'verified', 1),
(1, 'RC', 'MH01AB1234', 's3://driver/priya/rc.pdf', 'verified', 1);

-- Insert Driver Assignment (Driver ID 1 assigned to Booking ID 1, Vehicle ID 1)
INSERT INTO DRIVER_ASSIGNMENT (driver_id, booking_id, vehicle_id, assigned_from, status) VALUES
(1, 1, 1, NOW(), 'in_progress');


-- ----------------------------------------------------
-- 14. AUTHENTICATION & SECURITY MODUL
-- ----------------------------------------------------

-- Insert a Login Token for Admin Maya (Person ID 1)
INSERT INTO LOGIN_TOKENS (person_id, jwt_token, expiry_time, device_info, is_active) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', DATE_ADD(NOW(), INTERVAL 1 DAY), 'Chrome on Windows 10', TRUE);

-- Insert an OTP Record (A customer trying to log in)
INSERT INTO OTP_RECORDS (phone_email, otp_code, generated_at, expiry_time, verified) VALUES
('anil.verma@customer.com', '543210', NOW(), DATE_ADD(NOW(), INTERVAL 5 MINUTE), FALSE);

-- Insert an Audit Log entry (Admin logged in)
INSERT INTO AUDIT_LOG (person_id, action_type, action_description, ip_address, user_agent) VALUES
(1, 'LOGIN_SUCCESS', 'Admin Maya Singh logged into the system.', '103.20.10.1', 'Mozilla/5.0');


-- ----------------------------------------------------
-- 15. ADMIN CONTROL MODULE
-- ----------------------------------------------------

-- Insert Settings
INSERT INTO SETTINGS (key_name, key_value) VALUES
('GLOBAL_TAX_RATE_PERCENT', '18.00'),
('MINIMUM_BOOKING_AMOUNT', '1000.00');

-- Insert a Report Record (Generated by Admin ID 1)
INSERT INTO REPORTS (report_type, generated_by, file_url) VALUES
('monthly', 1, 's3://reports/2025/10/monthly_performance.csv');


-- ----------------------------------------------------
-- 16. EMPLOYEE MANAGEMENT MODULE (Part 2)
-- ----------------------------------------------------

-- Insert 1 Employee Assignment (ID 1). Employee ID 1 (Ravi) assigned to a generic Customer Request ID (using a placeholder value 1001)
INSERT INTO EMPLYEE_ASSIGNMENT (employee_id, customer_request_id, assigned_date, status) VALUES
(1, 1001, NOW(), 'in-progress');

-- Insert 1 Employee Payment for Employee 1 (Ravi)
INSERT INTO EMPLOYEE_PAYMENT (employee_id, amount, payment_type, payment_date) VALUES
(1, 45000.00, 'salary', '2025-10-01');


-- ----------------------------------------------------
-- 17. VEHICLE MANAGEMENT MODULE (Part 2)
-- ----------------------------------------------------

-- Insert Vehicle Maintenance for Vehicle 1
INSERT INTO VEHICLE_MAINTAINANCE (vehicle_id, service_date, service_details, cost, next_due_date) VALUES
(1, '2025-08-10', 'Engine oil and filter change, tire rotation.', 8500.00, '2026-02-10');
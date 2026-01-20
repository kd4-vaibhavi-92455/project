-- 1. USER MANAGEMENT MODULE (Foundational)
-- ----------------------------------------------------
create TABLE Person (
    person_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    gender ENUM('Male','Female','Other'),
    dob DATE NOT NULL,
    status ENUM('active','inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (dob IS NOT NULL) -- Equivalent for "CHECK (age > 18)" in app logic
);

CREATE TABLE Role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL,
    description TEXT
);
-- ----------------------------------------------------
-- 2. ADDRESS MANAGEMENT MODULE (Foundational)
CREATE TABLE STATE (
    state_id INT PRIMARY KEY AUTO_INCREMENT,
    state_name VARCHAR(100)
);

CREATE TABLE CITY (
    city_id INT PRIMARY KEY AUTO_INCREMENT,
    state_id INT,
    city_name VARCHAR(100),
    FOREIGN KEY (state_id) REFERENCES STATE(state_id) ON DELETE CASCADE
);

CREATE TABLE ADDRESS (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
   person_id INT,
    city_id INT,
    address_line VARCHAR(255),
    landmark VARCHAR(255),
    pincode VARCHAR(20),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    FOREIGN KEY (person_id) REFERENCES Person(person_id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES CITY(city_id) ON DELETE CASCADE
);
________________________________________
2. CORE MANAGEMENT MODULES
These modules define the main entities: Drivers, Employees, and Vehicles.
-- ----------------------------------------------------
-- 3. EMPLOYEE MANAGEMENT MODULE
-- ----------------------------------------------------
CREATE TABLE EMPLOYEE (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    hire_date DATE,
    status ENUM('active','inactive'),
    role_id INT,
    user_id INT,
    FOREIGN KEY (role_id) REFERENCES Role(role_id) ON DELETE SET NULL, -- Assuming Role exists
    FOREIGN KEY (user_id) REFERENCES Person(person_id) ON DELETE SET NULL -- Assuming Person is the user account table
);

CREATE TABLE EMPLYEE_ASSIGNMENT (
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    customer_request_id INT,
    assigned_date DATETIME,
    status ENUM('pending','in-progress','completed'),
    FOREIGN KEY (employee_id) REFERENCES EMPLOYEE(employee_id) ON DELETE CASCADE
    -- customer_request_id FK is unresolvable without table name
);

CREATE TABLE EMPLOYEE_PAYMENT (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    amount DECIMAL(10,2),
    payment_type ENUM('salary','commission','bonus'),
    payment_date DATE,
    remarks VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES EMPLOYEE(employee_id) ON DELETE CASCADE
);


-- ----------------------------------------------------
-- 4. VEHICLE MANAGEMENT MODULE
-- ----------------------------------------------------

CREATE TABLE VEHICLE (
    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
    driver_id INT, -- Old/Primary assigned driver (as a user)
    registration_number VARCHAR(50),
    vehicle_type VARCHAR(50),
    capacity DECIMAL(10,2),
    insurance_number VARCHAR(100),
    rc_valid_till DATE,
    status ENUM('available','in_transit','maintenance','reserved') DEFAULT 'available',
    current_driver_id INT, -- Current driver ID (from DRIVER table below)
    location VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (driver_id) REFERENCES Person(person_id) ON DELETE SET NULL
    -- current_driver_id FK is referenced later after DRIVER table creation
);

CREATE TABLE VEHICLE_MAINTAINANCE (
    maintenance_id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_id INT,
    service_date DATE,
    service_details TEXT,
    cost DECIMAL(10,2),
    next_due_date DATE,
    FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id) ON DELETE CASCADE
);
-- ----------------------------------------------------
-- 5. DRIVER MANAGEMENT MODULE
CREATE TABLE DRIVER (
    driver_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    dob DATE,
    gender ENUM('Male','Female','Other'),
    license_number VARCHAR(50) UNIQUE NOT NULL,
    vehicle_type ENUM('2-wheeler','3-wheeler','4-wheeler','Heavy Vehicle') NOT NULL,
    license_validity DATE NOT NULL,
    vehicle_assigned INT, -- FK to VEHICLE
    availability_status ENUM('available','on_trip','off_duty') DEFAULT 'available',
    status ENUM('active','inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_assigned) REFERENCES VEHICLE(vehicle_id) ON DELETE SET NULL
);

-- ADD MISSING FK TO VEHICLE TABLE (FOR current_driver_id)
-- ALTER TABLE VEHICLE ADD CONSTRAINT fk_current_driver FOREIGN KEY (current_driver_id) REFERENCES DRIVER(driver_id) ON DELETE SET NULL;

3. QUOTATION & BOOKING MODULES
These modules manage service requests and subsequent confirmed bookings.
-- ----------------------------------------------------
-- 6. SERVICE & QUOTATION MODULE
CREATE TABLE SERVICE_TYPE (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    base_price DECIMAL(10,2) NOT NULL,
    per_km_rate DECIMAL(10,2) NOT NULL,
    estimated_duration VARCHAR(50),
    description VARCHAR(255)
);

CREATE TABLE QUOTATION (
    quotation_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    service_id INT,
    pickup_address_id INT,
    drop_address_id INT,
    total_distance_km DECIMAL(8,2),
    base_amount DECIMAL(10,2),
    tax_amount DECIMAL(10,2),
    discount_amount DECIMAL(10,2),
    final_amount DECIMAL(10,2),
    quotation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    valid_till DATETIME,
    status ENUM('pending','sent','accepted','expired') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES Person(person_id),
    FOREIGN KEY (service_id) REFERENCES SERVICE_TYPE(service_id),
    FOREIGN KEY (pickup_address_id) REFERENCES ADDRESS(address_id),
    FOREIGN KEY (drop_address_id) REFERENCES ADDRESS(address_id)
);

CREATE TABLE QUOTE_COMMUNICATION (
    comm_id INT PRIMARY KEY AUTO_INCREMENT,
    quotation_id INT,
    sent_via ENUM('email','sms','whatsapp','app'),
    FOREIGN KEY (quotation_id) REFERENCES QUOTATION(quotation_id) ON DELETE CASCADE
);
-- ----------------------------------------------------
-- 7. BOOKING & GOODS MGMT. MODULE
CREATE TABLE BOOKING (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    quotation_id INT,
    driver_id INT,
    vehicle_id INT,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    pickup_date DATETIME,
    delivery_date DATETIME,
    status ENUM('confirmed','in_transit','delivered','cancelled') DEFAULT 'confirmed',
    tracking_number VARCHAR(50) UNIQUE,
    payment_status ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES Person(person_id),
    FOREIGN KEY (quotation_id) REFERENCES QUOTATION(quotation_id) ON DELETE SET NULL,
    FOREIGN KEY (driver_id) REFERENCES DRIVER(driver_id) ON DELETE SET NULL,
    FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id) ON DELETE SET NULL
);

CREATE TABLE GOODS (
    goods_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    weight DECIMAL(8,2),
    type ENUM('fragile','furniture','electronics','others') DEFAULT 'others',
    insurance_value DECIMAL(10,2),
    packing_required BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (booking_id) REFERENCES BOOKING(booking_id) ON DELETE CASCADE
);
4. TRANSACTIONAL AND SUPPORT MODULES
These modules handle post-booking activities like payments, tracking, and support.
-- ----------------------------------------------------
-- 8. PAYMENT & REWARDS MODULE
CREATE TABLE PAYMENT (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    payment_method ENUM('UPI','Card','Cash') NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount_paid DECIMAL(10,2) NOT NULL,
    transaction_id VARCHAR(50) UNIQUE,
    payment_status ENUM('success','failed','refund_initiated') DEFAULT 'success',
    FOREIGN KEY (booking_id) REFERENCES BOOKING(booking_id)
);

CREATE TABLE REWARD_POINTS (
    reward_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    earned_points INT DEFAULT 0,
    used_points INT DEFAULT 0,
    current_balance INT DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Person(person_id)
);

CREATE TABLE DISCOUNT_COUPONS (
    coupon_id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    discount_percent DECIMAL(5,2) NOT NULL,
    valid_from DATETIME NOT NULL,
    valid_to DATETIME NOT NULL
);
-- ----------------------------------------------------
-- 9. TRACKING & DELIVERY MODULE
CREATE TABLE TRACKING (
    tracking_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    current_location VARCHAR(255),
    status ENUM('pickup_done','in_transit','delayed','delivered') DEFAULT 'pickup_done',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES BOOKING(booking_id) ON DELETE CASCADE
);

CREATE TABLE LOCATION_HISTORY (
    history_id INT PRIMARY KEY AUTO_INCREMENT,
    tracking_id INT,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    recorded_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tracking_id) REFERENCES TRACKING(tracking_id) ON DELETE CASCADE
);

CREATE TABLE DELIVERY_PROOF (
    proof_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    photo_url VARCHAR(255),
    signature_url VARCHAR(255),
    received_by VARCHAR(100),
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES BOOKING(booking_id) ON DELETE CASCADE
);

5. SUPPORT & ADMIN MODULES
These modules cover authentication, documentation, branches, and reporting.
-- ----------------------------------------------------
-- 10. AUTHENTICATION & SECURITY MODUL
CREATE TABLE LOGIN_TOKENS (
    token_id INT PRIMARY KEY AUTO_INCREMENT,
    person_id INT,
    jwt_token TEXT,
    expiry_time DATETIME,
    device_info VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (person_id) REFERENCES Person(person_id) ON DELETE CASCADE
);

CREATE TABLE OTP_RECORDS (
    otp_id INT PRIMARY KEY AUTO_INCREMENT,
    phone_email VARCHAR(150),
    otp_code VARCHAR(10),
    generated_at DATETIME,
    expiry_time DATETIME,
    verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE AUDIT_LOG (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    person_id INT,
    action_type VARCHAR(100),
    action_description TEXT,
    action_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(100),
    user_agent VARCHAR(255),
    FOREIGN KEY (person_id) REFERENCES Person(person_id) ON DELETE SET NULL
);


-- ----------------------------------------------------
-- 11. COMMUNICATION & NOTIFICATION
CREATE TABLE NOTIFICATION (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    receiver_id INT,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    sent_via ENUM('email','sms','app','whatsapp') NOT NULL,
    sent_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('delivered','failed','read') DEFAULT 'delivered',
    FOREIGN KEY (receiver_id) REFERENCES Person(person_id)
);

CREATE TABLE SUPPORT_TICKET (
    ticket_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    issue_type VARCHAR(100) NOT NULL,
    issue_description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME,
    assigned_employee_id INT,
    status ENUM('open','in_progress','resolved','closed') DEFAULT 'open',
    FOREIGN KEY (user_id) REFERENCES Person(person_id),
    FOREIGN KEY (assigned_employee_id) REFERENCES Person(person_id)
);


-- ----------------------------------------------------
-- 12. DOCUMENTS & VERIFICATION MODULE
-- ----------------------------------------------------

CREATE TABLE DOCUMENTS (
    doc_id INT PRIMARY KEY AUTO_INCREMENT,
    person_id INT,
    doc_type ENUM('Aadhar','DL','RC','Insurance') NOT NULL,
    doc_number VARCHAR(50) NOT NULL,
    file_url VARCHAR(255),
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    verified_status ENUM('pending','verified','rejected') DEFAULT 'pending',
    verified_by INT,
    FOREIGN KEY (person_id) REFERENCES Person(person_id),
    FOREIGN KEY (verified_by) REFERENCES Person(person_id)
);

CREATE TABLE DRIVER_DOCUMENTS (
    doc_id INT PRIMARY KEY AUTO_INCREMENT,
    driver_id INT,
    doc_type ENUM('Aadhar','DL','RC','Insurance') NOT NULL,
    doc_number VARCHAR(50) NOT NULL,
    file_url VARCHAR(255),
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    verified_status ENUM('pending','verified','rejected') DEFAULT 'pending',
    verified_by INT,
    FOREIGN KEY (driver_id) REFERENCES DRIVER(driver_id),
    FOREIGN KEY (verified_by) REFERENCES Person(person_id)
);

CREATE TABLE DRIVER_ASSIGNMENT (
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    driver_id INT,
    booking_id INT,
    vehicle_id INT,
    assigned_from DATETIME NOT NULL,
    assigned_to DATETIME,
    status ENUM('pending','in_progress','completed','cancelled') DEFAULT 'pending',
    FOREIGN KEY (driver_id) REFERENCES DRIVER(driver_id),
    FOREIGN KEY (booking_id) REFERENCES BOOKING(booking_id),
    FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id)
);
-- ----------------------------------------------------
-- 13. BRANCH MANAGEMENT MODULE
CREATE TABLE BRANCH (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(150) NOT NULL,
    manager_id INT,
    city_id INT,
    contact_number VARCHAR(20),
    email VARCHAR(150) UNIQUE,
    established_on DATE,
    status ENUM('active','inactive') DEFAULT 'active',
    FOREIGN KEY (manager_id) REFERENCES Person(person_id),
    FOREIGN KEY (city_id) REFERENCES CITY(city_id)
);

CREATE TABLE BRANCH_EMPLOYEE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    branch_id INT,
    employee_id INT,
    assigned_role VARCHAR(100) NOT NULL,
    assigned_since DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id),
    FOREIGN KEY (employee_id) REFERENCES Person(person_id) -- Assuming the employee is linked via Person ID
);
-- ----------------------------------------------------
-- 14. ADMIN CONTROL MODULE

CREATE TABLE SETTINGS (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    key_value VARCHAR(255) NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE REPORTS (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    report_type ENUM('daily','monthly','yearly') NOT NULL,
    generated_by INT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    file_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (generated_by) REFERENCES Person(person_id)
);

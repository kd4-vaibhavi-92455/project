package com.backend.services;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResponse;
import com.backend.dtos.UserRegisterRequest;
import com.backend.dtos.UserRegisterResponse;
import com.backend.entities.Customer;
import com.backend.entities.Staff;
import com.backend.entities.StaffRole;
import com.backend.entities.User;
import com.backend.entities.UserRole;
import com.backend.repository.CustomerRepository;
import com.backend.repository.StaffRepository;
import com.backend.repository.UserRepository;
import com.backend.security.JwtUtils;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final CustomerRepository customerRepo;
    private final StaffRepository staffRepo;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper mapper;
    private final JwtUtils jwtUtils;

    @Override
    public UserRegisterResponse registerCustomer(UserRegisterRequest request) {

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }
        
        if (request.getStaffType() != null) {
            throw new RuntimeException("staffType is not allowed for customer registration");
        }

        Customer customer = mapper.map(request, Customer.class);

        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setUserRole(UserRole.CUSTOMER); // 🔒 default role
        //customer.setActive(true);

        Customer savedCustomer = customerRepo.save(customer);

        return new UserRegisterResponse(
            savedCustomer.getId(),
            savedCustomer.getName(),
            savedCustomer.getEmail(),
            "Registration Successful!"
        );
    }

    @Override
    public UserRegisterResponse registerStaff(UserRegisterRequest request) {

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (request.getStaffType() == null) {
            throw new RuntimeException("Staff type is required for staff registration");
        }

        Staff staff = mapper.map(request, Staff.class);

        staff.setPassword(passwordEncoder.encode(request.getPassword()));
        staff.setUserRole(UserRole.STAFF);   // 🔒 backend control
        staff.setActive(true);

        staff.setStaffRole(
            StaffRole.valueOf(request.getStaffType().toUpperCase())
        );

        Staff savedStaff = userRepo.save(staff);


        return new UserRegisterResponse(
            savedStaff.getId(),
            savedStaff.getName(),
            savedStaff.getEmail(),
            "Staff registered successfully"
        );
    }



    @Override
    public AuthResponse authenticateUser(AuthRequest request) {
        // 1. find user by email
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email or Password"));

        // 2. match password (use matches method, not equals !)
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Email or Password");
        }

        // 3. if matches , then  generate JWT Token
        String jwtToken = jwtUtils.generateToken(user); 

        return new AuthResponse(jwtToken, user.getName(), user.getUserRole().toString(), "Login Success!");
    }

    @Override
    public UserRegisterResponse updateProfile(String emailOrId, com.backend.dtos.UserUpdateDTO request) {
        User user;
        try {
            Long id = Long.parseLong(emailOrId);
            user = userRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        } catch (NumberFormatException e) {
            user = userRepo.findByEmail(emailOrId)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + emailOrId));
        }

        user.setName(request.getName());
        user.setPhone(request.getPhone());
        
        User updatedUser = userRepo.save(user);
        
        return new UserRegisterResponse(
            updatedUser.getId(),
            updatedUser.getName(),
            updatedUser.getEmail(),
            "Profile updated successfully!"
        );
    }
}
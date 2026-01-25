package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.Staff;
import com.backend.entities.StaffRole;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    // Get all active staff
    List<Staff> findByActiveTrue();

    // Get staff by role
    List<Staff> findByRole(StaffRole role);
}
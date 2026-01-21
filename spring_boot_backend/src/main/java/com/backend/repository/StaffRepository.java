package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}

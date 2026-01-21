package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.BookingAssignment;

public interface BookingAssignmentRepository 
        extends JpaRepository<BookingAssignment, Long> {
}

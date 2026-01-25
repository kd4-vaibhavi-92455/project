package com.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;
import com.backend.entities.Customer;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Get all bookings by customer
    List<Booking> findByCustomer(Customer customer);

    // Get bookings by status
    List<Booking> findByStatus(BookingStatus status);

    // Get bookings scheduled on a specific date
    List<Booking> findByMoveDate(LocalDate moveDate);

    // Get bookings by customer and status
    List<Booking> findByCustomerAndStatus(Customer customer, BookingStatus status);
}
package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    // Get all addresses by city
    List<Address> findByCity(String city);

    // Get all addresses by state
    List<Address> findByState(String state);

    // Check if an address with same label exists
    boolean existsByLabel(String label);
}
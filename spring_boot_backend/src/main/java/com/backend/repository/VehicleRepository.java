package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}

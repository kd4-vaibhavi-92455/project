package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.ServiceType;

public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
}

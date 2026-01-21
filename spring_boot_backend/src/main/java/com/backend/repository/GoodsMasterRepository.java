package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.GoodsMaster;

public interface GoodsMasterRepository extends JpaRepository<GoodsMaster, Long> {
}

package com.backend.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "bookings")
@AttributeOverride(name = "id", column = @Column(name = "booking_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Booking extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceType service;

    @ManyToOne
    @JoinColumn(name = "pickup_address_id", nullable = false)
    private Address pickupAddress;

    @ManyToOne
    @JoinColumn(name = "drop_address_id", nullable = false)
    private Address dropAddress;

    private LocalDate moveDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private BigDecimal estimatedPrice;
}

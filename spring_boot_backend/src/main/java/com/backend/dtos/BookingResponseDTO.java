package com.backend.dtos.booking;

import java.time.LocalDate;

import com.backend.dtos.address.AddressResponseDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingResponseDTO {
    private Long bookingId;
    private AddressResponseDTO pickupAddress;
    private AddressResponseDTO dropAddress;
    private LocalDate scheduledDate;
    private String status;
    private Double amount;
}

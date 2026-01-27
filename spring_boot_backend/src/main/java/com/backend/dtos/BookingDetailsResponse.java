package com.backend.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailsResponse {
    private Long bookingId;
    private Long serviceId;
    private String serviceName;
    private String pickupAddress;
    private String dropAddress;
    private LocalDate moveDate;
    private String status;
    private BigDecimal estimatedPrice;
    private LocalDateTime createdAt;
}

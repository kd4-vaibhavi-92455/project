package com.backend.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long bookingId;
    private String status;
    private BigDecimal estimatedPrice;
    private LocalDate moveDate;
    private String message; // "Booking Confirmed!"
}

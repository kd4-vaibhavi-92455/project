package com.backend.dtos.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDTO {
    private Long bookingId;
    private Double amount;
}

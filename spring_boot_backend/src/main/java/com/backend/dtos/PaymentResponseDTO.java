package com.backend.dtos.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentResponseDTO {
    private Long paymentId;
    private String paymentStatus;
    private String transactionId;
}

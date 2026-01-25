package com.backend.dtos.quotation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuotationResponseDTO {
    private Double estimatedAmount;
    private Double discount;
    private Double finalAmount;
}

package com.backend.dtos.quotation;

import java.time.LocalDate;
import java.util.List;

import com.backend.dtos.address.AddressRequestDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuotationRequestDTO {
    private AddressRequestDTO pickupAddress;
    private AddressRequestDTO dropAddress;
    private Long serviceTypeId;
    private String houseType;
    private LocalDate shiftingDate;
    private List<GoodsItemDTO> goods;
}

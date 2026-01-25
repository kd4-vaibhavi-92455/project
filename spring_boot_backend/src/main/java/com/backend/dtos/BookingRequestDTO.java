package com.backend.dtos.booking;

import java.time.LocalDate;
import java.util.List;

import com.backend.dtos.address.AddressRequestDTO;
import com.backend.dtos.quotation.GoodsItemDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequestDTO {
    private AddressRequestDTO pickupAddress;
    private AddressRequestDTO dropAddress;
    private Long serviceTypeId;
    private String houseType;
    private LocalDate scheduledDate;
    private List<GoodsItemDTO> goods;
}

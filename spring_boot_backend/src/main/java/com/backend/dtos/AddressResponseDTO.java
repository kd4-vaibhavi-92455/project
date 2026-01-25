package com.backend.dtos.address;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressResponseDTO {
    private String city;
    private String area;
    private String fullAddress;
    private String pincode;
}

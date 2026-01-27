package com.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserUpdateDTO {
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    private String staffType; // For staff roles (MANAGER, DRIVER, etc.)
}

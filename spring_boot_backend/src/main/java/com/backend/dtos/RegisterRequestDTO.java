package com.backend.dtos.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {
    private String fullName;
    private String email;
    private String phone;
    private String password;
}

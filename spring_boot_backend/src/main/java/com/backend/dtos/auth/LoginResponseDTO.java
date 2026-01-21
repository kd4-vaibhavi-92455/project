package com.backend.dtos.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {
    private Long userId;
    private String fullName;
    private String role;
    private String token;
}

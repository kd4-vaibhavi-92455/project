package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor // Yeh annotation 4-args constructor banata hai
public class AuthResponse {
    private String token;
    private String name;
    private String role;
    private String message;
}
package com.backend.dtos;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterResponse {
    private Long userId;
    private String name;
    private String email;
    private String message; // "Registration Successful!"
    
    public UserRegisterResponse(String message) {
        this.message = message;
    }
}

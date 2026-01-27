package com.backend.dtos;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterRequest {
    private String name;
    private String phone;
    private String email;
    private String password;
   // private String role; // CUSTOMER, STAFF, ADMIN
    private String staffType;
}

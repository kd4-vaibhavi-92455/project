package com.backend.dtos.common;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponseDTO {
    private String message;
    private LocalDateTime timestamp;
}

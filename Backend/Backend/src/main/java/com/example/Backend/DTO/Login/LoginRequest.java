package com.example.Backend.DTO.Login;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String phoneNumber;
    private String password;
    private String email;
}

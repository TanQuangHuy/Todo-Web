package com.example.Backend.DTO.Login;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    private Long userId;
    private String phoneNumber;
    private String userName;
    private String email;
    private String address;
    private String avatar;
    private Integer role;
    private String token;
}

package com.example.Backend.DTO.Register;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String address;
    private String password;
}

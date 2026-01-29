package com.example.Backend.DTO.User;

import lombok.Data;

@Data
public class UpdateUserDTO {
    private String phoneNumber;
    private String userName;
    private String email;
    private String address;
    private String oldPassword;
    private String newPassword;
    private String avatar;
}

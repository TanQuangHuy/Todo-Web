package com.example.Backend.DTO.User;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserResponse {
    private Long userId;
    private String userName;
    private String email;
    private List<String> roles;
}

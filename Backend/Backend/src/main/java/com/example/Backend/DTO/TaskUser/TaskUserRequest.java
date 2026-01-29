package com.example.Backend.DTO.TaskUser;

import lombok.Data;

@Data
public class TaskUserRequest {
    private Long taskId;
    private String email;
    private String role; // có thể null
}

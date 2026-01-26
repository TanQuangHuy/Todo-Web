package com.example.Backend.DTO.TaskUser;

import lombok.Data;

@Data
public class TaskUserRequest {
    private Long taskId;
    private Long userId;
    private String role; // có thể null
}

package com.example.Backend.DTO.TaskUser;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskUserResponse {
    private Long taskId;
    private Long userId;
    private String role;
}

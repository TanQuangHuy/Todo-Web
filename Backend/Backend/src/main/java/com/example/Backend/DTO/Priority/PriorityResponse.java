package com.example.Backend.DTO.Priority;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PriorityResponse {
    private Long priorityId;
    private String priorityName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

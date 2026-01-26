package com.example.Backend.DTO.Task;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TaskResponse {
    private Long taskId;
    private String title;
    private String objective;
    private String description;
    private String notes;

    private LocalDateTime deadline;
    private LocalDateTime completedAt;

    private Integer orderIndex;

    private Long userId;
    private Long categoryId;
    private Long statusId;
    private Long priorityId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

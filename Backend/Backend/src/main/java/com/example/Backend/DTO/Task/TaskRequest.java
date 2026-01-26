package com.example.Backend.DTO.Task;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskRequest {
    private String title;
    private String objective;
    private String description;
    private String notes;
    private LocalDateTime deadline;

    private Long userId;
    private Long categoryId;
    private Long statusId;
    private Long priorityId;

    private Integer orderIndex;
}

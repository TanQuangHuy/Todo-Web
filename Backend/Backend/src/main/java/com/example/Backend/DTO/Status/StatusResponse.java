package com.example.Backend.DTO.Status;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class StatusResponse {
    private Long statusId;
    private String statusName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

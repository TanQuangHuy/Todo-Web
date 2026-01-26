package com.example.Backend.DTO.Notification;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponse {
    private Long notificationId;
    private String title;
    private String content;
    private Long taskId;
    private Long userId;
    private LocalDateTime createdAt;
}

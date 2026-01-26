package com.example.Backend.DTO.Notification;

import lombok.Data;

@Data
public class NotificationRequest {
    private String title;
    private String content;
    private Long taskId; // có thể null
    private Long userId; // người nhận
}

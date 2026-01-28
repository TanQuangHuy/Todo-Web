package com.example.Backend.DTO.Chat;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatReadRequest {
    private Long messageId;
    private Long userId;
    private LocalDateTime readAt;
}

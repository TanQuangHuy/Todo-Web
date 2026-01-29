package com.example.Backend.DTO.Chat;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageReadResponse {

    private Long messageId;
    private Long userId;
    private LocalDateTime readAt;
}

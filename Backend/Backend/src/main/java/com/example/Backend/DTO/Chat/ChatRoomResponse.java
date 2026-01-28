package com.example.Backend.DTO.Chat;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomResponse {
    private Long chatRoomId;
    private Long taskId;
    private LocalDateTime createdAt;
}

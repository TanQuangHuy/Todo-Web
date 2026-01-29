package com.example.Backend.DTO.Chat;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageResponse {

    private Long messageId;
    private Long chatRoomId;

    private Long senderId;
    private String senderName;

    private String content;
    private String messageType;

    private LocalDateTime createdAt;
}

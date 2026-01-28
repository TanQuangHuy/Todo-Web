package com.example.Backend.DTO.Chat;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageRequest {

    private Long chatRoomId;
    private Long senderId;
    private String content;
}

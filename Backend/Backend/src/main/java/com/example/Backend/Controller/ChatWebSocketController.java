package com.example.Backend.Controller;

import com.example.Backend.DTO.Chat.ChatMessageRequest;
import com.example.Backend.Services.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat.send")
    public void send(ChatMessageRequest request) {
        chatMessageService.sendMessage(request);
    }
}

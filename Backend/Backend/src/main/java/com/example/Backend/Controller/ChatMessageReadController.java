package com.example.Backend.Controller;

import com.example.Backend.DTO.Chat.ChatReadRequest;
import com.example.Backend.Services.ChatMessageReadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat-reads")
@RequiredArgsConstructor
public class ChatMessageReadController {

    private final ChatMessageReadService readService;

    @PostMapping
    public void markRead(@RequestBody ChatReadRequest request) {
        readService.markAsRead(
                request.getMessageId(),
                request.getUserId()
        );
    }

}

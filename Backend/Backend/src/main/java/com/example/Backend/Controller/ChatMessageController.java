package com.example.Backend.Controller;

import com.example.Backend.DTO.Chat.ChatMessageRequest;
import com.example.Backend.DTO.Chat.ChatMessageResponse;
import com.example.Backend.Services.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat-messages")
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService messageService;

    @PostMapping
    public ChatMessageResponse send(@RequestBody ChatMessageRequest request) {
        return messageService.sendMessage(request);
    }

    @GetMapping("/room/{chatRoomId}")
    public List<ChatMessageResponse> getByRoom(@PathVariable Long chatRoomId) {
        return messageService.getMessages(chatRoomId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        messageService.delete(id);
    }
}


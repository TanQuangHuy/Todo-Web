package com.example.Backend.Controller;

import com.example.Backend.DTO.Chat.ChatRoomResponse;
import com.example.Backend.Services.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat-rooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/task/{taskId}")
    public ChatRoomResponse create(@PathVariable Long taskId) {
        return chatRoomService.createRoom(taskId);
    }

    @GetMapping("/task/{taskId}")
    public ChatRoomResponse getByTask(@PathVariable Long taskId) {
        return chatRoomService.getByTask(taskId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        chatRoomService.delete(id);
    }
}

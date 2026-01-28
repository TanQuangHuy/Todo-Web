package com.example.Backend.Services;

import com.example.Backend.DTO.Chat.ChatRoomResponse;
import com.example.Backend.Entity.ChatRoom;
import com.example.Backend.Entity.Task;
import com.example.Backend.Repository.ChatRoomRepository;
import com.example.Backend.Repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final TaskRepository taskRepository;

    public ChatRoomResponse createRoom(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Optional: nếu room đã tồn tại thì trả về luôn (tránh duplicate do unique task_id)
        ChatRoom room = chatRoomRepository.findByTask_TaskId(taskId)
                .orElseGet(() -> chatRoomRepository.save(
                        ChatRoom.builder().task(task).build()
                ));

        return toResponse(room);
    }

    public ChatRoomResponse getByTask(Long taskId) {
        ChatRoom room = chatRoomRepository.findByTask_TaskId(taskId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));
        return toResponse(room);
    }

    public void delete(Long chatRoomId) {
        chatRoomRepository.deleteById(chatRoomId);
    }

    private ChatRoomResponse toResponse(ChatRoom entity) {
        return ChatRoomResponse.builder()
                .chatRoomId(entity.getChatRoomId())
                .taskId(entity.getTask().getTaskId())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
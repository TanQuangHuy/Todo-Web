package com.example.Backend.Services;

import com.example.Backend.DTO.Chat.ChatMessageReadResponse;
import com.example.Backend.Entity.ChatMessage;
import com.example.Backend.Entity.ChatMessageRead;
import com.example.Backend.Entity.ChatMessageReadId;
import com.example.Backend.Entity.User;
import com.example.Backend.Repository.ChatMessageReadRepository;
import com.example.Backend.Repository.ChatMessageRepository;
import com.example.Backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageReadService {

    private final ChatMessageReadRepository readRepository;
    private final ChatMessageRepository messageRepository;
    private final UserRepository userRepository;

    /**
     * Mark 1 message as read by 1 user
     */
    public ChatMessageReadResponse markAsRead(Long messageId, Long userId) {

        ChatMessageReadId id = new ChatMessageReadId(messageId, userId);

        // ✅ Nếu đã đọc rồi thì trả về luôn (idempotent)
        if (readRepository.existsById(id)) {
            ChatMessageRead existed = readRepository.findById(id).orElseThrow();
            return toResponse(existed);
        }

        ChatMessage message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChatMessageRead read = ChatMessageRead.builder()
                .id(id)
                .message(message)
                .user(user)
                .build();

        return toResponse(
                readRepository.save(read)
        );
    }

    /* ================= PRIVATE MAPPER ================= */

    private ChatMessageReadResponse toResponse(ChatMessageRead entity) {
        return ChatMessageReadResponse.builder()
                .messageId(entity.getId().getMessageId())
                .userId(entity.getId().getUserId())
                .readAt(entity.getReadAt())
                .build();
    }
}

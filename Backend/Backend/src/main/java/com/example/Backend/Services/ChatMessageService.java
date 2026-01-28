package com.example.Backend.Services;

import com.example.Backend.DTO.Chat.ChatMessageRequest;
import com.example.Backend.DTO.Chat.ChatMessageResponse;
import com.example.Backend.Entity.ChatMessage;
import com.example.Backend.Entity.ChatRoom;
import com.example.Backend.Entity.User;
import com.example.Backend.Repository.ChatMessageRepository;
import com.example.Backend.Repository.ChatRoomRepository;
import com.example.Backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public ChatMessageResponse sendMessage(ChatMessageRequest request) {
        ChatRoom room = chatRoomRepository.findById(request.getChatRoomId())
                .orElseThrow(() -> new RuntimeException("Chat room not found"));

        User sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChatMessage message = ChatMessage.builder()
                .chatRoom(room)
                .sender(sender)
                .content(request.getContent())
                .build();

        return toResponse(
                messageRepository.save(message)
        );
    }

    public List<ChatMessageResponse> getMessages(Long chatRoomId) {
        return messageRepository
                .findByChatRoom_ChatRoomIdOrderByCreatedAtAsc(chatRoomId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public void delete(Long messageId) {
        messageRepository.deleteById(messageId);
    }

    /* ================= PRIVATE MAPPER ================= */

    private ChatMessageResponse toResponse(ChatMessage entity) {
        return ChatMessageResponse.builder()
                .messageId(entity.getMessageId())
                .chatRoomId(entity.getChatRoom().getChatRoomId())
                .senderId(entity.getSender().getUserId())
                .senderName(entity.getSender().getUserName())
                .content(entity.getContent())
                .messageType(entity.getMessageType().name())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
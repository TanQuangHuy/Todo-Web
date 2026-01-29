package com.example.Backend.Repository;

import com.example.Backend.Entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByChatRoom_ChatRoomIdOrderByCreatedAtAsc(Long chatRoomId);
}

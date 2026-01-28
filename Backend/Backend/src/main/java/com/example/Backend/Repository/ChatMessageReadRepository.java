package com.example.Backend.Repository;

import com.example.Backend.Entity.ChatMessageRead;
import com.example.Backend.Entity.ChatMessageReadId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageReadRepository extends JpaRepository<ChatMessageRead, ChatMessageReadId> {
    boolean existsByMessage_MessageIdAndUser_UserId(Long messageId, Long userId);
}


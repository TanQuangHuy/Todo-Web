package com.example.Backend.Repository;

import com.example.Backend.Entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findByTask_TaskId(Long taskId);
}


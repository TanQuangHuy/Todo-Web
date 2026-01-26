package com.example.Backend.Repository;

import com.example.Backend.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser_UserId(Long userId);

    List<Task> findByStatus_StatusId(Long statusId);

    List<Task> findByUser_UserIdOrderByOrderIndexAsc(Long userId);
}

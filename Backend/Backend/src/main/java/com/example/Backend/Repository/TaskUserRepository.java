package com.example.Backend.Repository;

import com.example.Backend.Entity.TaskUser;
import com.example.Backend.Entity.TaskUserId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskUserRepository extends JpaRepository<TaskUser, TaskUserId> {

    List<TaskUser> findByTask_TaskId(Long taskId);

    List<TaskUser> findByUser_UserId(Long userId);

    boolean existsByTask_TaskIdAndUser_UserId(Long taskId, Long userId);
}

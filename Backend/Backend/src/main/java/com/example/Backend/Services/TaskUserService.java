package com.example.Backend.Services;

import com.example.Backend.DTO.TaskUser.TaskUserRequest;
import com.example.Backend.DTO.TaskUser.TaskUserResponse;
import com.example.Backend.Entity.*;
import com.example.Backend.Entity.TaskUser;
import com.example.Backend.Entity.TaskUserId;
import com.example.Backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskUserService {

    private final TaskUserRepository taskUserRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    /* ============ CREATE / ASSIGN ============ */
    public TaskUserResponse assign(TaskUserRequest request) {

        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));

        if (taskUserRepository.existsByTask_TaskIdAndUser_UserId(
                task.getTaskId(), user.getUserId())) {
            throw new RuntimeException("User đã được gán vào task");
        }

        TaskUser taskUser = TaskUser.builder()
                .id(new TaskUserId(task.getTaskId(), user.getUserId())) // vẫn lưu ID như cũ
                .task(task)
                .user(user)
                .role(request.getRole())
                .build();

        return mapToResponse(taskUserRepository.save(taskUser));
    }

    /* ============ UPDATE ROLE ============ */
    public TaskUserResponse updateRole(Long taskId, Long userId, String role) {

        TaskUser taskUser = taskUserRepository.findById(
                new TaskUserId(taskId, userId)
        ).orElseThrow(() -> new RuntimeException("TaskUser not found"));

        taskUser.setRole(role); // có thể set null

        return mapToResponse(taskUserRepository.save(taskUser));
    }

    /* ============ REMOVE ============ */
    public void remove(Long taskId, Long userId) {
        taskUserRepository.deleteById(new TaskUserId(taskId, userId));
    }

    /* ============ READ ============ */
    public List<TaskUserResponse> getByTask(Long taskId) {
        return taskUserRepository.findByTask_TaskId(taskId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TaskUserResponse> getByUser(Long userId) {
        return taskUserRepository.findByUser_UserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private TaskUserResponse mapToResponse(TaskUser taskUser) {
        return TaskUserResponse.builder()
                .taskId(taskUser.getTask().getTaskId())
                .userId(taskUser.getUser().getUserId())
                .role(taskUser.getRole())
                .build();
    }
}

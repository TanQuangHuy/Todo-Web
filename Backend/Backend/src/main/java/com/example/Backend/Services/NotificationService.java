package com.example.Backend.Services;

import com.example.Backend.DTO.Notification.NotificationRequest;
import com.example.Backend.DTO.Notification.NotificationResponse;
import com.example.Backend.Entity.Notification;
import com.example.Backend.Entity.Task;
import com.example.Backend.Entity.User;
import com.example.Backend.Repository.NotificationRepository;
import com.example.Backend.Repository.TaskRepository;
import com.example.Backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    /* ========== CREATE ========== */
    public NotificationResponse create(NotificationRequest request) {

        Notification notification = Notification.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .task(getTask(request.getTaskId()))
                .user(getUser(request.getUserId()))
                .build();

        return mapToResponse(notificationRepository.save(notification));
    }

    public NotificationResponse update(Long id, NotificationRequest request) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setTitle(request.getTitle());
        notification.setContent(request.getContent());

        // Cho phép đổi task (có thể null)
        if (request.getTaskId() != null) {
            notification.setTask(
                    taskRepository.findById(request.getTaskId())
                            .orElseThrow(() -> new RuntimeException("Task not found"))
            );
        } else {
            notification.setTask(null);
        }

        // Cho phép đổi user nhận
        if (request.getUserId() != null) {
            notification.setUser(
                    userRepository.findById(request.getUserId())
                            .orElseThrow(() -> new RuntimeException("User not found"))
            );
        }

        return mapToResponse(notificationRepository.save(notification));
    }

    /* ========== DELETE ========== */
    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }

    /* ========== READ ========== */
    public NotificationResponse getById(Long id) {
        return notificationRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    public List<NotificationResponse> getByUser(Long userId) {
        return notificationRepository
                .findByUser_UserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<NotificationResponse> getByTask(Long taskId) {
        return notificationRepository.findByTask_TaskId(taskId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /* ========== HELPER ========== */
    private Task getTask(Long id) {
        if (id == null) return null;
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private NotificationResponse mapToResponse(Notification n) {
        return NotificationResponse.builder()
                .notificationId(n.getNotificationId())
                .title(n.getTitle())
                .content(n.getContent())
                .taskId(n.getTask() != null ? n.getTask().getTaskId() : null)
                .userId(n.getUser().getUserId())
                .createdAt(n.getCreatedAt())
                .build();
    }


}

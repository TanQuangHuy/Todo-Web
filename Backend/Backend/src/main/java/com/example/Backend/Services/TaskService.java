package com.example.Backend.Services;

import com.example.Backend.DTO.Task.TaskRequest;
import com.example.Backend.DTO.Task.TaskResponse;
import com.example.Backend.Entity.*;
import com.example.Backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final StatusRepository statusRepository;
    private final PriorityRepository priorityRepository;
    private final NotificationRepository notificationRepository;


    /* ================= CREATE ================= */
    public TaskResponse create(TaskRequest request) {

        Task task = Task.builder()
                .title(request.getTitle())
                .objective(request.getObjective())
                .description(request.getDescription())
                .notes(request.getNotes())
                .deadline(request.getDeadline())
                .orderIndex(request.getOrderIndex())
                .user(getUser(request.getUserId()))
                .category(getCategory(request.getCategoryId()))
                .status(getStatus(request.getStatusId()))
                .priority(getPriority(request.getPriorityId()))
                .build();

        return mapToResponse(taskRepository.save(task));
    }

    /* ================= UPDATE ================= */
    public TaskResponse update(Long id, TaskRequest request) {
        Task task = getTask(id);

        if (request.getTitle() != null)
            task.setTitle(request.getTitle());

        if (request.getObjective() != null)
            task.setObjective(request.getObjective());

        if (request.getDescription() != null)
            task.setDescription(request.getDescription());

        if (request.getNotes() != null)
            task.setNotes(request.getNotes());

        if (request.getDeadline() != null) {

            if (task.getDeadline() == null || !task.getDeadline().equals(request.getDeadline())) {
                task.setRemindedDeadline(false);
                task.setRemindedOverdue(false);
            }

            task.setDeadline(request.getDeadline());
        }

        if (request.getOrderIndex() != null)
            task.setOrderIndex(request.getOrderIndex());

        if (request.getCategoryId() != null)
            task.setCategory(getCategory(request.getCategoryId()));

        if (request.getStatusId() != null)
            task.setStatus(getStatus(request.getStatusId()));

        if (request.getPriorityId() != null)
            task.setPriority(getPriority(request.getPriorityId()));

        return mapToResponse(taskRepository.save(task));
    }

    /* ================= COMPLETE ================= */
    public TaskResponse markCompleted(Long id) {
        Task task = getTask(id);
        task.setCompletedAt(LocalDateTime.now());
        Task savedTask = taskRepository.save(task);

        // 🔔 TẠO NOTIFICATION
        Notification notification = Notification.builder()
                .title("Task đã hoàn thành")
                .content("Bạn đã hoàn thành task: " + task.getTitle())
                .task(task)
                .user(task.getUser())
                .build();

        notificationRepository.save(notification);

        return mapToResponse(savedTask);
    }

    /* ================= DELETE ================= */
    public void delete(Long id) {
        Task task = getTask(id);
        taskRepository.delete(task); // soft delete
    }

    /* ================= READ ================= */
    public TaskResponse getById(Long id) {
        return mapToResponse(getTask(id));
    }

    public List<TaskResponse> getAll() {
        return taskRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TaskResponse> getByUser(Long userId) {
        return taskRepository.findByUser_UserIdOrderByOrderIndexAsc(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /* ================= HELPER ================= */
    private Task getTask(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    private Status getStatus(Long id) {
        return statusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Status not found"));
    }

    private Priority getPriority(Long id) {
        return priorityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Priority not found"));
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .taskId(task.getTaskId())
                .title(task.getTitle())
                .objective(task.getObjective())
                .description(task.getDescription())
                .notes(task.getNotes())
                .deadline(task.getDeadline())
                .completedAt(task.getCompletedAt())
                .orderIndex(task.getOrderIndex())
                .userId(task.getUser().getUserId())
                .categoryId(task.getCategory() != null ? task.getCategory().getCategoryId() : null)
                .statusId(task.getStatus() != null ? task.getStatus().getStatusId() : null)
                .priorityId(task.getPriority() != null ? task.getPriority().getPriorityId() : null)
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}

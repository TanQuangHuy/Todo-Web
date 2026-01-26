package com.example.Backend.Controller;

import com.example.Backend.DTO.Notification.NotificationRequest;
import com.example.Backend.DTO.Notification.NotificationResponse;
import com.example.Backend.Services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationResponse> create(
            @RequestBody NotificationRequest request
    ) {
        return ResponseEntity.ok(notificationService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NotificationResponse> update(
            @PathVariable Long id,
            @RequestBody NotificationRequest request
    ) {
        return ResponseEntity.ok(notificationService.update(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationResponse> getById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(notificationService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationResponse>> getByUser(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(notificationService.getByUser(userId));
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<NotificationResponse>> getByTask(
            @PathVariable Long taskId
    ) {
        return ResponseEntity.ok(notificationService.getByTask(taskId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

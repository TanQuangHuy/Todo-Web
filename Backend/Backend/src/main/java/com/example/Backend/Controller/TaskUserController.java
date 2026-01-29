package com.example.Backend.Controller;

import com.example.Backend.DTO.TaskUser.TaskUserRequest;
import com.example.Backend.DTO.TaskUser.TaskUserResponse;
import com.example.Backend.Services.TaskUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task-users")
@RequiredArgsConstructor
public class TaskUserController {

    private final TaskUserService taskUserService;

    @PostMapping
    public ResponseEntity<TaskUserResponse> assign(
            @RequestBody TaskUserRequest request
    ) {
        return ResponseEntity.ok(taskUserService.assign(request));
    }

    @PutMapping("/{taskId}/{userId}")
    public ResponseEntity<TaskUserResponse> updateRole(
            @PathVariable Long taskId,
            @PathVariable Long userId,
            @RequestParam(required = false) String role
    ) {
        return ResponseEntity.ok(
                taskUserService.updateRole(taskId, userId, role)
        );
    }

    @DeleteMapping("/{taskId}/{userId}")
    public ResponseEntity<Void> remove(
            @PathVariable Long taskId,
            @PathVariable Long userId
    ) {
        taskUserService.remove(taskId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<TaskUserResponse>> getByTask(
            @PathVariable Long taskId
    ) {
        return ResponseEntity.ok(taskUserService.getByTask(taskId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskUserResponse>> getByUser(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(taskUserService.getByUser(userId));
    }
}

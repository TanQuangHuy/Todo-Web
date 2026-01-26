package com.example.Backend.Controller;

import com.example.Backend.DTO.Priority.PriorityRequest;
import com.example.Backend.DTO.Priority.PriorityResponse;
import com.example.Backend.Services.PriorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/priorities")
@RequiredArgsConstructor
public class PriorityController {

    private final PriorityService priorityService;

    @PostMapping
    public ResponseEntity<PriorityResponse> create(
            @RequestBody PriorityRequest request
    ) {
        return ResponseEntity.ok(priorityService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PriorityResponse> update(
            @PathVariable Long id,
            @RequestBody PriorityRequest request
    ) {
        return ResponseEntity.ok(priorityService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        priorityService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PriorityResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(priorityService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PriorityResponse>> getAll() {
        return ResponseEntity.ok(priorityService.getAll());
    }
}
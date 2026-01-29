package com.example.Backend.Controller;

import com.example.Backend.DTO.Status.StatusRequest;
import com.example.Backend.DTO.Status.StatusResponse;
import com.example.Backend.Services.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statuses")
@RequiredArgsConstructor
public class StatusController {

    private final StatusService statusService;

    @PostMapping
    public ResponseEntity<StatusResponse> create(
            @RequestBody StatusRequest request
    ) {
        return ResponseEntity.ok(statusService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StatusResponse> update(
            @PathVariable Long id,
            @RequestBody StatusRequest request
    ) {
        return ResponseEntity.ok(statusService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        statusService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(statusService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StatusResponse>> getAll() {
        return ResponseEntity.ok(statusService.getAll());
    }
}

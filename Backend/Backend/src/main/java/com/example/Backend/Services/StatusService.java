package com.example.Backend.Services;

import com.example.Backend.DTO.Status.StatusRequest;
import com.example.Backend.DTO.Status.StatusResponse;
import com.example.Backend.Entity.Status;
import com.example.Backend.Repository.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final StatusRepository statusRepository;

    public StatusResponse create(StatusRequest request) {
        if (statusRepository.existsByStatusName(request.getStatusName())) {
            throw new RuntimeException("Status name already exists");
        }

        Status status = Status.builder()
                .statusName(request.getStatusName())
                .build();

        return mapToResponse(statusRepository.save(status));
    }

    public StatusResponse update(Long id, StatusRequest request) {
        Status status = statusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Status not found"));

        status.setStatusName(request.getStatusName());

        return mapToResponse(statusRepository.save(status));
    }

    public void delete(Long id) {
        Status status = statusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Status not found"));

        statusRepository.delete(status); // soft delete nếu có @SQLDelete
    }

    public StatusResponse getById(Long id) {
        return statusRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Status not found"));
    }

    public List<StatusResponse> getAll() {
        return statusRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private StatusResponse mapToResponse(Status status) {
        return StatusResponse.builder()
                .statusId(status.getStatusId())
                .statusName(status.getStatusName())
                .createdAt(status.getCreatedAt())
                .updatedAt(status.getUpdatedAt())
                .build();
    }
}

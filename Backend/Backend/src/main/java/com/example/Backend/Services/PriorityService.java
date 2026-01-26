package com.example.Backend.Services;

import com.example.Backend.DTO.Priority.PriorityRequest;
import com.example.Backend.DTO.Priority.PriorityResponse;
import com.example.Backend.Entity.Priority;
import com.example.Backend.Repository.PriorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PriorityService {

    private final PriorityRepository priorityRepository;


    public PriorityResponse create(PriorityRequest request) {
        if (priorityRepository.existsByPriorityName(request.getPriorityName())) {
            throw new RuntimeException("Priority name already exists");
        }

        Priority priority = Priority.builder()
                .priorityName(request.getPriorityName())
                .build();

        return mapToResponse(priorityRepository.save(priority));
    }


    public PriorityResponse update(Long id, PriorityRequest request) {
        Priority priority = priorityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Priority not found"));

        priority.setPriorityName(request.getPriorityName());

        return mapToResponse(priorityRepository.save(priority));
    }


    public void delete(Long id) {
        Priority priority = priorityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Priority not found"));

        priorityRepository.delete(priority); // soft delete nếu có @SQLDelete
    }


    public PriorityResponse getById(Long id) {
        return priorityRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Priority not found"));
    }


    public List<PriorityResponse> getAll() {
        return priorityRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private PriorityResponse mapToResponse(Priority priority) {
        return PriorityResponse.builder()
                .priorityId(priority.getPriorityId())
                .priorityName(priority.getPriorityName())
                .createdAt(priority.getCreatedAt())
                .updatedAt(priority.getUpdatedAt())
                .build();
    }
}

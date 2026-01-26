package com.example.Backend.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskImageResponse {
    private Long taskImageId;
    private Long taskId;
    private String imageUrl;
    private Integer index;
}

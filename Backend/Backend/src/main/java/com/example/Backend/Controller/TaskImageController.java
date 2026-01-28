package com.example.Backend.Controller;

import com.example.Backend.DTO.TaskImage.TaskImageResponse;
import com.example.Backend.Services.TaskImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/task-images")
@RequiredArgsConstructor
public class TaskImageController {

    private final TaskImageService taskImageService;

    //upload 1 ảnh
    @PostMapping("/upload")
    public ResponseEntity<TaskImageResponse> upload(
            @RequestParam Long taskId,
            @RequestParam MultipartFile file,
            @RequestParam(required = false) Integer index
    ) throws IOException {
        return ResponseEntity.ok(
                taskImageService.upload(taskId, file, index)
        );
    }

    //upload nhiều ảnh
    @PostMapping("/upload-multiple")
    public ResponseEntity<List<TaskImageResponse>> uploadMultiple(
            @RequestParam Long taskId,
            @RequestParam("files") List<MultipartFile> files
    ) throws IOException {
        return ResponseEntity.ok(
                taskImageService.uploadMultiple(taskId, files)
        );
    }

    //lấy ảnh của task cụ thể
    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<TaskImageResponse>> getByTask(
            @PathVariable Long taskId
    ) {
        return ResponseEntity.ok(taskImageService.getByTask(taskId));
    }

    //update 1 ảnh
    @PutMapping("/{id}/image")
    public ResponseEntity<TaskImageResponse> updateImage(
            @PathVariable Long id,
            @RequestParam MultipartFile file
    ) throws IOException {
        return ResponseEntity.ok(
                taskImageService.updateImage(id, file)
        );
    }

    //update full ảnh trong task
    @PutMapping("/task/{taskId}/replace-all")
    public ResponseEntity<List<TaskImageResponse>> replaceAll(
            @PathVariable Long taskId,
            @RequestParam("files") List<MultipartFile> files
    ) throws IOException {
        return ResponseEntity.ok(
                taskImageService.replaceAllImages(taskId, files)
        );
    }

    //update index của ảnh
    @PutMapping("/{id}/index")
    public ResponseEntity<TaskImageResponse> updateIndex(
            @PathVariable Long id,
            @RequestParam Integer index
    ) {
        return ResponseEntity.ok(
                taskImageService.updateIndex(id, index)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskImageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

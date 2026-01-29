package com.example.Backend.Services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.Backend.DTO.TaskImage.TaskImageResponse;
import com.example.Backend.Entity.Task;
import com.example.Backend.Entity.TaskImage;
import com.example.Backend.Repository.TaskImageRepository;
import com.example.Backend.Repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class TaskImageService {

    private final TaskImageRepository taskImageRepository;
    private final TaskRepository taskRepository;
    private final Cloudinary cloudinary;

    /* ========== CREATE / UPLOAD ========== */
    public TaskImageResponse upload(Long taskId, MultipartFile file, Integer index)
            throws IOException {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "tasks/" + taskId,
                        "resource_type", "image"
                )
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        TaskImage taskImage = TaskImage.builder()
                .task(task)
                .imageUrl(imageUrl)
                .index(index)
                .build();

        return mapToResponse(taskImageRepository.save(taskImage));
    }

    /* ========== UPLOAD NHIỀU ẢNH ========== */
    public List<TaskImageResponse> uploadMultiple(
            Long taskId,
            List<MultipartFile> files
    ) throws IOException {

        System.out.println("FILES SIZE = " + files.size());
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        AtomicInteger startIndex = new AtomicInteger(taskImageRepository
                .findByTask_TaskIdOrderByIndexAsc(taskId)
                .size());

        return files.stream().map(file -> {
            try {
                Map uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap(
                                "folder", "tasks/" + taskId,
                                "resource_type", "image"
                        )
                );

                String imageUrl = uploadResult.get("secure_url").toString();

                TaskImage taskImage = TaskImage.builder()
                        .task(task)
                        .imageUrl(imageUrl)
                        .index(startIndex.getAndIncrement())
                        .build();

                return mapToResponse(taskImageRepository.save(taskImage));

            } catch (IOException e) {
                throw new RuntimeException("Upload failed", e);
            }
        }).toList();
    }

    public TaskImageResponse updateImage(
            Long taskImageId,
            MultipartFile newFile
    ) throws IOException {

        TaskImage image = taskImageRepository.findById(taskImageId)
                .orElseThrow(() -> new RuntimeException("TaskImage not found"));

        if (image.getPublicId() != null) {
            cloudinary.uploader().destroy(image.getPublicId(), ObjectUtils.emptyMap());
        }

        // ✅ Upload ảnh mới
        Map uploadResult = cloudinary.uploader().upload(
                newFile.getBytes(),
                ObjectUtils.asMap(
                        "folder", "tasks/" + image.getTask().getTaskId(),
                        "resource_type", "image"
                )
        );

        image.setImageUrl(uploadResult.get("secure_url").toString());
        image.setPublicId(uploadResult.get("public_id").toString());

        return mapToResponse(taskImageRepository.save(image));
    }

    /* ========== UPDATE / REPLACE ALL IMAGES ========== */
    @Transactional
    public List<TaskImageResponse> replaceAllImages(
            Long taskId,
            List<MultipartFile> files
    ) throws IOException {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // 1️⃣ Lấy ảnh cũ
        List<TaskImage> oldImages =
                taskImageRepository.findByTask_TaskIdOrderByIndexAsc(taskId);

        // 2️⃣ Xoá ảnh cũ (Cloudinary + DB)
        for (TaskImage img : oldImages) {
            if (img.getPublicId() != null) {
                cloudinary.uploader().destroy(img.getPublicId(), ObjectUtils.emptyMap());
            }
        }
        taskImageRepository.deleteAll(oldImages);

        // 3️⃣ Upload ảnh mới
        int index = 0;
        List<TaskImageResponse> responses = new ArrayList<>();

        for (MultipartFile file : files) {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "tasks/" + taskId,
                            "resource_type", "image"
                    )
            );

            TaskImage taskImage = TaskImage.builder()
                    .task(task)
                    .imageUrl(uploadResult.get("secure_url").toString())
                    .publicId(uploadResult.get("public_id").toString())
                    .index(index++)
                    .build();

            responses.add(
                    mapToResponse(taskImageRepository.save(taskImage))
            );
        }

        return responses;
    }

    /* ========== DELETE ========== */
    public void delete(Long id) {
        taskImageRepository.deleteById(id);
        // (optional) xoá trên cloudinary nếu bạn lưu public_id
    }

    /* ========== READ ========== */
    public List<TaskImageResponse> getByTask(Long taskId) {
        return taskImageRepository.findByTask_TaskIdOrderByIndexAsc(taskId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /* ========== UPDATE INDEX ========== */
    public TaskImageResponse updateIndex(Long id, Integer index) {
        TaskImage image = taskImageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TaskImage not found"));

        image.setIndex(index);
        return mapToResponse(taskImageRepository.save(image));
    }

    private TaskImageResponse mapToResponse(TaskImage img) {
        return TaskImageResponse.builder()
                .taskImageId(img.getTaskImageId())
                .taskId(img.getTask().getTaskId())
                .imageUrl(img.getImageUrl())
                .index(img.getIndex())
                .build();
    }

}

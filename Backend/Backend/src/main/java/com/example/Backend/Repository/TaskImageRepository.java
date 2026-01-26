package com.example.Backend.Repository;

import com.example.Backend.Entity.TaskImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskImageRepository extends JpaRepository<TaskImage, Long> {

    List<TaskImage> findByTask_TaskIdOrderByIndexAsc(Long taskId);
}

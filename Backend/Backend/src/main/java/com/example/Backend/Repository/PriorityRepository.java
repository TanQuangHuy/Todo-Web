package com.example.Backend.Repository;

import com.example.Backend.Entity.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriorityRepository extends JpaRepository<Priority, Long> {

    boolean existsByPriorityName(String priorityName);
}


package com.example.Backend.Repository;

import com.example.Backend.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {

    boolean existsByStatusName(String statusName);
}

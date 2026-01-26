package com.example.Backend.Repository;

import com.example.Backend.Entity.UserRole;
import com.example.Backend.Entity.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {
    boolean existsByUser_UserIdAndRole_RoleId(Long userId, Long roleId);
    Optional<UserRole> findFirstByUser_UserId(Long userId);
}

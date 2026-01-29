package com.example.Backend.Services;

import com.example.Backend.Entity.Role;
import com.example.Backend.Entity.User;
import com.example.Backend.Entity.UserRole;
import com.example.Backend.Entity.UserRoleId;
import com.example.Backend.Repository.RoleRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserRoleService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

//    public void addRoleToUser(Long userId, Long roleId) {
//
//        if (userRoleRepository.existsByUser_UserIdAndRole_RoleId(userId, roleId)) {
//            throw new RuntimeException("User đã có role này rồi");
//        }
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
//
//        Role role = roleRepository.findById(roleId)
//                .orElseThrow(() -> new RuntimeException("Role không tồn tại"));
//
//        UserRole userRole = new UserRole(user, role);
//        userRoleRepository.save(userRole);
//    }

    @Transactional
    public void assignRole(Long userId, Long roleId) {

        if (userRoleRepository.existsByUser_UserIdAndRole_RoleId(userId, roleId)) {
            throw new RuntimeException("User đã có role này ");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role không tồn tại"));

        UserRoleId id = new UserRoleId(
                user.getUserId(),
                role.getRoleId()
        );

        UserRole userRole = UserRole.builder()
                .id(id)
                .user(user)
                .role(role)
                .build();

        userRoleRepository.save(userRole);

    }
}


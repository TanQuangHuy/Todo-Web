package com.example.Backend.Services;

import com.example.Backend.DTO.Login.LoginResponse;
import com.example.Backend.DTO.Register.RegisterRequest;
import com.example.Backend.DTO.User.UserResponse;
import com.example.Backend.Entity.Role;
import com.example.Backend.Entity.User;
import com.example.Backend.Entity.UserRole;
import com.example.Backend.Entity.UserRoleId;
import com.example.Backend.JWT.JwtUtil;
import com.example.Backend.Repository.RoleRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    public boolean existsByPhoneNumber(String sdt) {
        return userRepository.existsByPhoneNumber(sdt);
    }

    public boolean existsByUserName (String userName){
        return userRepository.existsByUserName(userName);
    }

    public boolean existsByEmail (String email){
        return userRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {

        User user = userRepository.findByIdWithRoles(id)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        return UserResponse.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .roles(
                        user.getUserRoles()
                                .stream()
                                .map(ur -> ur.getRole().getRoleName())
                                .toList()
                )
                .build();
    }

    @Transactional
    public void register(RegisterRequest req) {

        if (existsByPhoneNumber(req.getPhoneNumber()))
            throw new RuntimeException("SĐT đã tồn tại");

        if (existsByUserName(req.getUserName()))
            throw new RuntimeException("Username đã tồn tại");

        if (existsByEmail(req.getEmail()))
            throw new RuntimeException("Email đã tồn tại");

        User user = User.builder()
                .phoneNumber(req.getPhoneNumber())
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .userName(req.getUserName())
                .email(req.getEmail())
                .address(req.getAddress())
                .password(passwordEncoder.encode(req.getPassword()))
                .build();

        userRepository.save(user);

        Role roleUser = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER không tồn tại"));

        userRoleRepository.save(
                UserRole.builder()
                        .id(new UserRoleId(user.getUserId(), roleUser.getRoleId()))
                        .user(user)
                        .role(roleUser)
                        .assignedAt(LocalDateTime.now())
                        .build()
        );
    }

    @Transactional(readOnly = true)
    public LoginResponse buildLoginResponse(String input, List<String> roles) {

        User user = userRepository.findByPhoneNumberOrEmail(input, input)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        // LẤY ROLE ID (ví dụ USER = 1)
        Integer roleId = userRoleRepository
                .findFirstByUser_UserId(user.getUserId())
                .map(ur -> ur.getRole().getRoleId().intValue())
                .orElse(null);

        return LoginResponse.builder()
                .userId(user.getUserId())
                .phoneNumber(user.getPhoneNumber())
                .userName(user.getUserName())
                .email(user.getEmail())
                .address(user.getAddress())
                .avatar(user.getAvatar())
                .role(roleId)
                .token(jwtUtil.generateToken(input, roles))
                .build();
    }

}

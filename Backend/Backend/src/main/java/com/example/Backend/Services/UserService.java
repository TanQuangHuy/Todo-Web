package com.example.Backend.Services;

import com.cloudinary.Cloudinary;
import com.example.Backend.DTO.Login.GoogleLoginRequest;
import com.example.Backend.DTO.Login.LoginResponse;
import com.example.Backend.DTO.Register.RegisterRequest;
import com.example.Backend.DTO.User.UpdateUserDTO;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private GoogleAuthService googleAuthService;

    @Autowired
    private Cloudinary cloudinary;

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

    @Transactional
    public LoginResponse loginWithGoogle(GoogleLoginRequest req) {

        var payload = googleAuthService.verify(req.getIdToken());

        String email = payload.getEmail();
        String userName = (String) payload.get("name");
        String avatar = (String) payload.get("picture");
        String googleId = payload.getSubject();

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setUserName(userName);
                    newUser.setAvatar(avatar);
                    newUser.setGoogleId(googleId);

                    User savedUser = userRepository.save(newUser);

                    Role roleUser = roleRepository.findByRoleName("USER")
                            .orElseThrow(() -> new RuntimeException("Role USER không tồn tại"));

                    UserRole userRole = UserRole.builder()
                            .id(new UserRoleId(savedUser.getUserId(), roleUser.getRoleId()))
                            .user(savedUser)
                            .role(roleUser)
                            .build();

                    userRoleRepository.save(userRole);

                    return savedUser;
                });

        List<String> roles = userRoleRepository
                .findFirstByUser_UserId(user.getUserId())
                .stream()
                .map(ur -> "ROLE_" + ur.getRole().getRoleName())
                .toList();

        String jwt = jwtUtil.generateToken(user.getEmail(), roles);

        LoginResponse res = new LoginResponse();
        res.setUserId(user.getUserId());
        res.setEmail(user.getEmail());
        res.setUserName(user.getUserName());
        res.setAvatar(user.getAvatar());
        res.setToken(jwt);

        return res;
    }

    @Transactional
    public User updateUser(Long id, UpdateUserDTO dto, MultipartFile avatar) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        // ===== PHONE =====
        if (dto.getPhoneNumber() != null && !dto.getPhoneNumber().isBlank()) {
            if (!dto.getPhoneNumber().equals(user.getPhoneNumber()) &&
                    userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
                throw new RuntimeException("SĐT đã được sử dụng");
            }
            user.setPhoneNumber(dto.getPhoneNumber());
        }

        // ===== USERNAME =====
        if (dto.getUserName() != null && !dto.getUserName().isBlank()) {
            if (!dto.getUserName().equals(user.getUserName()) &&
                    userRepository.existsByUserName(dto.getUserName())) {
                throw new RuntimeException("Username đã tồn tại");
            }
            user.setUserName(dto.getUserName());
        }

        // ===== EMAIL =====
        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            if (!dto.getEmail().equals(user.getEmail()) &&
                    userRepository.existsByEmail(dto.getEmail())) {
                throw new RuntimeException("Email đã tồn tại");
            }
            user.setEmail(dto.getEmail());
        }

        // ===== ADDRESS =====
        if (dto.getAddress() != null && !dto.getAddress().isBlank()) {
            user.setAddress(dto.getAddress());
        }

        // ===== CHANGE PASSWORD =====
        if (dto.getNewPassword() != null && !dto.getNewPassword().isBlank()) {

            if (user.getGoogleId() != null) {
                throw new RuntimeException("Tài khoản Google không thể đổi mật khẩu");
            }

            if (dto.getOldPassword() == null || dto.getOldPassword().isBlank()) {
                throw new RuntimeException("Vui lòng nhập mật khẩu hiện tại");
            }

            if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
                throw new RuntimeException("Mật khẩu hiện tại không đúng");
            }

            user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        }

        // ===== AVATAR UPLOAD CLOUDINARY =====
        if (avatar != null && !avatar.isEmpty()) {
            try {
                Map uploadResult = cloudinary.uploader().upload(
                        avatar.getBytes(),
                        Map.of(
                                "folder", "avatars",
                                "resource_type", "image"
                        )
                );

                String avatarUrl = uploadResult.get("secure_url").toString();
                user.setAvatar(avatarUrl);

            } catch (Exception e) {
                throw new RuntimeException("Upload avatar thất bại: " + e.getMessage());
            }
        }

        return userRepository.save(user);
    }

    public UpdateUserDTO toResponse(User user) {
        UpdateUserDTO dto = new UpdateUserDTO();
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setUserName(user.getUserName());
        dto.setEmail(user.getEmail());
        dto.setAddress(user.getAddress());
        dto.setAvatar(user.getAvatar());
        return dto;
    }

}

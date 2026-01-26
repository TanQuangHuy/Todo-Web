package com.example.Backend.Controller;

import com.example.Backend.DTO.Role.AssignRoleRequest;
import com.example.Backend.DTO.Role.RoleRequest;
import com.example.Backend.Entity.Role;
import com.example.Backend.Services.RoleService;
import com.example.Backend.Services.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;
    private final UserRoleService userRoleService;

    @PreAuthorize("hasRole ('ADMIN')")
    @PostMapping
    public ResponseEntity<Role> createRole(
            @RequestBody RoleRequest request
    ) {
        Role role = Role.builder()
                .roleName(request.getRoleName().toUpperCase())
                .description(request.getDescription())
                .build();

        return ResponseEntity.ok(roleService.createRole(role));
    }

    @PreAuthorize("hasRole ('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @PreAuthorize("hasRole ('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @PreAuthorize("hasRole ('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(
            @PathVariable Long id,
            @RequestBody Role role) {
        return ResponseEntity.ok(roleService.updateRole(id, role));
    }

    @PreAuthorize("hasRole ('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole ('ADMIN')")
    @PostMapping("/users/{userId}/roles")
    public ResponseEntity<?> assignRoleToUser(
            @PathVariable Long userId,
            @RequestBody AssignRoleRequest request
    ) {
        userRoleService.assignRole(userId, request.getRoleId());
        return ResponseEntity.ok("Đã thêm role cho user");
    }
}

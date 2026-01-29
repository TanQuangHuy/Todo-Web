package com.example.Backend.Repository;

import com.example.Backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber (String phoneNumber);
    List<User> findByUserRoles_Role_RoleName(String roleName);
    boolean existsByPhoneNumber(String phoneNumber);
    Optional<User> findByPhoneNumberOrEmail(String phoneNumber, String email);

    boolean existsByUserName (String userName);

    boolean existsByEmail (String email);

    @Query("""
    select distinct u from User u
    left join fetch u.userRoles ur
    left join fetch ur.role
    where u.userId = :id
""")
    Optional<User> findByIdWithRoles(Long id);

    @Query("""
    select u from User u
    where u.phoneNumber = :input or u.email = :input
""")
    Optional<User> findLoginUser(String input);

}

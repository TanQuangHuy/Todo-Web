package com.example.Backend.Services;

import com.example.Backend.Entity.User;
import com.example.Backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String input)
            throws UsernameNotFoundException {

        User user = input.contains("@")
                ? userRepository.findByEmail(input)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy email"))
                : userRepository.findByPhoneNumber(input)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy SĐT"));

        List<SimpleGrantedAuthority> authorities =
                user.getUserRoles().stream()
                        .map(ur -> new SimpleGrantedAuthority(
                                "ROLE_" + ur.getRole().getRoleName()
                        ))
                        .toList();

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }
}

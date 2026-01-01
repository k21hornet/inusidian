package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.service.UserService;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> syncUser(@RequestBody SignupRequest request) {
        String email = request.getEmail();
        userService.createUserIfNotExist(email);
        return ResponseEntity.noContent().build();
    }

    @Data
    public static class SignupRequest {
        @Email
        String email;
    }
}

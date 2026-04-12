package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> syncUser(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("http://claim/email");
        userService.createUserIfNotExist(email);
        return ResponseEntity.noContent().build();
    }
}

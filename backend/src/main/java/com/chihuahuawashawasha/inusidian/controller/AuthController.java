package com.chihuahuawashawasha.inusidian.controller;

import com.chihuahuawashawasha.inusidian.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/sync-user")
    public ResponseEntity<?> syncUser(@AuthenticationPrincipal Jwt jwt) {
        String auth0Id = jwt.getSubject();
        String email = jwt.getClaimAsString("http://claim/email");
        userService.createUserIfNotExist(auth0Id, email);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> getSigninUserEmail(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("http://claim/email");
        if (email==null) throw new RuntimeException();

        Map<String, String> response = new HashMap<>();
        response.put("email", email);
        return ResponseEntity.ok(response);
    }
}

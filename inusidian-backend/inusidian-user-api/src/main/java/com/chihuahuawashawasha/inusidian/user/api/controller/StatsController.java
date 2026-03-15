package com.chihuahuawashawasha.inusidian.user.api.controller;

import com.chihuahuawashawasha.inusidian.dto.CardSuccessDistributionDTO;
import com.chihuahuawashawasha.inusidian.dto.LearningHistoryDTO;
import com.chihuahuawashawasha.inusidian.dto.StudiedDaysDTO;
import com.chihuahuawashawasha.inusidian.dto.UserDTO;
import com.chihuahuawashawasha.inusidian.service.StatsService;
import com.chihuahuawashawasha.inusidian.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final UserService userService;
    private final StatsService statsService;

    @GetMapping("/learning-history")
    public ResponseEntity<List<LearningHistoryDTO>> learningHistory(@AuthenticationPrincipal Jwt jwt) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));
        return ResponseEntity.ok(statsService.getLearningHistory(userDTO.getId()));
    }

    @GetMapping("/card-distribution")
    public ResponseEntity<List<CardSuccessDistributionDTO>> cardDistribution(@AuthenticationPrincipal Jwt jwt) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));
        return ResponseEntity.ok(statsService.getCardSuccessDistribution(userDTO.getId()));
    }

    @GetMapping("/studied-days")
    public ResponseEntity<StudiedDaysDTO> studiedDays(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam int year,
            @RequestParam int month) {
        UserDTO userDTO = userService.findByEmail(jwt.getClaimAsString("http://claim/email"));
        return ResponseEntity.ok(statsService.getStudiedDays(userDTO.getId(), year, month));
    }
}

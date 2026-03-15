package com.chihuahuawashawasha.inusidian.user.api.controller;

import com.chihuahuawashawasha.inusidian.dto.CardSuccessDistributionDTO;
import com.chihuahuawashawasha.inusidian.dto.LearningHistoryDTO;
import com.chihuahuawashawasha.inusidian.dto.StudiedDaysDTO;
import com.chihuahuawashawasha.inusidian.dto.UserDTO;
import com.chihuahuawashawasha.inusidian.service.StatsService;
import com.chihuahuawashawasha.inusidian.user.api.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    @GetMapping("/learning-history")
    public ResponseEntity<List<LearningHistoryDTO>> learningHistory(@CurrentUser UserDTO userDTO) {
        return ResponseEntity.ok(statsService.getLearningHistory(userDTO.getId()));
    }

    @GetMapping("/card-distribution")
    public ResponseEntity<List<CardSuccessDistributionDTO>> cardDistribution(@CurrentUser UserDTO userDTO) {
        return ResponseEntity.ok(statsService.getCardSuccessDistribution(userDTO.getId()));
    }

    @GetMapping("/studied-days")
    public ResponseEntity<StudiedDaysDTO> studiedDays(
            @CurrentUser UserDTO userDTO,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(statsService.getStudiedDays(userDTO.getId(), year, month));
    }
}

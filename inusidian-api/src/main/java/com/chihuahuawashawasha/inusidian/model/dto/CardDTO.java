package com.chihuahuawashawasha.inusidian.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {

    private String id;

    private String deckId;

    private Integer successCount;

    private Integer reviewInterval;

    private LocalDate nextReviewDate;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;

    private List<CardValueDTO> cardValues;
} 
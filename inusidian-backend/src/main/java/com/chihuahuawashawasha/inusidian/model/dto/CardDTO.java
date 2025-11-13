package com.chihuahuawashawasha.inusidian.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {

    private Integer id;

    private Integer deckId;

    private Integer successCount;

    private Integer reviewInterval;

    private LocalDate nextReviewDate;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private LocalDateTime deletedAt;

    private List<CardValueDTO> cardValues;
}

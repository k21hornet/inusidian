package com.chihuahuawashawasha.inusidian.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * デッキ詳細
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeckDTO {
    private String id;

    private String deckName;

    private String deckDescription;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<CardDTO> cards;

    private List<CardFieldDTO> cardFields;
}

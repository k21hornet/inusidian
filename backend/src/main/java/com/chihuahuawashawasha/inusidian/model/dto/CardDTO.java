package com.chihuahuawashawasha.inusidian.model.dto;

import com.chihuahuawashawasha.inusidian.model.entity.Card;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {

    private Integer id;

    private Integer deckId;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private LocalDateTime deletedAt;

    private List<CardValueDTO> cardValues;

    public static CardDTO fromEntity(Card card) {
        return new CardDTO(
                card.getId(),
                card.getDeck().getId(),
                card.getCreatedAt(),
                card.getUpdatedAt(),
                card.getDeletedAt(),
                card.getCardValues()
                        .stream()
                        .map(CardValueDTO::fromEntity)
                        .toList()
        );
    }

} 
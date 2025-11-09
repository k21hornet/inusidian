package com.chihuahuawashawasha.inusidian.model.dto;

import com.chihuahuawashawasha.inusidian.model.entity.Deck;
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
    private Integer id;

    private String deckName;

    private String deckDescription;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    private List<CardDTO> cards;

    private List<CardFieldDTO> cardFields;

    public static DeckDTO fromEntity(Deck deck) {
        return new DeckDTO(
                deck.getId(),
                deck.getDeckName(),
                deck.getDeckDescription(),
                deck.getCreatedAt(),
                deck.getUpdatedAt(),
                deck.getDeletedAt(),
                deck.getCards()
                        .stream()
                        .map(CardDTO::fromEntity)
                        .toList(),
                deck.getCardFields()
                        .stream()
                        .map(CardFieldDTO::fromEntity)
                        .toList()
        );
    }

}

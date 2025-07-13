package com.chihuahuawashawasha.inusidian.model.dto;

import com.chihuahuawashawasha.inusidian.model.entity.Card;
import com.chihuahuawashawasha.inusidian.model.entity.CardField;
import com.chihuahuawashawasha.inusidian.model.entity.Deck;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * デッキ概要
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeckSummaryDTO {
    private Integer id;

    private String deckName;

    private String deckDescription;

    private LocalDateTime createdAt;

    public static DeckSummaryDTO fromEntity(Deck deck) {
        return new DeckSummaryDTO(
                deck.getId(),
                deck.getDeckName(),
                deck.getDeckDescription(),
                deck.getCreatedAt()
        );
    }

}

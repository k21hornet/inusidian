package com.chihuahuawashawasha.inusidian.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeckListDTO {

    List<Deck> decks;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Deck {

        String id;

        String deckName;

        String deckDescription;

        Integer cardCount;

        Integer dueCardCount;

        LocalDateTime createdAt;
    }
}

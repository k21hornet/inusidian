package com.chihuahuawashawasha.inusidian.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class DecksResponse {

    List<DeckListItem> decks;

    @Data
    public static class DeckListItem {

        Integer id;

        String deckName;

        String deckDescription;

        Integer cardCount;

        Integer dueCardCount;

        LocalDateTime createdAt;
    }
}

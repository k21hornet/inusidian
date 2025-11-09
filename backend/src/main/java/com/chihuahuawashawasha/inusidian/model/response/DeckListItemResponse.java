package com.chihuahuawashawasha.inusidian.model.response;

import java.time.LocalDateTime;

public record DeckListItemResponse(

        Integer id,

        String deckName,

        String deckDescription,

        Integer cardCount,

        Integer dueCardCount,

        LocalDateTime createdAt
){
}

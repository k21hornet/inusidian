package com.chihuahuawashawasha.inusidian.model.response;

import java.util.List;

public record DeckListResponse(

        Integer deckCount,

        List<DeckListItemResponse>decks
) {
}

package com.chihuahuawashawasha.inusidian.model.response;

import lombok.Data;

import java.util.List;

@Data
public class DeckResponse {

    private Integer id;

    private String deckName;

    private String deckDescription;

    private List<DeckResponseCardItem> cards;

    private List<DeckResponseFieldItem> cardFields;
}

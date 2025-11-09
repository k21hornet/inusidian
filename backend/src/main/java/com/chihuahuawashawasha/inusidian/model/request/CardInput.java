package com.chihuahuawashawasha.inusidian.model.request;

import lombok.Data;

import java.util.List;

@Data
public class CardInput {
    private Integer cardId;
    private Integer deckId;
    private List<CardValueInput> values;
}

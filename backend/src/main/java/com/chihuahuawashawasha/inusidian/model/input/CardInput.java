package com.chihuahuawashawasha.inusidian.model.input;

import lombok.Data;

import java.util.List;

@Data
public class CardInput {
    private Integer cardId;
    private Integer deckId;
    private List<CardValueInput> values;
}

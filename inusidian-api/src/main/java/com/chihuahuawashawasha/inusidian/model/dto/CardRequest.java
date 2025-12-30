package com.chihuahuawashawasha.inusidian.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class CardRequest {

    private String cardId;

    private String deckId;

    private List<CardValueRequest> values;
}

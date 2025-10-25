package com.chihuahuawashawasha.inusidian.model.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DeckListResponseItem {

    private Integer id;

    private String deckName;

    private String deckDescription;

    private Integer cardCount;

    private Integer dueCardCount;

    private LocalDateTime createdAt;
}

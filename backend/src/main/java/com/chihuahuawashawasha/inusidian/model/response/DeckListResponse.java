package com.chihuahuawashawasha.inusidian.model.response;

import lombok.Data;

import java.util.List;

@Data
public class DeckListResponse {

    List<DeckListResponseItem> deckListResponseItems;
}
